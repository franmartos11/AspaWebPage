import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Versión en inglés: cada página tiene su par en español (hreflang y botón ES/EN), está toda en
// inglés y cumple lo mismo que las páginas en español (accesibilidad, sin scroll lateral ni errores).
const SITE = "https://www.aspasoftware.com";
const PAIRS: [string, string][] = [
  ["/", "/en"],
  ["/sistemas", "/en/systems"],
  ["/webs", "/en/websites"],
  ["/webs/planes", "/en/websites/pricing"],
  ["/casos", "/en/work"],
  ["/casos/aspa-rodeo", "/en/work/aspa-rodeo"],
  ["/casos/aspa-scout", "/en/work/aspa-scout"],
  ["/nosotros", "/en/about"],
  ["/contacto", "/en/contact"],
  ["/privacidad", "/en/privacy"],
  ["/webs/arquitectos", "/en/websites/architects"],
  ["/webs/estudios-de-arquitectura", "/en/websites/architecture-studios"],
  ["/webs/interiorismo", "/en/websites/interior-design"],
  ["/webs/constructoras", "/en/websites/construction-companies"],
  ["/webs/constructoras-de-vivienda", "/en/websites/home-builders"],
  ["/webs/steel-framing", "/en/websites/steel-framing"],
  ["/webs/desarrollistas", "/en/websites/real-estate-developers"],
];

// palabras muy comunes del español que no aparecen en inglés (para detectar textos sin traducir)
const SPANISH = /\b(que|para|los|las|del|una|con|por|tu|tus|nuestro|nuestros|también|más|cómo|qué|está|están|sin|sistema|empresa|empresas|hacemos)\b|[¿¡ñ]/i;
// texto visible que puede quedar en español a propósito: nombres propios, la dirección y el botón de idioma
const ALLOWED = /Córdoba|Av\. Colón|Español|ES, Español|Aspa|Nogal|Trama|Casa Norte|Obliqua|Alero|Cordillera|Paula Gil|Haik Kilic|Francisco Martos|Agustín Gil|Joaquín Otaño|Lucía|Martín|Kardu/g;

async function open(page: Page, path: string, opts: { reducedMotion?: boolean } = {}) {
  await page.addInitScript(() => sessionStorage.setItem("aspa-intro", "1"));
  if (opts.reducedMotion) await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
}

for (const [es, en] of PAIRS) {
  test.describe(`${en}`, () => {
    test("idioma, canónica, hreflang y botón ES/EN", async ({ page }) => {
      await open(page, en);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${en}`);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", `${SITE}${en}`);
      await expect(page.locator('link[rel="alternate"][hreflang="es-AR"]')).toHaveAttribute("href", `${SITE}${es === "/" ? "" : es}`);
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_US");
      await expect(page.locator("h1")).toHaveCount(1);
      // el botón ES lleva a la misma página en español (y viceversa)
      await expect(page.locator('.lang a[hreflang="es"]')).toHaveAttribute("href", es);
      await open(page, es);
      await expect(page.locator("html")).toHaveAttribute("lang", "es-AR");
      await expect(page.locator('.lang a[hreflang="en"]')).toHaveAttribute("href", en);
    });

    test("todo el texto visible está en inglés", async ({ page }) => {
      await open(page, en, { reducedMotion: true });
      const texts = await page.evaluate(() => {
        const out: string[] = [];
        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n = walk.nextNode(); n; n = walk.nextNode()) {
          const el = n.parentElement!;
          if (!n.textContent!.trim() || el.closest("script,style,[lang='es'],[hidden]")) continue;
          out.push(n.textContent!.trim());
        }
        // y lo que leen los lectores de pantalla o muestran los navegadores
        document.querySelectorAll("[aria-label],[alt],[title],[placeholder]").forEach((e) => {
          if (e.closest("[lang='es']")) return;
          for (const a of ["aria-label", "alt", "title", "placeholder"]) {
            const v = e.getAttribute(a);
            if (v) out.push(v);
          }
        });
        return out;
      });
      const spanish = texts.map((t) => t.replace(ALLOWED, "")).filter((t) => SPANISH.test(t));
      expect(spanish, "textos que parecen en español").toEqual([]);
    });

    test("sin violaciones de axe (WCAG 2.2 AA)", async ({ page }) => {
      await open(page, en);
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
      });
      await page.waitForTimeout(1200);
      const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
    });

    test("sin scroll horizontal y sin errores en consola", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));
      await open(page, en);
      await page.waitForTimeout(800);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });

    test("está en el sitemap con su par", async ({ request }) => {
      const xml = await (await request.get("/sitemap.xml")).text();
      expect(xml).toContain(`<loc>${SITE}${en}</loc>`);
      expect(xml).toContain(`hreflang="en" href="${SITE}${en}"`);
    });
  });
}

test("una URL que no existe da 404 con aviso en los dos idiomas", async ({ page }) => {
  const r = await page.goto("/en/no-existe");
  expect(r?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // el botón al sitio en inglés (el menú también tiene «Home» → /en)
  await expect(page.locator('main a[href="/en"]')).toBeVisible();
});

test("formulario en inglés: valida en inglés y confirma en inglés", async ({ page }) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": `10.9.${(Math.random() * 255) | 0}.${(Math.random() * 255) | 0}` });
  await open(page, "/en/contact");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.locator("#fmsg")).not.toHaveText(/Completá|Escribí/);
  await page.waitForTimeout(3100);
  await page.getByLabel("Name").fill("Jane Doe");
  await page.getByLabel("Email").fill("jane@company.com");
  const res = page.waitForResponse("**/api/contacto");
  await page.getByRole("button", { name: "Send" }).click();
  expect((await res).status()).toBe(200);
  await expect(page.locator("#fmsg")).not.toContainText("Recibimos");
});
