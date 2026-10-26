// Regenera la imagen para redes (opengraph-image.jpg, 1200×630) de cada página: es una captura
// de su hero, sin el header. Con `npm run dev` corriendo: `node scripts/og-images.mjs [rutas…]`
// (sin rutas, todas).
import { chromium } from "@playwright/test";
import sharp from "sharp";

const BASE = process.env.BASE || "http://localhost:3000";
// [ruta, archivo de salida, esperar a la escena 3D]
const PAGES = [
  ["/", "src/app/opengraph-image.jpg", true],
  ["/sistemas", "src/app/sistemas/opengraph-image.jpg", false],
  ["/webs", "src/app/webs/opengraph-image.jpg", false],
  ["/webs/planes", "src/app/webs/planes/opengraph-image.jpg", false],
  ["/nosotros", "src/app/nosotros/opengraph-image.jpg", false],
  ["/contacto", "src/app/contacto/opengraph-image.jpg", false],
  ["/privacidad", "src/app/privacidad/opengraph-image.jpg", false],
  ["/casos", "src/app/casos/opengraph-image.jpg", false],
  ["/casos/aspa-rodeo", "src/app/casos/aspa-rodeo/opengraph-image.jpg", false],
  ["/casos/aspa-scout", "src/app/casos/aspa-scout/opengraph-image.jpg", false],
  // los rubros comparten una ruta dinámica: su imagen va en public/og/ y la metadata la referencia
  ...["arquitectos", "estudios-de-arquitectura", "interiorismo", "constructoras", "constructoras-de-vivienda", "steel-framing", "desarrollistas"].map(
    (s) => [`/webs/${s}`, `public/og/webs-${s}.jpg`, false],
  ),
];

const browser = await chromium.launch({ channel: "chrome" });
const only = process.argv.slice(2);
for (const [path, out, wait3d] of PAGES.filter(([p]) => !only.length || only.includes(p))) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.addInitScript(() => sessionStorage.setItem("aspa-intro", "1"));
  await page.goto(BASE + path);
  await page.evaluate(() => document.fonts.ready);
  if (wait3d) await page.waitForFunction(() => document.querySelector(".nb-3d.live"), null, { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(3500);
  await page.addStyleTag({ content: ".hdr,.skip-link,nextjs-portal{display:none!important}" });
  await page.waitForTimeout(300);
  await sharp(await page.screenshot())
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);
  console.log("✓", out);
  await page.close();
}
await browser.close();
