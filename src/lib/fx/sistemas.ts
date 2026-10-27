// Movimiento de Sistemas: pantallas del hero que rotan y siguen al mouse, comparador
// planilla/sistema, menú de rubros que sigue al scroll y las piezas grandes (partículas,
// flujo automático e historia), cada una en su módulo.
import { $, $$, isDesk, onTick, reducedMotion } from "./core";
import { initFaq } from "./faq";
import { initFlow } from "./flow";
import { initParts } from "./parts";
import { initStory } from "./story";
import { initCompare } from "./ui";

/* ---------- hero: la de adelante pasa atrás cada 3,6 s; parallax suave con el mouse ---------- */
function initShero(off: (() => void)[]) {
  const bg = $(".shero-bg");
  if (!bg || reducedMotion()) return;
  const id = window.setInterval(() => {
    if (document.hidden) return;
    const r = bg.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    $$(".pc", bg).forEach((c) => {
      const k = c.classList.contains("pc1") ? 1 : c.classList.contains("pc2") ? 2 : 3;
      c.classList.remove("pc1", "pc2", "pc3");
      c.classList.add("pc" + (k === 1 ? 3 : k - 1));
      c.style.animation = "none";
    });
  }, 3600);
  const move = (e: PointerEvent) => {
    bg.style.setProperty("--px", ((e.clientX / innerWidth - 0.5) * -18).toFixed(1) + "px");
    bg.style.setProperty("--py", ((e.clientY / innerHeight - 0.5) * -12).toFixed(1) + "px");
  };
  addEventListener("pointermove", move, { passive: true });
  off.push(() => {
    clearInterval(id);
    removeEventListener("pointermove", move);
  });
}

/* ---------- rubros: al pasar el mouse o, si no, el que está a la altura de la vista ---------- */
function initRubros(off: (() => void)[]) {
  const items = $$("#rubList .rub"),
    imgs = $$(".rub-img .rimg");
  if (!items.length) return;
  let cur = 0,
    hov = false;
  const set = (i: number) => {
    if (i === cur) return;
    items.forEach((x, j) => x.classList.toggle("on", j === i));
    imgs.forEach((x, j) => x.classList.toggle("on", j === i));
    cur = i;
  };
  items.forEach((it, i) => {
    it.addEventListener("mouseenter", () => {
      hov = true;
      set(i);
    });
    it.addEventListener("mouseleave", () => (hov = false));
    $("a", it)?.addEventListener("focus", () => set(i));
  });
  const sec = items[0].closest("section")!;
  off.push(
    onTick(() => {
      if (hov) return;
      const s = sec.getBoundingClientRect();
      if (s.top > innerHeight || s.bottom < 0) return;
      const mid = isDesk() ? innerHeight * 0.5 : innerHeight * 0.8;
      let best = cur,
        bd = Infinity;
      items.forEach((it, i) => {
        const r = it.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      set(best);
    }),
  );
}

/* ---------- tooltips de herramientas: se corren lo justo para no salirse de la pantalla ---------- */
function initTips(off: (() => void)[]) {
  const tips = $$(".tech .tip");
  const fit = () =>
    tips.forEach((t) => {
      t.style.setProperty("--tipx", "0px");
      // clientWidth y no innerWidth: si algo ya desbordó, en celular innerWidth crece con el desborde
      const r = t.getBoundingClientRect(),
        m = 12,
        W = document.documentElement.clientWidth;
      const dx = r.left < m ? m - r.left : r.right > W - m ? W - m - r.right : 0;
      t.style.setProperty("--tipx", Math.round(dx) + "px");
    });
  fit();
  addEventListener("resize", fit);
  off.push(() => removeEventListener("resize", fit));
}

export function initSistemas() {
  const off: (() => void)[] = [];
  initShero(off);
  const parts = $("#parts");
  if (parts) off.push(initParts(parts));
  $$("[data-cmp]").forEach((c) => off.push(initCompare(c)));
  // flow.ts también maneja su control segmentado
  const flow = $(".flow-blk");
  if (flow) off.push(initFlow(flow));
  initRubros(off);
  initTips(off);
  off.push(initFaq());
  const story = $("section.story");
  if (story) off.push(initStory(story));
  return () => off.forEach((f) => f());
}
