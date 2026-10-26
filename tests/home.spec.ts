import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Sin intro (se marca como vista): los tests miden la página, no la animación de marca.
async function open(page: Page, opts: { reducedMotion?: boolean } = {}) {
  await page.addInitScript(() => sessionStorage.setItem("aspa-intro", "1"));
  if (opts.reducedMotion) await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
}

test.describe("Home · SEO", () => {
  test("metadata, encabezados y datos estructurados", async ({ page }) => {
    await open(page);
    await expect(page).toHaveTitle("Software a medida, apps y webs en Córdoba | Aspa Software");
    await expect(page.locator("html")).toHaveAttribute("lang", "es-AR");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /sistemas de gestión a medida/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.aspasoftware.com");
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveAccessibleName("Construimos el software que tu empresa necesita.");

    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = blocks.flatMap((b) => {
      const d = JSON.parse(b);
      return (d["@graph"] ?? [d]).map((x: { "@type": string }) => x["@type"]);
    });
    expect(types).toEqual(expect.arrayContaining(["ProfessionalService", "WebSite", "ItemList"]));
  });

  test("robots y sitemap", async ({ request }) => {
    expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap: https://www.aspasoftware.com/sitemap.xml");
    expect(await (await request.get("/sitemap.xml")).text()).toContain("<loc>https://www.aspasoftware.com</loc>");
    // URLs del sitio anterior: redirección permanente
    for (const [from, to] of [["/contact", "/contacto"], ["/apps-a-medida", "/sistemas"], ["/desarrollo-web", "/webs"], ["/carcheck", "/casos"]]) {
      const r = await request.get(from, { maxRedirects: 0 });
      expect(r.status(), from).toBe(308);
      expect(r.headers().location, from).toBe(to);
    }
  });
});

test.describe("Home · accesibilidad", () => {
  test("sin violaciones de axe (WCAG 2.2 AA)", async ({ page }) => {
    await open(page);
    const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });

  test("todo el contenido visible con movimiento reducido", async ({ page }) => {
    await open(page, { reducedMotion: true });
    await expect(page.locator("html")).toHaveClass(/no3d/);
    const hidden = await page.$$eval("main h1, main h2, main h3, main p, main .num b", (els) =>
      els.filter((e) => getComputedStyle(e).opacity === "0" && !e.closest("[aria-hidden=true], .tst:not(.on), .tbody")).length,
    );
    expect(hidden).toBe(0);
  });
});

test.describe("Home · layout", () => {
  test("sin scroll horizontal y sin errores en consola", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      // TODO: quitar el filtro cuando existan /sistemas, /webs, /nosotros y /contacto (Next las precarga)
      if (m.type() === "error" && !/404/.test(m.text())) errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));
    await open(page);
    await page.waitForTimeout(1500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });

  test("primera visita: la intro corre, termina y no rompe la hidratación", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error" && !/404/.test(m.text())) errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await expect(page.locator("#intro")).toBeAttached();
    // termina sola a los 3,2 s, se quita del DOM y deja el contenido visible
    await expect(page.locator("#intro")).not.toBeAttached({ timeout: 6000 });
    await expect(page.locator("html")).toHaveClass(/\bgo\b/);
    await expect(page.locator("body")).toHaveCSS("visibility", "visible");
    expect(errors).toEqual([]);
  });

  test("hero (imagen fija de la notebook antes del 3D)", async ({ page }) => {
    await open(page);
    await page.waitForTimeout(1200);
    await expect(page).toHaveScreenshot("hero.png");
  });

  test("página completa (versión fija, movimiento reducido)", async ({ page }) => {
    await open(page, { reducedMotion: true });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("full.png", { fullPage: true });
  });
});
