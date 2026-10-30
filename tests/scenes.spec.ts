import { expect, test } from "@playwright/test";

// Escenas 3D de los rubros: se arman con el scroll (tramo fijo, scrub en lib/fx/scenes/kit.ts) y tienen
// un presupuesto de dibujo por cuadro. Se mide con la escena terminada (al final de su tramo).
const SCENES = [
  ["/webs/arquitectos", ".house-3d"],
  ["/webs/estudios-de-arquitectura", ".house-3d"],
  ["/webs/interiorismo", ".house-3d"],
  ["/webs/constructoras", ".house-3d"],
  ["/webs/constructoras-de-vivienda", ".house-3d"],
  ["/webs/desarrollistas", ".tower-3d"],
] as const;

type Stats = { calls: number; triangles: number; geometries: number; textures: number };

for (const [path, sel] of SCENES) {
  test(`${path}: la escena se arma con el scroll y entra en el presupuesto`, async ({ page }, info) => {
    test.skip(info.project.name !== "desktop-1440", "alcanza con medirlo una vez");
    test.setTimeout(60_000);
    await page.addInitScript(() => sessionStorage.setItem("aspa-intro", "1"));
    await page.goto(path);
    const has3d = await page.evaluate(() => document.documentElement.classList.contains("has3d"));
    test.skip(!has3d, "sin WebGL en este navegador");
    // el scroll suave (Lenis) arranca con la página: si se salta antes, después vuelve a su posición
    await page.waitForFunction(() => "__lenis" in window, null, { timeout: 10_000 }).catch(() => {});
    const go = (f: number) =>
      page.evaluate(
        ([s, f]) => {
          const t = document.querySelector(s as string)!.closest<HTMLElement>("[data-scrub]")!;
          const top = t.getBoundingClientRect().top + scrollY;
          const y = top - innerHeight * 0.3 + (f as number) * (t.offsetHeight - innerHeight * 0.7);
          // el sitio usa scroll suave (Lenis): el salto tiene que ser inmediato para medir
          const lenis = (window as Window & { __lenis?: { scrollTo: (y: number, o: object) => void } }).__lenis;
          if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
          else scrollTo(0, y);
        },
        [sel, f] as const,
      );
    // al entrar al tramo la escena queda fija en pantalla
    await go(0.5);
    await page.waitForTimeout(300);
    await page.waitForFunction((s) => document.querySelector(s)?.classList.contains("live"), sel, { timeout: 20_000 });
    // (se espera a que se asiente: con la página bajo carga el scroll puede tardar unos cuadros)
    await page.waitForFunction((s) => Math.abs(document.querySelector(s)!.closest("[data-scrub]")!.firstElementChild!.getBoundingClientRect().top) <= 1, sel, {
      timeout: 5_000,
    });
    // al final del tramo: la obra terminada, medida
    await go(1);
    await page.waitForTimeout(2500);
    const st = await page.evaluate((s) => (document.querySelector(s) as HTMLElement & { __stats: () => Stats }).__stats(), sel);
    console.log(`${path}: ${st.calls} llamadas, ${st.triangles} triángulos, ${st.geometries} geometrías, ${st.textures} texturas`);
    expect(st.calls).toBeLessThan(150);
    expect(st.triangles).toBeLessThan(50_000);
  });
}
