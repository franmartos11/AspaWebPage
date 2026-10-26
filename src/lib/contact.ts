// Formulario de contacto: campos, validación y armado del mail. Lo usan la página (/contacto) y el
// endpoint (/api/contacto); la validación del servidor es la que vale, la del navegador es ayuda.

export const NEEDS = ["Sistema", "App", "Web", "Automatización", "Otro"] as const;

/** Campo trampa: invisible para personas; si viene con algo, es un bot. */
export const HONEYPOT = "sitio_web";
/** Momento en que se mostró el formulario (lo completa el navegador): un envío en menos de 3 s es un bot. */
export const STARTED = "t0";
export const MIN_FILL_MS = 3000;

export type Contact = { nombre: string; email: string; telefono: string; empresa: string; necesidad: (typeof NEEDS)[number]; mensaje: string };
export type Check = { ok: true; data: Contact } | { ok: false; error: string; field?: keyof Contact } | { ok: false; spam: true };

// sin saltos de línea ni caracteres de control (van en el asunto y en encabezados del mail)
const line = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .trim()
    .slice(0, max);
const text = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f]+/g, "")
    .trim()
    .slice(0, max);

export const EMAIL_RE = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[a-z]{2,}$/i;

/** Valida lo que llega del formulario (FormData o JSON). `now` se pasa para poder probarlo. */
export function checkContact(get: (k: string) => unknown, now = Date.now()): Check {
  if (line(get(HONEYPOT), 200)) return { ok: false, spam: true };
  const t0 = Number(get(STARTED));
  if (t0 && now - t0 < MIN_FILL_MS) return { ok: false, spam: true };

  const nombre = line(get("nombre"), 100);
  const email = line(get("email"), 200);
  const telefono = line(get("telefono"), 40);
  const empresa = line(get("empresa"), 120);
  const need = line(get("necesidad"), 40);
  const mensaje = text(get("mensaje"), 4000);

  if (!nombre) return { ok: false, error: "Completá tu nombre.", field: "nombre" };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Escribí un email válido.", field: "email" };
  if (telefono && !/^[\d\s()+.-]{6,40}$/.test(telefono)) return { ok: false, error: "Revisá el teléfono.", field: "telefono" };
  const necesidad = (NEEDS as readonly string[]).includes(need) ? (need as Contact["necesidad"]) : "Otro";
  // muchos links en el mensaje: casi siempre es spam
  if ((mensaje.match(/https?:\/\//gi) || []).length > 3) return { ok: false, spam: true };
  return { ok: true, data: { nombre, email, telefono, empresa, necesidad, mensaje } };
}

/** Asunto y cuerpo del mail que recibe Aspa. */
export function contactMail(c: Contact) {
  return {
    subject: `Consulta desde la web · ${c.necesidad} · ${c.nombre}`,
    text: [
      `Nombre: ${c.nombre}`,
      `Email: ${c.email}`,
      `Teléfono: ${c.telefono || "—"}`,
      `Empresa: ${c.empresa || "—"}`,
      `Necesita: ${c.necesidad}`,
      "",
      c.mensaje || "(sin mensaje)",
    ].join("\n"),
  };
}
