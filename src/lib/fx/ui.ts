// Controles compartidos entre páginas: control segmentado con "gota" y comparador antes/después.
import { $, $$, clamp, lerp, reducedMotion } from "./core";

/** Lleva la gota de vidrio debajo del elemento activo. */
export function dropTo(drop: HTMLElement | null, el: HTMLElement | null, cont: HTMLElement) {
  if (!drop || !el) return;
  const a = el.getBoundingClientRect(),
    b = cont.getBoundingClientRect();
  drop.style.width = a.width + "px";
  drop.style.transform = `translate3d(${a.left - b.left}px,0,0)`;
  drop.style.opacity = "1";
}

/** Control segmentado (role=tablist): marca el botón elegido, mueve la gota y avisa el índice. */
export function initSeg(sg: HTMLElement, onChange: (i: number) => void) {
  const d = $(".seg-drop", sg);
  const bs = $$<HTMLButtonElement>("button", sg);
  const place = () => dropTo(d, $("button.on", sg) || bs[0], sg);
  const pick = (i: number, focus = false) => {
    bs.forEach((x, k) => {
      x.classList.toggle("on", k === i);
      x.setAttribute("aria-selected", String(k === i));
      x.tabIndex = k === i ? 0 : -1;
    });
    if (focus) bs[i].focus();
    place();
    onChange(i);
  };
  const onClick = (e: Event) => {
    const i = bs.indexOf((e.target as Element).closest("button")!);
    if (i >= 0) pick(i);
  };
  // flechas entre pestañas (patrón de tabs de ARIA)
  const onKey = (e: KeyboardEvent) => {
    const i = bs.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    const n = e.key === "ArrowRight" ? (i + 1) % bs.length : e.key === "ArrowLeft" ? (i - 1 + bs.length) % bs.length : -1;
    if (n < 0) return;
    e.preventDefault();
    pick(n, true);
  };
  bs.forEach((x, k) => (x.tabIndex = x.classList.contains("on") || (k === 0 && !$("button.on", sg)) ? 0 : -1));
  sg.addEventListener("click", onClick);
  sg.addEventListener("keydown", onKey);
  const ro = new ResizeObserver(place);
  ro.observe(sg);
  requestAnimationFrame(place);
  return () => {
    sg.removeEventListener("click", onClick);
    sg.removeEventListener("keydown", onKey);
    ro.disconnect();
  };
}

/** Comparador antes/después: se arrastra o se mueve con las flechas; al entrar hace un barrido solo. */
export function initCompare(cmp: HTMLElement) {
  const knob = $<HTMLButtonElement>(".knob", cmp)!;
  let pos = 50,
    drag = false,
    touched = false;
  const set = (p: number) => {
    pos = clamp(p, 2, 98);
    cmp.style.setProperty("--pos", pos + "%");
    knob.setAttribute("aria-valuenow", String(Math.round(pos)));
  };
  const fx = (e: PointerEvent) => {
    const b = cmp.getBoundingClientRect();
    return ((e.clientX - b.left) / b.width) * 100;
  };
  const down = (e: PointerEvent) => {
    drag = touched = true;
    cmp.setPointerCapture(e.pointerId);
    set(fx(e));
  };
  const move = (e: PointerEvent) => drag && set(fx(e));
  const up = () => (drag = false);
  const key = (e: KeyboardEvent) => {
    const s = e.shiftKey ? 10 : 4;
    const d = e.key === "ArrowLeft" ? -s : e.key === "ArrowRight" ? s : 0;
    if (!d) return;
    touched = true;
    set(pos + d);
    e.preventDefault();
  };
  cmp.addEventListener("pointerdown", down);
  cmp.addEventListener("pointermove", move);
  cmp.addEventListener("pointerup", up);
  cmp.addEventListener("pointercancel", up);
  knob.addEventListener("keydown", key);
  // barrido de demostración (50 → 82 → 50, un solo rebote) la primera vez que se ve, si nadie lo tocó
  let raf = 0;
  const io = new IntersectionObserver(
    (es) => {
      if (!es[0].isIntersecting || reducedMotion()) return;
      io.disconnect();
      const keys = [50, 82, 50],
        T = 1200,
        t0 = performance.now();
      const step = (t: number) => {
        if (touched) return;
        const u = clamp((t - t0) / T, 0, 1),
          sg = u * (keys.length - 1),
          i = Math.min(keys.length - 2, sg | 0),
          f = sg - i,
          e = f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2;
        set(lerp(keys[i], keys[i + 1], e));
        if (u < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    },
    { threshold: 0.55 },
  );
  io.observe(cmp);
  return () => {
    io.disconnect();
    cancelAnimationFrame(raf);
    cmp.removeEventListener("pointerdown", down);
    cmp.removeEventListener("pointermove", move);
    cmp.removeEventListener("pointerup", up);
    cmp.removeEventListener("pointercancel", up);
    knob.removeEventListener("keydown", key);
  };
}
