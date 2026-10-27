// Contacto: la gota del "¿Qué necesitás?" (radios) y el envío del formulario sin recargar la página.
import { EMAIL_RE, MSG, STARTED } from "@/lib/contact";
import { $, $$, pageLang } from "./core";
import { dropTo } from "./ui";

const T = {
  es: {
    ok: "¡Listo! Recibimos tu mensaje. Te respondemos en menos de 24 h hábiles.",
    fail: "No pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp o email.",
    reach: " Escribinos por WhatsApp o email.",
  },
  en: {
    ok: "All set! We got your message. We'll reply within 1 business day.",
    fail: "We couldn't send your message. Please try again, or reach us on WhatsApp or by email.",
    reach: " Message us on WhatsApp or email us.",
  },
} as const;

export function initContacto() {
  const f = $<HTMLFormElement>("#cform");
  if (!f) return () => {};
  const lang = pageLang(),
    t = T[lang],
    m = MSG[lang];
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
    if (!v("nombre")) return (f.classList.add("err"), mark("nombre"), say(m.name, "err"));
    if (!EMAIL_RE.test(v("email"))) return (f.classList.add("err"), mark("email"), say(m.email, "err"));
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
        say(t.ok, "ok");
      } else {
        mark(r.field);
        say(r.error ? `${r.error}${res.status >= 500 ? t.reach : ""}` : t.fail, "err");
      }
    } catch {
      say(t.fail, "err");
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
