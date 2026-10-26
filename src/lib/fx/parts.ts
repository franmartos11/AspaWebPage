// SISTEMAS · «De la planilla al sistema»: sección sticky cuyo scroll da vuelta el tablero 3D
// (planilla → sistema) y cruza los dos textos («Tu información, hoy.» → «…ordenada.»).
// La escena se descarga en diferido; mientras tanto (o si falla) se ve la imagen fija.
import { $, clamp, onTick, reducedMotion } from "./core";

export function initParts(sec: HTMLElement) {
  const m = $(".parts-3d", sec);
  const html = document.documentElement;
  const ta = $(".pt-a", sec),
    tb = $(".pt-b", sec);
  // sin WebGL / movimiento reducido / equipo modesto: el CSS de .no3d ya muestra el estado final
  if (!m || html.classList.contains("no3d")) return () => {};
  const off: (() => void)[] = [];

  // respaldo: la imagen fija es la pantalla del sistema, así que queda el texto «ordenada»
  let fb = false;
  const fallback = () => {
    fb = true;
    sec.classList.add("fb");
    if (ta) ta.style.opacity = "0";
    if (tb) tb.style.opacity = "1";
  };
  if (reducedMotion()) {
    fallback();
    return () => {};
  }

  // Progreso con inercia: el scroll fija el objetivo y la escena lo sigue con amortiguación
  // exponencial (independiente de los fps), como en el diseño.
  let shown = -1,
    last = 0;
  off.push(
    onTick((now) => {
      if (fb) return;
      const r = sec.getBoundingClientRect();
      const tp = clamp((innerHeight * 0.45 - r.top) / Math.max(1, r.height - innerHeight * 0.55), 0, 1);
      const gap = last ? (now - last) / 1000 : 0;
      const dt = gap > 0 && gap < 0.1 ? gap : 0.016;
      last = now;
      const offscreen = r.bottom < 0 || r.top > innerHeight;
      if (shown < 0 || offscreen) shown = tp;
      else shown += (tp - shown) * (1 - Math.exp(-dt * 8));
      if (Math.abs(tp - shown) < 0.0002) shown = tp;
      if (offscreen) return;
      // los textos se cruzan a mitad del giro de las fichas
      const p = clamp((shown - 0.3) / 0.58, 0, 1);
      if (ta) ta.style.opacity = (1 - clamp((p - 0.35) / 0.25, 0, 1)).toFixed(3);
      if (tb) tb.style.opacity = clamp((p - 0.55) / 0.3, 0, 1).toFixed(3);
      return shown !== tp;
    }),
  );

  // La escena se descarga en diferido: en escritorio cuando la página queda ociosa (o antes,
  // si la sección se acerca), en táctiles recién con la primera interacción.
  let unmount: (() => void) | null = null;
  let started = false,
    alive = true;
  const coarse = matchMedia("(pointer: coarse)").matches;
  const events = ["scroll", "pointerdown", "keydown", "touchstart", "wheel"];
  const start = () => {
    if (started) return;
    started = true;
    events.forEach((e) => removeEventListener(e, start));
    near.disconnect();
    const timer = setTimeout(() => !m.classList.contains("live") && fallback(), 9000);
    import("./particles3d")
      .then(({ mountParticles }) => {
        if (!alive || fb) return;
        unmount = mountParticles(m, () => Math.max(0, shown), coarse || innerWidth < 981);
      })
      .catch((err) => {
        console.warn("3D desactivado:", err);
        fallback();
      })
      .finally(() => clearTimeout(timer));
  };
  events.forEach((e) => addEventListener(e, start, { passive: true, once: true }));
  const near = new IntersectionObserver((es) => es[0].isIntersecting && !coarse && start(), { rootMargin: "100% 0px" });
  near.observe(sec);
  let idle = 0;
  const later = () => {
    if (coarse) return;
    const ric = window.requestIdleCallback || ((f: () => void) => setTimeout(f, 1));
    idle = window.setTimeout(() => ric(start, { timeout: 2000 }), 2500);
  };
  if (document.readyState === "complete") later();
  else addEventListener("load", later, { once: true });

  return () => {
    alive = false;
    clearTimeout(idle);
    removeEventListener("load", later);
    events.forEach((e) => removeEventListener(e, start));
    near.disconnect();
    off.forEach((f) => f());
    unmount?.();
    sec.classList.remove("fb");
    if (ta) ta.style.opacity = "";
    if (tb) tb.style.opacity = "";
  };
}
