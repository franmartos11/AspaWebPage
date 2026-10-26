import { defineConfig } from "@playwright/test";

// Los tests corren contra el build de producción (no contra `next dev`).
const PORT = 3200;

const widths = [
  { name: "mobile-375", width: 375, height: 812, isMobile: true, hasTouch: true, deviceScaleFactor: 3 },
  { name: "tablet-768", width: 768, height: 1024, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { name: "laptop-1280", width: 1280, height: 800, isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
  { name: "desktop-1440", width: 1440, height: 900, isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
];

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled" } },
  use: {
    baseURL: `http://localhost:${PORT}`,
    locale: "es-AR",
  },
  projects: [
    ...widths.map(({ name, width, height, ...rest }) => ({
      name,
      // usa el Chrome instalado: no hace falta descargarlo
      use: { channel: "chrome", viewport: { width, height }, ...rest },
    })),
    // el tramo por pasos depende de cómo cada motor entrega la rueda y el teclado: con
    // `npm run test:e2e:engines` se prueba también en WebKit (Safari) y Firefox
    // (antes, una vez: `npx playwright install webkit firefox`)
    ...(process.env.ENGINES ? (["webkit", "firefox"] as const) : []).map((browserName) => ({
      name: `${browserName}-1440`,
      testMatch: /steps\.spec\.ts/,
      use: { browserName, viewport: { width: 1440, height: 900 } },
    })),
  ],
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    // el formulario de contacto no envía mails de verdad en los tests
    env: { CONTACT_DRY_RUN: "1" },
  },
});
