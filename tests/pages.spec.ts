import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Lo mismo que se le pide al Home, para cada página interna. Sumar acá cada página nueva.
const PAGES = [
  {
    path: "/sistemas",
    title: "Sistemas de gestión a medida en Córdoba | Aspa Software",
    h1: "Sistemas a medida para tu forma de trabajar",
    schema: ["Service", "BreadcrumbList"],
  },
  {
    path: "/webs",
    title: "Páginas web para empresas y profesionales en Córdoba | Aspa Software",
    h1: "Webs que muestran tu trabajo.",
    schema: ["Service", "BreadcrumbList"],
  },
  {
    path: "/webs/planes",
    title: "Precios de páginas web: planes y comparación | Aspa Software",
    h1: "Planes y precios.",
    schema: ["Service", "BreadcrumbList"],
  },
  {
    path: "/casos",
    title: "Casos: sistemas y webs que construimos | Aspa Software",
    h1: "Lo que ya construimos.",
    schema: ["CollectionPage", "BreadcrumbList"],
  },
  { path: "/casos/aspa-rodeo", title: "Aspa Rodeo: sistema de gestión de hacienda | Aspa Software", h1: "Aspa Rodeo", schema: ["SoftwareApplication", "BreadcrumbList"] },
  { path: "/casos/aspa-scout", title: "Aspa Scout: sistema de gestión comercial | Aspa Software", h1: "Aspa Scout", schema: ["SoftwareApplication", "BreadcrumbList"] },
  {
    path: "/nosotros",
    title: "Nosotros: el equipo detrás de Aspa | Aspa Software",
    h1: "No somos solo una empresa: somos un equipo que respira código y estrategia.",
    schema: ["AboutPage", "BreadcrumbList"],
  },
  {
    path: "/contacto",
    title: "Contacto: contanos qué necesitás | Aspa Software",
    h1: "Contanos qué necesitás.",
    schema: ["ContactPage", "BreadcrumbList"],
  },
  { path: "/privacidad", title: "Política de privacidad | Aspa Software", h1: "Política de privacidad.", schema: ["BreadcrumbList"] },
  // páginas por rubro: [slug, título SEO, h1]
  ...(
    [
      ["arquitectos", "Páginas web para arquitectos", "Tus obras merecen una vidriera a su altura."],
      ["estudios-de-arquitectura", "Páginas web para estudios de arquitectura", "Un estudio se juzga por su portfolio. Que esté a la altura."],
      ["interiorismo", "Páginas web para interioristas", "Que vean la transformación antes de llamarte."],
      ["constructoras", "Páginas web para constructoras", "Antes de pedirte presupuesto, te googlean."],
      ["constructoras-de-vivienda", "Páginas web para constructoras de viviendas", "Antes de confiarte su casa, quieren ver las que ya hiciste."],
      ["steel-framing", "Páginas web para empresas de steel framing", "Tu cliente no duda de vos: duda del steel framing."],
      ["desarrollistas", "Páginas web para desarrollistas inmobiliarios", "Vendé unidades antes de que exista el edificio."],
    ] as const
  ).map(([slug, title, h1]) => ({ path: `/webs/${slug}`, title: `${title} | Aspa Software`, h1, schema: ["Service", "BreadcrumbList"] })),
];

// alto de cada <section> del <main> en el diseño, en 1440×900 (d) y 390×844 (m)
const DESIGN: Record<string, { d?: number[]; m?: number[] }> = {
  "/sistemas": {
    // preguntas frecuentes (+5): cada pregunta con su borde completo (el diseño le sacaba el de abajo)
    d: [900, 806, 2430, 709, 2066, 959, 932, 4680, 487, 698, 804, 536],
    m: [844, 824, 2279, 632, 3409, 794, 1127, 3545, 577, 1325, 798, 599],
  },
  // galería en celular: +1 px por la lista accesible (ul > li) alrededor de las tarjetas
  "/webs": { d: [900, 721, 1161, 3271, 933, 883, 554], m: [844, 1099, 1268, 455, 1303, 1052, 659] },
  "/webs/planes": { d: [414, 646, 1462, 626, 554], m: [336, 1094, 1541, 632, 659] },
  "/webs/arquitectos": { d: [886, 784, 786, 713, 1368, 645, 581], m: [714, 593, 1132, 948, 1167, 703, 669] },
  "/webs/estudios-de-arquitectura": { d: [568, 784, 786, 713, 2055, 645, 581] },
  "/webs/interiorismo": { d: [886, 784, 786, 644, 1270, 645, 581] },
  "/webs/constructoras": { d: [568, 784, 786, 727, 1378, 645, 581] },
  // celular: el título del hero entra en 3 líneas (el diseño lo partía por letra y perdía el kerning: 4)
  "/webs/constructoras-de-vivienda": { d: [886, 784, 812, 727, 1403, 645, 581], m: [740, 626, 1212, 957, 1118, 675, 699] },
  "/webs/steel-framing": { d: [886, 812, 742, 1524, 645, 581], m: [740, 1156, 948, 729, 703, 699] },
  "/webs/desarrollistas": { d: [568, 786, 727, 3076, 588, 581] },
  // celular: la lista accesible (ul > li) del listado resta 4 px
  "/nosotros": { d: [792, 782, 748, 907, 646, 491, 338, 628, 554], m: [743, 1067, 1104, 1143, 998, 594, 190, 640, 659] },
  // el aviso de privacidad debajo de «Enviar» suma una línea al formulario; en celular «¿Qué
  // necesitás?» entra en una fila (el diseño lo partía en dos)
  "/contacto": { d: [518, 716], m: [379, 1178] },
  "/casos": { d: [443, 1096, 554], m: [405, 2236, 659] },
  // celular: "Movimientos" se salía de su tarjeta en el diseño; ahora se corta con guion (+21 px)
  "/casos/aspa-rodeo": { d: [631, 514, 475, 1893, 341, 226, 536], m: [684, 435, 766, 871, 272, 170, 599] },
  "/casos/aspa-scout": { d: [631, 479, 475, 1819, 341, 226, 536], m: [709, 407, 810, 612, 272, 170, 599] },
};

async function open(page: Page, path: string, opts: { reducedMotion?: boolean } = {}) {
  await page.addInitScript(() => sessionStorage.setItem("aspa-intro", "1"));
  if (opts.reducedMotion) await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
}

for (const P of PAGES) {
  test.describe(`${P.path}`, () => {
    test("metadata, encabezados y datos estructurados", async ({ page }) => {
      await open(page, P.path);
      await expect(page).toHaveTitle(P.title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.aspasoftware.com${P.path}`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{70,}/);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", P.title);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`${P.path}/opengraph-image|/og/webs-`));
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveAccessibleName(P.h1);
      const types = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap((b) => {
        const d = JSON.parse(b);
        return (d["@graph"] ?? [d]).map((x: { "@type": string }) => x["@type"]);
      });
      expect(types).toEqual(expect.arrayContaining(P.schema));
      // el menú marca la sección actual ("page" si es la página misma; los casos son de Sistemas)
      const sec = P.path.startsWith("/casos") ? "/sistemas" : `/${P.path.split("/")[1]}`;
      // la política de privacidad no está en el menú
      if (P.path !== "/privacidad") await expect(page.locator(`#nav a[href="${sec}"]`)).toHaveAttribute("aria-current", sec === P.path ? "page" : "true");
    });

    test("está en el sitemap", async ({ request }) => {
      expect(await (await request.get("/sitemap.xml")).text()).toContain(`<loc>https://www.aspasoftware.com${P.path}</loc>`);
    });

    test("sin violaciones de axe (WCAG 2.2 AA)", async ({ page }) => {
      await open(page, P.path);
      // recorrer la página para que todo lo que entra con el scroll quede revelado
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

    test("todo el contenido visible con movimiento reducido", async ({ page }) => {
      await open(page, P.path, { reducedMotion: true });
      const hidden = await page.$$eval("main h1, main h2, main h3, main p, main li", (els) =>
        els.filter((e) => getComputedStyle(e).opacity === "0" && !e.closest("[aria-hidden=true], [role=tooltip], .rimg:not(.on), .pt-a, .pt-b")).map((e) => e.textContent?.slice(0, 40)),
      );
      expect(hidden).toEqual([]);
    });

    test("sin scroll horizontal y sin errores en consola", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => {
        // TODO: quitar el filtro cuando existan todas las páginas (Next precarga los links del menú)
        if (m.type() === "error" && !/404/.test(m.text())) errors.push(m.text());
      });
      page.on("pageerror", (e) => errors.push(e.message));
      await open(page, P.path);
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
      });
      await page.waitForTimeout(800);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });

    test("hero (versión fija, movimiento reducido)", async ({ page }) => {
      await open(page, P.path, { reducedMotion: true });
      // el fondo de luz es decorativo y varía apenas entre capturas: se compara el contenido
      await page.addStyleTag({ content: ".field{visibility:hidden!important}" });
      await page.evaluate(() => Promise.all([...document.images].filter((i) => i.loading !== "lazy").map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r))))));
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(`${P.path.slice(1).replace(/\//g, "-")}-hero.png`);
    });

    // Paridad con el diseño: cada sección mide lo mismo que en el prototipo (medido en 1440×900 y
    // 390×844). Las diferencias deliberadas están anotadas en DESIGN y en el README.
    test("paridad con el diseño: alto de cada sección", async ({ page }, info) => {
      const which = info.project.name === "desktop-1440" ? "d" : info.project.name === "mobile-375" ? "m" : null;
      const want = DESIGN[P.path]?.[which ?? "d"];
      test.skip(!which || !want, "se mide en 1440 y en 390 px");
      if (which === "m") await page.setViewportSize({ width: 390, height: 844 });
      await open(page, P.path);
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
        scrollTo(0, 0);
      });
      await page.waitForTimeout(800);
      const got = await page.$$eval("main > section", (ss) => ss.map((s) => Math.round((s as HTMLElement).offsetHeight)));
      // tolerancia: 2 px o 0,5 % (redondeos y suavizado de fuentes entre navegadores)
      expect(got.length).toBe(want!.length);
      got.forEach((h, i) => expect(Math.abs(h - want![i]), `sección ${i + 1}: ${h} px (diseño ${want![i]})`).toBeLessThanOrEqual(Math.max(2, want![i] * 0.005)));
    });
  });
}
