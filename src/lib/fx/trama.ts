// Maqueta "Trama" (steel framing): el deslizador y los pasos llevan la casa de la estructura a
// terminada. Los controles funcionan siempre (etiqueta, paso activo y aria-valuetext); la escena 3D
// (./scenes/steel) se carga diferida en #trStage y, mientras no está, queda la imagen de respaldo
// (.m3d-fb). Sin WebGL, con movimiento reducido o si la escena no cargó, el deslizador descubre la
// casa terminada (.tr-end) sobre la estructura, como en el diseño.
import { $, $$, reducedMotion } from "./core";
import { lazyScene } from "./scene-loader";
import type { TramaCtl } from "./scenes/steel";

const NAMES = ["Estructura de perfiles", "Aislación", "Placas OSB", "Terminación exterior", "Techo", "Casa terminada"];
/** Etapa (0..5) según el avance, con los mismos cortes que el diseño. */
const stageOf = (v: number) => (v < 0.2 ? 0 : v < 0.38 ? 1 : v < 0.58 ? 2 : v < 0.72 ? 3 : v < 0.88 ? 4 : 5);

export function initTrama(root: HTMLElement): () => void {
  const rng = $<HTMLInputElement>("#trRange", root),
    lbl = $("#trLbl", root),
    stageEl = $("#trStage", root),
    steps = $$<HTMLButtonElement>(".tr-steps button[data-v]", root);
  if (!rng) return () => {};
  const at = steps.map((b) => +(b.dataset.v ?? 0));

  let shown = -1;
  const valueText = () => {
    const n = stageOf(ctl.target);
    rng.setAttribute("aria-valuetext", `Paso ${n + 1} de ${NAMES.length}: ${NAMES[n]}`);
  };
  const ctl: TramaCtl = {
    target: +rng.value / 100,
    touched: false,
    show(v) {
      const n = stageOf(v);
      if (n !== shown && lbl) {
        shown = n;
        lbl.textContent = `0${n + 1}/06 · ${NAMES[n]}`;
      }
      steps.forEach((b, q) => b.classList.toggle("on", v >= at[q] - 0.1 && v < (q < at.length - 1 ? at[q + 1] - 0.1 : 2)));
    },
    auto(v) {
      if (ctl.touched) return;
      ctl.target = v;
      rng.value = String(Math.round(v * 100));
      valueText();
    },
  };
  // modo sin 3D: comparación entre las dos imágenes (fb-show = la escena falló o tardó demasiado)
  const flat = () =>
    !!stageEl &&
    !stageEl.classList.contains("live") &&
    (!document.documentElement.classList.contains("has3d") || reducedMotion() || stageEl.classList.contains("fb-show"));
  const compare = () => {
    if (!stageEl) return;
    const on = flat();
    stageEl.classList.toggle("tr-2d", on);
    if (on) stageEl.style.setProperty("--tr-pos", `${100 - Math.round(ctl.target * 100)}%`);
  };
  // sin la escena andando, la etiqueta y los pasos siguen directo al control
  const set = (v: number) => {
    ctl.touched = true;
    ctl.target = v;
    valueText();
    if (!stageEl?.classList.contains("live")) ctl.show(v);
    compare();
  };
  const onInput = () => set(+rng.value / 100);
  const onStep = (e: Event) => {
    const v = +((e.currentTarget as HTMLElement).dataset.v ?? 0);
    rng.value = String(Math.round(v * 100));
    set(v);
  };
  rng.addEventListener("input", onInput);
  steps.forEach((b) => b.addEventListener("click", onStep));
  valueText();
  ctl.show(ctl.target);
  compare();

  const off3d = stageEl ? lazyScene(stageEl, () => import("./scenes/steel").then((m) => ({ mount: (el: HTMLElement) => m.mount(el, ctl) }))) : () => {};
  return () => {
    off3d();
    rng.removeEventListener("input", onInput);
    steps.forEach((b) => b.removeEventListener("click", onStep));
    stageEl?.classList.remove("tr-2d");
    stageEl?.style.removeProperty("--tr-pos");
  };
}
