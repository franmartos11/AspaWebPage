// Envía el formulario de contacto por mail, igual que el sitio anterior: nodemailer con la cuenta de
// Gmail de EMAIL_USER / EMAIL_PASS (contraseña de aplicación). Destino: CONTACT_TO o la casilla de
// siempre. Con CONTACT_DRY_RUN=1 no envía nada (tests y desarrollo).
import nodemailer from "nodemailer";
import { routes } from "@/i18n";
import { checkContact, contactMail, formLang, LANG_FIELD, MSG } from "@/lib/contact";

const TO = process.env.CONTACT_TO || "aspasoftwaredevelopment@gmail.com";

// límite por IP (en memoria: alcanza para frenar ráfagas; cada instancia lleva su cuenta)
const WINDOW_MS = 10 * 60 * 1000,
  MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function limited(ip: string, now: number) {
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

async function read(req: Request): Promise<(k: string) => unknown> {
  if ((req.headers.get("content-type") || "").includes("application/json")) {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    return (k) => body[k];
  }
  const fd = await req.formData();
  return (k) => fd.get(k);
}

export async function POST(req: Request) {
  const json = (req.headers.get("accept") || "").includes("application/json");
  // un cuerpo ilegible cuenta como formulario vacío (y pasa igual por el límite por IP)
  const get = await read(req).catch((): ((k: string) => unknown) => () => undefined);
  // el formulario en inglés manda lang=en: mensajes y páginas de aviso en ese idioma
  const lang = formLang(get(LANG_FIELD)),
    m = MSG[lang],
    r = routes(lang);
  // sin JavaScript el formulario se envía igual: se responde con una página en lugar de JSON
  const reply = (status: number, body: { ok: boolean; error?: string; field?: string }) =>
    json ? Response.json(body, { status }) : Response.redirect(new URL(body.ok ? r.enviado : r.error, req.url), 303);

  const now = Date.now();
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (limited(ip, now)) return reply(429, { ok: false, error: m.rate });

  const check = checkContact(get, now);
  // a los bots se les contesta como si hubiera salido bien, para que no prueben otra cosa
  if (!check.ok && "spam" in check) return reply(200, { ok: true });
  if (!check.ok) return reply(400, { ok: false, error: check.error, field: check.field });

  const c = check.data;
  const mail = contactMail(c);
  if (process.env.CONTACT_DRY_RUN === "1") {
    console.info("[contacto] envío simulado:", mail.subject);
    return reply(200, { ok: true });
  }
  const user = process.env.EMAIL_USER,
    pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    console.error("[contacto] faltan EMAIL_USER / EMAIL_PASS");
    return reply(500, { ok: false, error: m.send });
  }
  try {
    await nodemailer.createTransport({ service: "gmail", auth: { user, pass } }).sendMail({
      from: { name: "Web de Aspa", address: user },
      to: TO,
      replyTo: { name: c.nombre, address: c.email },
      subject: mail.subject,
      text: mail.text,
    });
    return reply(200, { ok: true });
  } catch (err) {
    console.error("[contacto] error al enviar:", err);
    return reply(502, { ok: false, error: m.send });
  }
}
