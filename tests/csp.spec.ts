import { expect, test } from "@playwright/test";

// La política de seguridad de contenido (next.config.ts) no tiene que bloquear nada del propio sitio:
// se recorre cada tipo de página hasta el final (para que arranquen las escenas 3D) y no debe haber violaciones.
const PAGES = ["/", "/sistemas", "/webs", "/webs/planes", "/webs/arquitectos", "/webs/desarrollistas", "/webs/steel-framing", "/casos/aspa-rodeo", "/nosotros", "/contacto", "/en"];

test.describe("Política de seguridad de contenido", () => {
  test.beforeEach(({}, info) => test.skip(!["desktop-1440", "mobile-375"].includes(info.project.name), "alcanza con un escritorio y un celular"));

  for (const path of PAGES) {
    test(`${path} carga sin violaciones`, async ({ page }) => {
      const blocked: string[] = [];
      page.on("console", (m) => /Content Security Policy|Content-Security-Policy/i.test(m.text()) && blocked.push(m.text()));
      await page.addInitScript(() => {
        sessionStorage.setItem("aspa-intro", "1");
        document.addEventListener("securitypolicyviolation", (e) => console.error(`Content Security Policy: ${e.violatedDirective} ${e.blockedURI}`));
      });
      const res = await page.goto(path);
      expect(res!.headers()["content-security-policy"]).toContain("default-src 'self'");
      // hasta el final de la página, de a una pantalla, para que se carguen las escenas en diferido
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
      });
      await page.waitForTimeout(1500);
      expect(blocked).toEqual([]);
    });
  }
});
