// Regenera la imagen para redes (opengraph-image.jpg, 1200×630) de cada página: es una captura
// de su hero, sin el header. Con `npm run dev` corriendo: `node scripts/og-images.mjs [rutas…]`
// (sin rutas, todas).
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";

// mismos slugs que src/i18n/index.ts (RUBRO_SLUGS)
const RUBROS = {
  arquitectos: "architects",
  "estudios-de-arquitectura": "architecture-studios",
  interiorismo: "interior-design",
  constructoras: "construction-companies",
  "constructoras-de-vivienda": "home-builders",
  "steel-framing": "steel-framing",
  desarrollistas: "real-estate-developers",
};

const BASE = process.env.BASE || "http://localhost:3000";
// [ruta, archivo de salida, esperar a la escena 3D]
const ES = "src/app/(es)",
  EN = "src/app/(en)/en";
const PAGES = [
  ["/", `${ES}/opengraph-image.jpg`, true],
  ["/sistemas", `${ES}/sistemas/opengraph-image.jpg`, false],
  ["/webs", `${ES}/webs/opengraph-image.jpg`, false],
  ["/webs/planes", `${ES}/webs/planes/opengraph-image.jpg`, false],
  ["/nosotros", `${ES}/nosotros/opengraph-image.jpg`, false],
  ["/contacto", `${ES}/contacto/opengraph-image.jpg`, false],
  ["/privacidad", `${ES}/privacidad/opengraph-image.jpg`, false],
  ["/casos", `${ES}/casos/opengraph-image.jpg`, false],
  ["/casos/aspa-rodeo", `${ES}/casos/aspa-rodeo/opengraph-image.jpg`, false],
  ["/casos/aspa-scout", `${ES}/casos/aspa-scout/opengraph-image.jpg`, false],
  // inglés
  ["/en", `${EN}/opengraph-image.jpg`, true],
  ["/en/systems", `${EN}/systems/opengraph-image.jpg`, false],
  ["/en/websites", `${EN}/websites/opengraph-image.jpg`, false],
  ["/en/websites/pricing", `${EN}/websites/pricing/opengraph-image.jpg`, false],
  ["/en/about", `${EN}/about/opengraph-image.jpg`, false],
  ["/en/contact", `${EN}/contact/opengraph-image.jpg`, false],
  ["/en/privacy", `${EN}/privacy/opengraph-image.jpg`, false],
  ["/en/work", `${EN}/work/opengraph-image.jpg`, false],
  ["/en/work/aspa-rodeo", `${EN}/work/aspa-rodeo/opengraph-image.jpg`, false],
  ["/en/work/aspa-scout", `${EN}/work/aspa-scout/opengraph-image.jpg`, false],
  // los rubros comparten una ruta dinámica por idioma: su imagen va en public/og/ y la metadata la referencia
  ...Object.entries(RUBROS).flatMap(([es, en]) => [
    [`/webs/${es}`, `public/og/webs-${es}.jpg`, false],
    [`/en/websites/${en}`, `public/og/en-websites-${en}.jpg`, false],
  ]),
];

const browser = await chromium.launch({ channel: "chrome" });
const only = process.argv.slice(2);
for (const [route, out, wait3d] of PAGES.filter(([p]) => !only.length || only.includes(p))) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.addInitScript(() => sessionStorage.setItem("aspa-intro", "1"));
  await page.goto(BASE + route);
  await page.evaluate(() => document.fonts.ready);
  if (wait3d) await page.waitForFunction(() => document.querySelector(".nb-3d.live"), null, { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(3500);
  await page.addStyleTag({ content: ".hdr,.skip-link,nextjs-portal{display:none!important}" });
  await page.waitForTimeout(300);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(await page.screenshot())
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);
  console.log("✓", out);
  await page.close();
}
await browser.close();
