import { expect, test, type Page } from "@playwright/test";

// Tramo de los trabajos por pasos: un gesto = un trabajo. Se reproducen entradas como las de
// cada dispositivo (trackpad con inercia, rueda con muescas, teclado, dedo) y se verifica la
// parada y la posición exacta del scroll.

type S = { idx: number; y: number; stops: number[]; moving: boolean };
type W = Window & { __steps?: { idx: () => number; stops: () => number[]; moving: () => boolean } };
const state = (page: Page) =>
  page.evaluate((): S => {
    const s = (window as W).__steps!;
    return { idx: s.idx(), y: Math.round(scrollY), stops: s.stops(), moving: s.moving() };
  });
const settle = async (page: Page) => {
  await page.waitForFunction(() => !(window as W).__steps!.moving(), null, { timeout: 8000 });
  await page.waitForTimeout(250);
};

async function open(page: Page, touch = false) {
  await page.addInitScript(() => sessionStorage.setItem("aspa-intro", "1"));
  await page.goto("/");
  await page.waitForFunction(() => (window as W).__steps);
  // justo antes del tramo de los trabajos (a 150 px de la primera parada)
  await page.evaluate(() => scrollTo(0, (window as W).__steps!.stops()[0] - 150));
  if (!touch) await page.mouse.move(720, 450);
  await page.waitForTimeout(600);
}
// trackpad: un toque con ~1,5 s de inercia que se apaga sola
async function trackpad(page: Page, dir: 1 | -1) {
  let d = 60;
  for (let i = 0; i < 90; i++) {
    await page.mouse.wheel(0, dir * Math.max(1, Math.round(d)));
    d *= 0.955;
    await page.waitForTimeout(16);
  }
}
// rueda de mouse: muescas rápidas seguidas
async function notches(page: Page, dir: 1 | -1, n = 10) {
  for (let i = 0; i < n; i++) {
    await page.mouse.wheel(0, dir * 100);
    await page.waitForTimeout(30);
  }
}
const onStop = (s: S, i: number) => {
  expect(s.idx).toBe(i);
  expect(Math.abs(s.y - s.stops[i])).toBeLessThanOrEqual(1);
};

test.describe("Hero · un gesto = un trabajo", () => {
  test.beforeEach(({}, info) => test.skip(!info.project.name.endsWith("1440"), "rueda y teclado: escritorio (Chrome, WebKit y Firefox)"));

  test("trackpad con inercia: entra al primer trabajo y cada toque avanza exactamente uno", async ({ page }) => {
    await open(page);
    await trackpad(page, 1);
    await settle(page);
    onStop(await state(page), 0);
    for (const i of [1, 2]) {
      await trackpad(page, 1);
      await settle(page);
      onStop(await state(page), i);
    }
  });

  test("diez muescas rápidas de rueda = un solo trabajo, con una animación de ~2 s", async ({ page }) => {
    await open(page);
    await notches(page, 1, 3);
    await settle(page);
    onStop(await state(page), 0);
    const t0 = Date.now();
    await notches(page, 1, 10);
    await settle(page);
    const ms = Date.now() - t0;
    onStop(await state(page), 1);
    console.log(`un paso tardó ${ms} ms (con las 10 muescas incluidas)`);
    expect(ms).toBeLessThan(2900);
  });

  test("invertir a mitad de la animación vuelve al trabajo anterior", async ({ page }) => {
    await open(page);
    await notches(page, 1, 2);
    await settle(page);
    await notches(page, 1, 2);
    await page.waitForTimeout(400);
    expect((await state(page)).moving).toBe(true);
    await notches(page, -1, 2);
    await settle(page);
    onStop(await state(page), 0);
  });

  test("teclado: flecha abajo y arriba de a un trabajo", async ({ page }) => {
    await open(page);
    await notches(page, 1, 2);
    await settle(page);
    await page.keyboard.press("ArrowDown");
    await settle(page);
    onStop(await state(page), 1);
    await page.keyboard.press("ArrowUp");
    await settle(page);
    onStop(await state(page), 0);
  });

  test("en el último trabajo, el siguiente gesto sale del tramo (no atrapa)", async ({ page }) => {
    await open(page);
    for (let i = 0; i < 4; i++) {
      await notches(page, 1, 2);
      await settle(page);
    }
    onStop(await state(page), 3);
    await notches(page, 1, 6);
    await page.waitForTimeout(1200);
    const s = await state(page);
    expect(s.idx).toBe(-1);
    expect(s.y).toBeGreaterThan(s.stops[3] + 100);
  });
});

test.describe("Hero · táctil", () => {
  test.beforeEach(({}, info) => test.skip(info.project.name !== "mobile-375", "táctil: celular"));

  test("una pasada con el dedo = un trabajo", async ({ page }) => {
    await open(page, true);
    const cdp = await page.context().newCDPSession(page);
    const swipe = async (from: number, to: number) => {
      await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 190, y: from }] });
      for (let k = 1; k <= 12; k++)
        await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 190, y: from + ((to - from) * k) / 12 }] });
      await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    };
    // posicionarse en el primer trabajo
    await page.evaluate(() => {
      const st = (window as W).__steps!.stops();
      scrollTo(0, st[0]);
    });
    await page.waitForTimeout(300);
    await swipe(600, 300);
    await settle(page);
    onStop(await state(page), 1);
    await swipe(300, 600);
    await settle(page);
    onStop(await state(page), 0);
  });
});
