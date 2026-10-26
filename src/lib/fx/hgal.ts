// Galería horizontal guiada por el scroll ([data-hgal]): en escritorio la sección se alarga
// y el scroll vertical desplaza la fila de tarjetas; en celular (o con movimiento reducido)
// queda como carrusel nativo. Compartida entre el Home y Webs.
import { $, $$, clamp, isDesk, onTick, reducedMotion } from "./core";

export function initGallery() {
  const off: (() => void)[] = [];
  const RM = reducedMotion();
  const secs = $$("[data-hgal]");
  const dist = new Map<HTMLElement, number>();
  const layout = () =>
    secs.forEach((s) => {
      const tr = $(".hgal-track", s)!;
      if (!isDesk() || RM) {
        s.style.height = "";
        s.classList.add("native");
        return;
      }
      s.classList.remove("native");
      const d = Math.max(0, tr.scrollWidth - innerWidth);
      dist.set(s, d);
      s.style.height = innerHeight + d + "px";
    });
  layout();
  document.fonts?.ready.then(layout);
  let rt = 0;
  const onResize = () => {
    clearTimeout(rt);
    rt = window.setTimeout(layout, 150);
  };
  addEventListener("resize", onResize);
  addEventListener("load", layout);
  off.push(() => {
    removeEventListener("resize", onResize);
    removeEventListener("load", layout);
  });
  off.push(
    onTick(() => {
      secs.forEach((s) => {
        if (s.classList.contains("native")) return;
        const r = s.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const p = clamp(-r.top / Math.max(1, r.height - innerHeight), 0, 1);
        $(".hgal-track", s)!.style.transform = `translate3d(${-p * (dist.get(s) || 0)}px,0,0)`;
        const bar = $(".hgal-bar i", s);
        if (bar) bar.style.transform = `scaleX(${p})`;
      });
    }),
  );
  return () => off.forEach((f) => f());
}
