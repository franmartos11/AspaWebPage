// Contacto: la gota del "¿Qué necesitás?" (radios) y el envío del formulario sin recargar la página.
import { EMAIL_RE, STARTED } from "@/lib/contact";
import { $, $$ } from "./core";
import { dropTo } from "./ui";

const OK = "¡Listo! Recibimos tu mensaje. Te respondemos en menos de 24 h hábiles.";
const FAIL = "No pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp o email.";

export function initContacto() {
  const f = $<HTMLFormElement>("#cform");
  if (!f) return () => {};
  const msg = $("#fmsg", f)!,
    btn = $<HTMLButtonElement>('button[type="submit"]', f)!,
    sg = $(".seg", f)!,
    drop = $(".seg-drop", sg);
  const t0 = f.elements.namedItem(STARTED) as HTMLInputElement;
  t0.value = String(Date.now());

  // la gota va debajo del radio elegido
  const place = () => dropTo(drop, $("input:checked", sg)?.closest("label") ?? null, sg);
  const ro = new ResizeObserver(place);
  ro.observe(sg);
  sg.addEventListener("change", place);
  requestAnimationFrame(place);

  const say = (text: string, kind: "ok" | "err") => {
    msg.textContent = text;
    msg.className = `fine ${kind}`;
  };
  const mark = (name?: string) => {
    $$<HTMLInputElement>("[aria-invalid]", f).forEach((x) => x.removeAttribute("aria-invalid"));
    if (!name) return;
    const el = f.elements.namedItem(name) as HTMLInputElement | null;
    el?.setAttribute("aria-invalid", "true");
    el?.focus();
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const fd = new FormData(f);
    const v = (k: string) => String(fd.get(k) || "").trim();
    // aviso inmediato; el servidor vuelve a validar todo
    if (!v("nombre")) return (f.classList.add("err"), mark("nombre"), say("Completá tu nombre.", "err"));
    if (!EMAIL_RE.test(v("email"))) return (f.classList.add("err"), mark("email"), say("Escribí un email válido.", "err"));
    f.classList.remove("err");
    mark();
    btn.setAttribute("aria-busy", "true");
    try {
      const res = await fetch(f.action, { method: "POST", body: fd, headers: { accept: "application/json" } });
      const r = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; field?: string };
      if (r.ok) {
        f.reset();
        t0.value = String(Date.now());
        place();
        say(OK, "ok");
      } else {
        mark(r.field);
        say(r.error ? `${r.error}${res.status >= 500 ? " Escribinos por WhatsApp o email." : ""}` : FAIL, "err");
      }
    } catch {
      say(FAIL, "err");
    } finally {
      btn.removeAttribute("aria-busy");
    }
  };
  f.addEventListener("submit", onSubmit);
  return () => {
    f.removeEventListener("submit", onSubmit);
    sg.removeEventListener("change", place);
    ro.disconnect();
  };
}
