// Tramo por pasos del hero: cada gesto (rueda, trackpad, dedo o tecla) avanza o retrocede
// exactamente un trabajo, y la escena hace una sola animación completa. Antes del primer
// trabajo y después del último el scroll es libre. Se intercepta antes que Lenis (captura
// en window) porque cortar un evento desde Lenis deja que el navegador scrollee igual.

type Lenis = { scrollTo: (y: number, o: object) => void; targetScroll: number };
const L = () => (window as Window & { __lenis?: Lenis | null }).__lenis ?? null;
const soft = (t: number) => 1 - Math.pow(1 - t, 4);

export function initSteps(sec: HTMLElement, stopsP: number[], progress: () => number) {
  const off: (() => void)[] = [];
  const on = <K extends keyof WindowEventMap>(t: K, f: (e: WindowEventMap[K]) => void, o: AddEventListenerOptions) => {
    addEventListener(t, f, o);
    off.push(() => removeEventListener(t, f, o));
  };

  // posición de scroll de cada parada (el hero es sticky: progreso p ↔ scroll)
  let Y: number[] = [];
  const measure = () => {
    const top = sec.getBoundingClientRect().top + scrollY,
      span = sec.offsetHeight - innerHeight;
    Y = stopsP.map((p) => Math.round(top + p * span));
  };
  measure();
  const ro = new ResizeObserver(measure);
  ro.observe(sec);
  off.push(() => ro.disconnect());

  let idx = -1; // parada actual; -1 = scroll libre
  let dirNow = 0; // sentido de la animación en curso
  let until = 0; // tope de la animación en curso (por si la escena no llega)
  const moving = () => performance.now() < until && Math.abs(progress() - stopsP[idx]) > 0.004;
  const go = (i: number, dir: number) => {
    idx = i;
    dirNow = dir;
    until = performance.now() + 2400;
    const l = L();
    if (l) l.scrollTo(Y[i], { duration: 1.1, easing: soft, force: true, lock: true });
    else scrollTo({ top: Y[i], behavior: "smooth" });
  };
  // ¿qué parada corresponde si el scroll ya está en el tramo sin estar en una parada?
  const nextFrom = (y: number, dir: number) => (dir > 0 ? Y.findIndex((v) => v > y + 1) : Y.findLastIndex((v) => v < y - 1));
  const inside = (y: number) => y > Y[0] + 1 && y < Y[Y.length - 1] - 1;
  const atStop = (y: number) => Y.findIndex((v) => Math.abs(v - y) <= 2);

  /* ---------- rueda y trackpad: separar gestos (la inercia no cuenta como gesto nuevo) ---------- */
  let lastT = 0,
    lastMag = 0,
    lastDir = 0,
    used = false, // este gesto ya movió una parada
    lastInput = 0; // última vez que hubo rueda/dedo (para no "atrapar" un arrastre de la barra)
  // sin 3D (versión fija) no hay pasos
  const dead = () => sec.classList.contains("fb");
  const onWheel = (e: WheelEvent) => {
    if (e.ctrlKey || !e.deltaY || dead()) return; // ctrl: zoom con pellizco
    const now = e.timeStamp,
      mag = Math.abs(e.deltaY),
      dir = Math.sign(e.deltaY);
    // Gesto nuevo: al cambiar de sentido, si el impulso vuelve a crecer o tras una pausa.
    // La cola de inercia solo decrece: aunque llegue espaciada (Safari), no cuenta como gesto
    // nuevo salvo que la pausa sea larga.
    const gap = now - lastT;
    if (dir !== lastDir || (mag > lastMag * 1.6 && mag > 8) || gap > 450 || (gap > 180 && mag >= lastMag)) used = false;
    lastT = now;
    lastMag = mag;
    lastDir = dir;
    lastInput = now;
    const stop = () => {
      e.preventDefault();
      e.stopImmediatePropagation();
    };
    if (idx < 0) {
      const y = L()?.targetScroll ?? scrollY;
      const s = atStop(scrollY);
      if (s >= 0) idx = s;
      else if (inside(y)) {
        // llegó al medio del tramo sin pasos (barra, ancla): sigue hasta la parada siguiente
        stop();
        used = true;
        go(nextFrom(y, dir), dir);
        return;
      } else {
        // entra desde arriba o desde abajo: se detiene en la primera/última parada
        const into = dir > 0 ? y < Y[0] && y + e.deltaY >= Y[0] - 1 : y > Y[Y.length - 1] && y + e.deltaY <= Y[Y.length - 1] + 1;
        if (!into) return;
        stop();
        used = true;
        go(dir > 0 ? 0 : Y.length - 1, dir);
        return;
      }
    }
    if (used || (moving() && dir === dirNow)) return stop(); // cola de inercia o mismo sentido
    const n = idx + dir;
    if (n < 0 || n >= Y.length) {
      idx = -1; // sale del tramo: este gesto ya scrollea libre
      return;
    }
    stop();
    used = true;
    go(n, dir);
  };
  on("wheel", onWheel, { capture: true, passive: false });

  /* ---------- dedo: una pasada = un paso; en los bordes el gesto sigue nativo ---------- */
  let ty = 0,
    tDecided = false,
    tFree = false,
    tUsed = false;
  const onTouchStart = (e: TouchEvent) => {
    ty = e.touches[0].clientY;
    tDecided = tFree = tUsed = false;
    lastInput = e.timeStamp;
    if (idx < 0) idx = atStop(scrollY);
  };
  const onTouchMove = (e: TouchEvent) => {
    lastInput = e.timeStamp;
    if (idx < 0 || tFree || e.touches.length !== 1 || dead()) return;
    const dy = ty - e.touches[0].clientY,
      dir = Math.sign(dy);
    // hay que decidir en el primer movimiento: después el navegador ya no deja cancelar
    if (!tDecided && dir) {
      tDecided = true;
      const n = idx + dir;
      if ((n < 0 || n >= Y.length) && !moving()) {
        tFree = true;
        idx = -1;
        return;
      }
    }
    if (e.cancelable) e.preventDefault();
    if (!tUsed && Math.abs(dy) > 36 && !(moving() && dir === dirNow)) {
      const n = idx + dir;
      if (n >= 0 && n < Y.length) {
        tUsed = true;
        go(n, dir);
      }
    }
  };
  on("touchstart", onTouchStart, { capture: true, passive: true });
  on("touchmove", onTouchMove, { capture: true, passive: false });

  /* ---------- teclado: flechas, espacio y Re/Av Pág de a un paso; Inicio y Fin libres ---------- */
  const onKey = (e: KeyboardEvent) => {
    if (dead()) return;
    if (idx < 0 && (idx = atStop(scrollY)) < 0) return;
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if ((e.target as Element).closest?.("a,button,input,textarea,select,[contenteditable]")) return;
    const k = e.key;
    const dir = k === "ArrowDown" || k === "PageDown" || (k === " " && !e.shiftKey) ? 1 : k === "ArrowUp" || k === "PageUp" || (k === " " && e.shiftKey) ? -1 : 0;
    if (!dir) return;
    if (moving() && dir === dirNow) return e.preventDefault();
    const n = idx + dir;
    if (n < 0 || n >= Y.length) {
      idx = -1;
      return;
    }
    e.preventDefault();
    go(n, dir);
  };
  on("keydown", onKey, { capture: true });

  /* ---------- scroll: atrapar la inercia al entrar; soltar si se fue por otro medio ---------- */
  let prevY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    const recent = performance.now() - lastInput < 1500;
    if (dead()) return;
    if (idx < 0 && recent && Y.length) {
      // la inercia (táctil sobre todo) cruzó la primera o la última parada: se frena ahí
      const i = prevY < Y[0] && y >= Y[0] ? 0 : prevY > Y[Y.length - 1] && y <= Y[Y.length - 1] ? Y.length - 1 : -1;
      if (i >= 0) {
        // cortar la inercia nativa: un instante sin overflow la detiene en iOS y Android
        const h = document.documentElement;
        h.style.overflow = "hidden";
        scrollTo(0, Y[i]);
        L()?.scrollTo(Y[i], { immediate: true, force: true });
        requestAnimationFrame(() => (h.style.overflow = ""));
        idx = i;
        dirNow = Math.sign(y - prevY);
        until = performance.now() + 2400;
        used = tUsed = true;
      }
    } else if (idx >= 0 && !moving() && Math.abs(y - Y[idx]) > 40) idx = -1; // barra, Inicio/Fin, anclas
    prevY = scrollY;
  };
  on("scroll", onScroll, { passive: true });

  if (navigator.webdriver)
    (window as Window & { __steps?: unknown }).__steps = { idx: () => idx, stops: () => Y.slice(), moving };

  return () => off.forEach((f) => f());
}
