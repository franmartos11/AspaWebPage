// Movimiento de Webs: selector de rubros (el visor 3D de devices.ts muestra la web de ese rubro
// en la MacBook y el iPhone), galería horizontal y línea de tiempo que se completa con el scroll.
import { $, $$, clamp, isDesk, onTick, reducedMotion } from "./core";
import { initDevices } from "./devices";
import { initGallery } from "./hgal";

/* ---------- rubros: mouse/foco en escritorio; en celular, el que pasa a la altura de la vista ---------- */
function initRubros(off: (() => void)[], onSet: (slug: string) => void) {
  const rows = $$<HTMLAnchorElement>(".rb-row[data-rubro]");
  if (!rows.length) return;
  let cur = "arquitectos",
    hov = false;
  const set = (slug: string) => {
    if (slug === cur) return;
    cur = slug;
    rows.forEach((r) => r.classList.toggle("on", r.dataset.rubro === slug));
    onSet(slug); // el visor cambia la leyenda, la imagen de respaldo y la escena 3D
  };
  rows.forEach((r) => {
    r.addEventListener("mouseenter", () => {
      hov = true;
      set(r.dataset.rubro!);
    });
    r.addEventListener("mouseleave", () => (hov = false));
    r.addEventListener("focus", () => set(r.dataset.rubro!));
  });
  const sec = rows[0].closest("section")!;
  off.push(
    onTick(() => {
      if (hov || isDesk()) return;
      const s = sec.getBoundingClientRect();
      if (s.top > innerHeight || s.bottom < 0) return;
      let best = cur,
        bd = Infinity;
      rows.forEach((r) => {
        const x = r.getBoundingClientRect();
        const d = Math.abs(x.top + x.height / 2 - innerHeight * 0.75);
        if (d < bd) {
          bd = d;
          best = r.dataset.rubro!;
        }
      });
      set(best);
    }),
  );
}

/* ---------- línea de tiempo: la línea crece y los puntos se encienden al pasar el 60 % de la vista ---------- */
function initTimeline(off: (() => void)[]) {
  const RM = reducedMotion();
  $$("[data-tl]").forEach((tl) => {
    const b = $(".tl-line b", tl),
      items = $$("li", tl);
    off.push(
      onTick(() => {
        const r = tl.getBoundingClientRect();
        if (r.top > innerHeight || r.bottom < 0) return;
        const p = RM ? 1 : clamp((innerHeight * 0.6 - r.top) / r.height, 0, 1);
        if (b) b.style.transform = `scaleY(${p})`;
        items.forEach((li) => {
          const d = $(".tl-dot", li);
          const y = (d || li).getBoundingClientRect().top;
          li.classList.toggle("on", RM || y < innerHeight * 0.6);
        });
      }),
    );
  });
}

export function initWebs() {
  const off: (() => void)[] = [];
  const viewer = $(".rb-viewer");
  if (viewer) {
    const dev = initDevices(viewer);
    dev.set("arquitectos");
    off.push(dev.off);
    initRubros(off, dev.set);
  }
  off.push(initGallery());
  initTimeline(off);
  return () => off.forEach((f) => f());
}
