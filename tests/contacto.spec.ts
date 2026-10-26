import { expect, test } from "@playwright/test";

// cada test con su propia IP: el endpoint limita los envíos por IP y los tests corren en paralelo
const ip = () => `10.${(Math.random() * 255) | 0}.${(Math.random() * 255) | 0}.${(Math.random() * 255) | 0}`;

// El servidor de los tests corre con CONTACT_DRY_RUN=1: valida todo pero no manda el mail.
test.describe("Contacto · formulario", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem("aspa-intro", "1"));
    await page.setExtraHTTPHeaders({ "x-forwarded-for": ip() });
    await page.goto("/contacto");
    await page.evaluate(() => document.fonts.ready);
  });

  test("sin nombre o con email inválido avisa y marca el campo, sin enviar", async ({ page }) => {
    let posted = false;
    page.on("request", (r) => r.url().includes("/api/contacto") && (posted = true));
    await page.getByRole("button", { name: "Enviar" }).click();
    await expect(page.locator("#fmsg")).toHaveText("Completá tu nombre.");
    await expect(page.getByLabel("Nombre")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel("Nombre")).toBeFocused();
    await page.getByLabel("Nombre").fill("Ana");
    await page.getByLabel("Email").fill("ana@");
    await page.getByRole("button", { name: "Enviar" }).click();
    await expect(page.locator("#fmsg")).toHaveText("Escribí un email válido.");
    expect(posted).toBe(false);
  });

  test("envía, confirma y limpia el formulario", async ({ page }) => {
    await page.waitForTimeout(3100); // menos de 3 s desde que se mostró cuenta como bot
    await page.getByLabel("Nombre").fill("Ana Pérez");
    await page.getByLabel("Email").fill("ana@empresa.com");
    await page.getByLabel("Teléfono").fill("+54 351 555-1234");
    await page.getByLabel("Web", { exact: true }).check({ force: true });
    await page.getByLabel("Mensaje").fill("Queremos una web para la constructora.");
    const res = page.waitForResponse("**/api/contacto");
    await page.getByRole("button", { name: "Enviar" }).click();
    expect((await res).status()).toBe(200);
    await expect(page.locator("#fmsg")).toContainText("Recibimos tu mensaje");
    await expect(page.getByLabel("Nombre")).toHaveValue("");
    // la gota del selector vuelve a "Sistema"
    await expect(page.getByLabel("Sistema", { exact: true })).toBeChecked();
  });

  test("el selector se maneja con el teclado (radios)", async ({ page }) => {
    await page.getByLabel("Sistema", { exact: true }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByLabel("App", { exact: true })).toBeChecked();
  });
});

test.describe("Contacto · endpoint", () => {
  const json = () => ({ accept: "application/json", "x-forwarded-for": ip() });
  const base = { nombre: "Ana", email: "ana@empresa.com", necesidad: "Web", mensaje: "Hola" };

  test("valida en el servidor", async ({ request }) => {
    const r = await request.post("/api/contacto", { headers: json(), form: { ...base, email: "no-es-mail" } });
    expect(r.status()).toBe(400);
    expect(await r.json()).toMatchObject({ ok: false, field: "email" });
  });

  test("a los bots (campo trampa o envío instantáneo) les contesta ok sin enviar", async ({ request }) => {
    for (const extra of [{ sitio_web: "http://spam.example" }, { t0: String(Date.now()) }] as Record<string, string>[]) {
      const r = await request.post("/api/contacto", { headers: json(), form: { ...base, ...extra } });
      expect(await r.json()).toEqual({ ok: true });
    }
  });

  test("sin JavaScript: el formulario lleva a una página de confirmación o de error", async ({ request }) => {
    const h = { "x-forwarded-for": ip() };
    const ok = await request.post("/api/contacto", { form: base, maxRedirects: 0, headers: h });
    expect(ok.status()).toBe(303);
    expect(ok.headers().location).toMatch(/\/contacto\/enviado$/);
    const bad = await request.post("/api/contacto", { form: { ...base, nombre: "" }, maxRedirects: 0, headers: h });
    expect(bad.headers().location).toMatch(/\/contacto\/error$/);
  });

  test("limita los envíos seguidos de una misma IP", async ({ request }) => {
    const h = json();
    const codes = [];
    for (let i = 0; i < 7; i++) codes.push((await request.post("/api/contacto", { headers: h, form: base })).status());
    expect(codes.slice(0, 5).every((c) => c === 200)).toBe(true);
    expect(codes[6]).toBe(429);
  });

  test("las páginas de aviso no se indexan", async ({ page }) => {
    for (const p of ["/contacto/enviado", "/contacto/error"]) {
      await page.goto(p);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    }
  });
});
