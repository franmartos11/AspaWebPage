// Movimiento de las páginas por rubro: la escena 3D del rubro (diferida), el comparador del
// boceto, la maqueta de steel framing y la demo de desarrollistas.
import { $, $$ } from "./core";
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
