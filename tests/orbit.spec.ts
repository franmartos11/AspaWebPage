import { expect, test } from "@playwright/test";
import { LAPTOP, ORBIT, PHONE, phonePose } from "../src/lib/fx/phone-orbit";

// Prueba numérica de que el celular nunca atraviesa la notebook: en todo el recorrido,
// la distancia mínima entre el celular y la base o la tapa (abierta, como está mientras
// el celular es visible) supera un margen. Matemática pura: corre una sola vez.

type V = [number, number, number];
type M = [V, V, V]; // filas
type Box = { c: V; r: M; h: V };

const mul = (m: M, v: V): V => [0, 1, 2].map((i) => m[i][0] * v[0] + m[i][1] * v[1] + m[i][2] * v[2]) as V;
const mm = (a: M, b: M): M => [0, 1, 2].map((i) => [0, 1, 2].map((j) => a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j])) as M;
const rx = (a: number): M => [[1, 0, 0], [0, Math.cos(a), -Math.sin(a)], [0, Math.sin(a), Math.cos(a)]];
const ry = (a: number): M => [[Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)]];
const rz = (a: number): M => [[Math.cos(a), -Math.sin(a), 0], [Math.sin(a), Math.cos(a), 0], [0, 0, 1]];
const tr = (m: M): M => [0, 1, 2].map((i) => [m[0][i], m[1][i], m[2][i]]) as M;
const add = (a: V, b: V): V => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];

// distancia con signo de un punto a una caja orientada (negativa = adentro)
function dist(p: V, b: Box) {
  const l = mul(tr(b.r), sub(p, b.c));
  const q = l.map((v, i) => Math.abs(v) - b.h[i]);
  const out = Math.hypot(...q.map((v) => Math.max(v, 0)));
  return out > 0 ? out : Math.max(...q);
}
// puntos sobre la superficie de una caja (grilla en las 6 caras)
function surface(b: Box, step = 0.025): V[] {
  const pts: V[] = [];
  const n = b.h.map((h) => Math.max(1, Math.ceil((2 * h) / step)));
  for (let ax = 0; ax < 3; ax++)
    for (const s of [-1, 1]) {
      const u = (ax + 1) % 3,
        w = (ax + 2) % 3;
      for (let i = 0; i <= n[u]; i++)
        for (let j = 0; j <= n[w]; j++) {
          const l: V = [0, 0, 0];
          l[ax] = s * b.h[ax];
          l[u] = -b.h[u] + (2 * b.h[u] * i) / n[u];
          l[w] = -b.h[w] + (2 * b.h[w] * j) / n[w];
          pts.push(add(b.c, mul(b.r, l)));
        }
    }
  return pts;
}
const gap = (a: Box, b: Box) => Math.min(...surface(a).map((p) => dist(p, b)), ...surface(b).map((p) => dist(p, a)));

const I: M = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const { bw, bd, bt, lt, gap: lgap, lidOpen } = LAPTOP;
const base: Box = { c: [0, bt / 2, 0], r: I, h: [bw / 2, bt / 2, bd / 2] };
const lidR = rx(lidOpen);
// la tapa incluye vidrio y pantallas (algo más gruesa que el aluminio)
const lid: Box = { c: add([0, bt + lt / 2 + lgap, -bd / 2], mul(lidR, [0, bd / 2, 0])), r: lidR, h: [bw / 2, bd / 2, lt / 2 + 0.01] };

function phoneBox(q: number): Box {
  const p = phonePose(q);
  const s = ORBIT.scale;
  // mismo orden que Euler XYZ de Three.js; margen por los botones laterales y el módulo de cámaras
  return { c: [p.x, p.y, p.z], r: mm(mm(rx(p.pitch), ry(p.yaw)), rz(p.roll)), h: [(PHONE.w / 2 + 0.008) * s, (PHONE.h / 2) * s, (PHONE.t / 2 + 0.036) * s] };
}

const MARGIN = 0.12; // ~15 % del ancho del celular

test("el celular nunca atraviesa la notebook (distancia mínima en todo el recorrido)", ({}, info) => {
  test.skip(info.project.name !== "desktop-1440", "matemática pura: alcanza con correrla una vez");
  let min = Infinity,
    at = 0;
  for (let q = 0; q <= 4.0001; q += 0.005) {
    const ph = phoneBox(q);
    const d = Math.min(gap(ph, base), gap(ph, lid));
    if (d < min) {
      min = d;
      at = q;
    }
  }
  console.log(`distancia mínima celular–notebook: ${min.toFixed(3)} (q = ${at.toFixed(3)})`);
  expect(min).toBeGreaterThan(MARGIN);
});

test("nunca pasa por delante de la notebook (ni aunque el scroll se detenga a mitad)", ({}, info) => {
  test.skip(info.project.name !== "desktop-1440", "matemática pura");
  for (let q = 0; q <= 4.0001; q += 0.002) {
    const b = phoneBox(q);
    // ancho que ocupa en x (proyección de la caja girada)
    const ex = [0, 1, 2].reduce((acc, j) => acc + Math.abs(b.r[0][j]) * b.h[j], 0);
    const overlapsX = Math.abs(b.c[0]) - ex < bw / 2;
    if (overlapsX) expect(b.c[2], `q=${q.toFixed(3)}`).toBeLessThan(-bd / 2);
  }
});

test("la pantalla del celular cambia solo cuando la tapa lo tapa", ({}, info) => {
  test.skip(info.project.name !== "desktop-1440", "matemática pura");
  let prev = phonePose(0).screen;
  for (let q = 0; q <= 4.0001; q += 0.001) {
    const p = phonePose(q);
    if (p.screen !== prev) {
      const behind = p.z < -bd / 2 - 0.5 && Math.abs(p.x) < bw / 2;
      expect(behind, `cambio en q=${q.toFixed(3)} (x ${p.x.toFixed(2)}, z ${p.z.toFixed(2)})`).toBe(true);
      prev = p.screen;
    }
  }
  expect(prev).toBe(3);
});

// Encuadre real en el navegador: en cada parada el celular entra completo en pantalla
// y no se superpone con la etiqueta del trabajo ni con los indicadores.
test("encuadre: en cada parada el celular se ve completo y no tapa la etiqueta", async ({ page }) => {
  test.setTimeout(120_000);
  await page.addInitScript(() => sessionStorage.setItem("aspa-intro", "1"));
  await page.goto("/");
  const go = (p: number) =>
    page.evaluate((p) => {
      const s = document.querySelector<HTMLElement>("#nbHero")!;
      const y = s.offsetTop + p * (s.offsetHeight - innerHeight);
      const l = (window as Window & { __lenis?: { scrollTo: (y: number, o: object) => void } }).__lenis;
      if (l) l.scrollTo(y, { immediate: true });
      else scrollTo(0, y);
      dispatchEvent(new Event("scroll"));
    }, p);
  await go(0.3);
  await page.mouse.wheel(0, 1); // en táctiles el 3D carga con la primera interacción
  await page.waitForFunction(() => document.querySelector(".nb-3d")?.classList.contains("live"), null, { timeout: 20_000 });
  const vw = page.viewportSize()!;
  for (const q of [0.55, 1.5, 2.5, 3.45]) {
    await go(0.35 + (q / 4) * 0.45);
    await page.waitForTimeout(3800); // la escena tiene límite de velocidad (2 s por trabajo)
    const { ph, tag, marks } = await page.evaluate(() => ({
      ph: (window as Window & { __nb3d?: { phoneRect: () => DOMRect | null } }).__nb3d!.phoneRect(),
      tag: document.querySelector("#nbTag")!.getBoundingClientRect().toJSON(),
      marks: document.querySelector("#nbMarks")!.getBoundingClientRect().toJSON(),
    }));
    expect(ph, `q=${q}: celular visible`).not.toBeNull();
    const r = ph!;
    expect(r.left, `q=${q}: borde izquierdo`).toBeGreaterThanOrEqual(4);
    expect(r.right, `q=${q}: borde derecho`).toBeLessThanOrEqual(vw.width - 4);
    expect(r.top, `q=${q}: borde superior`).toBeGreaterThanOrEqual(0);
    for (const [name, b] of [["etiqueta", tag], ["indicadores", marks]] as const) {
      const hit = r.left < b.right && r.right > b.left && r.top < b.bottom && r.bottom > b.top;
      expect(hit, `q=${q}: tapa ${name}`).toBe(false);
    }
  }
});

// Presupuesto de la escena 3D: lo que cuesta dibujar cada cuadro, medido en el navegador.
test("presupuesto 3D: triángulos, llamadas de dibujo y peso", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop-1440", "alcanza con medirlo una vez");
  test.setTimeout(60_000);
  const bytes: Record<string, number> = {};
  page.on("response", async (r) => {
    const u = new URL(r.url());
    if (u.pathname.startsWith("/3d/") || /notebook3d|three/.test(u.pathname) || u.pathname.includes("/_next/static/chunks/"))
      bytes[u.pathname] = Number(r.headers()["content-length"] || (await r.body().catch(() => Buffer.alloc(0))).length);
  });
  await page.addInitScript(() => sessionStorage.setItem("aspa-intro", "1"));
  await page.goto("/");
  await page.evaluate(() => {
    const s = document.querySelector<HTMLElement>("#nbHero")!;
    scrollTo(0, s.offsetTop + 0.45 * (s.offsetHeight - innerHeight));
  });
  await page.waitForFunction(() => document.querySelector(".nb-3d")?.classList.contains("live"), null, { timeout: 20_000 });
  await page.waitForTimeout(3000);
  const st = await page.evaluate(() => (window as Window & { __nb3d?: { stats: () => Record<string, number> } }).__nb3d!.stats());
  const tex = Object.entries(bytes)
    .filter(([k]) => k.startsWith("/3d/") && !k.includes("poster"))
    .reduce((a, [, v]) => a + v, 0);
  console.log(`3D: ${st.triangles} triángulos, ${st.calls} llamadas, ${st.geometries} geometrías, ${st.textures} texturas, capturas ${(tex / 1024).toFixed(0)} KB`);
  expect(st.triangles).toBeLessThan(150_000);
  expect(st.calls).toBeLessThan(120);
  expect(tex).toBeLessThan(2 * 1024 * 1024);
});
