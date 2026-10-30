// Movimiento de las páginas por rubro: la escena 3D del rubro (diferida), el comparador del
// boceto, la maqueta de steel framing y la demo de desarrollistas.
import { $, $$, clamp, onTick } from "./core";
import { lazyScene } from "./scene-loader";
import { initCompare } from "./ui";

const SCENES = {
  house: () => import("./scenes/house"),
  studio: () => import("./scenes/studio"),
  room: () => import("./scenes/room"),
  site: () => import("./scenes/site"),
  homes: () => import("./scenes/homes"),
};

export function initRubro() {
  const off: (() => void)[] = [];
  let alive = true;
  $$(".house-3d[data-kind]").forEach((el) => {
    const load = SCENES[el.dataset.kind as keyof typeof SCENES];
    if (load) off.push(lazyScene(el, load));
  });
  // etapas de la escena: la que corresponde al avance del tramo y la barra (misma cuenta que scrub en scenes/kit)
  $$<HTMLElement>("[data-scrub]").forEach((track) => {
    const items = $$(".sc-steps li", track),
      prog = $<HTMLElement>(".sc-prog", track),
      count = $(".sc-cur", track);
    if (!items.length || !document.documentElement.classList.contains("has3d")) return;
    // dónde arranca cada etapa (fracción del tramo); sin el dato, partes iguales
    const at = ($(".sc-steps", track)?.dataset.at ?? "").split(",").map(Number);
    const start = (k: number) => (at.length === items.length ? at[k] : k / items.length);
    let cur = -1;
    off.push(
      onTick(() => {
        const r = track.getBoundingClientRect(),
          vh = innerHeight;
        if (r.bottom < 0 || r.top > vh) return;
        const p = clamp((vh * 0.3 - r.top) / Math.max(1, r.height - vh * 0.7), 0, 1);
        prog?.style.setProperty("--p", p.toFixed(4));
        let i = 0;
        while (i < items.length - 1 && p >= start(i + 1)) i++;
        if (i === cur) return;
        cur = i;
        items.forEach((li, k) => {
          li.classList.toggle("on", k === i);
          li.classList.toggle("done", k < i);
        });
        if (count) count.textContent = String(i + 1).padStart(2, "0");
      }),
    );
  });
  $$("[data-cmp]").forEach((c) => off.push(initCompare(c)));
  const trama = $("[data-trama]");
  if (trama) import("./trama").then((m) => alive && off.push(m.initTrama(trama)));
  const dev = $("[data-devdemo]");
  if (dev) import("./devdemo").then((m) => alive && off.push(m.initDevDemo(dev)));
  return () => {
    alive = false;
    off.forEach((f) => f());
  };
}
