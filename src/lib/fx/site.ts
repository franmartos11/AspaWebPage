// Movimiento común a todo el sitio: scroll suave, header, menú, campo de luz,
// brillo del vidrio, línea del footer y marquees que aceleran con el scroll.
import Lenis from "lenis";
import { $, $$, lerp, onTick, reducedMotion, requestTick, wireScroll, pageLang } from "./core";

declare global {
  interface Window {
    __introRunning?: boolean;
    __lenis?: Lenis | null;
  }
}

export function initSite() {
  const RM = reducedMotion();
  const off: (() => void)[] = [];
  wireScroll();

  /* ---------- scroll suave (solo rueda/trackpad; el táctil queda nativo) ---------- */
  let lenis: Lenis | null = null;
  if (!RM) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    window.__lenis = lenis;
    let id = 0;
    const raf = (t: number) => {
      lenis!.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    lenis.on("scroll", requestTick);
    if (window.__introRunning) lenis.stop();
    const start = () => lenis?.start();
    addEventListener("aspa:introdone", start);
    off.push(() => {
      cancelAnimationFrame(id);
      removeEventListener("aspa:introdone", start);
      lenis?.destroy();
      window.__lenis = null;
    });
  }

  /* ---------- header: logo completo arriba, isotipo al bajar ---------- */
  const hdr = $("#hdr");
  off.push(
    onTick(() => {
      hdr?.classList.toggle("compact", !!window.__introRunning || scrollY > 40);
    }),
  );

  /* ---------- menú en celular ---------- */
  const btn = $<HTMLButtonElement>(".menu-btn");
  const setMenu = (o: boolean) => {
    document.body.classList.toggle("menu-open", o);
    btn?.setAttribute("aria-expanded", String(o));
    const en = pageLang() === "en";
    btn?.setAttribute("aria-label", o ? (en ? "Close menu" : "Cerrar menú") : en ? "Open menu" : "Abrir menú");
    if (o) lenis?.stop();
    else lenis?.start();
  };
  const onMenu = () => setMenu(!document.body.classList.contains("menu-open"));
  const onNav = (e: Event) => {
    if ((e.target as Element).closest("#nav a")) setMenu(false);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
      setMenu(false);
      btn?.focus();
    }
  };
  btn?.addEventListener("click", onMenu);
  document.addEventListener("click", onNav);
  addEventListener("keydown", onKey);
  off.push(() => {
    btn?.removeEventListener("click", onMenu);
    document.removeEventListener("click", onNav);
    removeEventListener("keydown", onKey);
  });

  /* ---------- campo de luz: reacciona apenas al scroll ---------- */
  const field = $("#field");
  if (field && !RM)
    off.push(
      onTick(() => {
        field.style.setProperty("--sy", (scrollY * 0.04).toFixed(1) + "px");
      }),
    );

  /* ---------- vidrio: brillo que sigue al mouse ---------- */
  type Hot = HTMLElement & { __x?: number; __y?: number };
  let mx = 0,
    my = 0,
    hot: Hot | null = null;
  const onMove = (e: PointerEvent) => {
    mx = e.clientX;
    my = e.clientY;
    hot = (e.target as Element).closest?.<Hot>(".glass") || null;
    if (hot) requestTick();
  };
  addEventListener("pointermove", onMove, { passive: true });
  off.push(() => removeEventListener("pointermove", onMove));
  off.push(
    onTick(() => {
      if (!hot || !hot.isConnected) return;
      const r = hot.getBoundingClientRect();
      const tx = mx - r.left,
        ty = my - r.top;
      const cx = hot.__x ?? tx,
        cy = hot.__y ?? ty;
      hot.__x = lerp(cx, tx, 0.18);
      hot.__y = lerp(cy, ty, 0.18);
      hot.style.setProperty("--mx", hot.__x.toFixed(1) + "px");
      hot.style.setProperty("--my", hot.__y.toFixed(1) + "px");
      return Math.abs(hot.__x - tx) + Math.abs(hot.__y - ty) > 0.5;
    }),
  );

  /* ---------- línea del footer ---------- */
  const fl = $(".ftr-line");
  if (fl)
    off.push(
      onTick(() => {
        if (!fl.classList.contains("in") && fl.getBoundingClientRect().top < innerHeight * 0.95) fl.classList.add("in");
      }),
    );

  /* ---------- marquees que aceleran con el scroll ---------- */
  let sy = scrollY,
    vel = 0;
  off.push(
    onTick(() => {
      const tracks = $$(".mq-track");
      if (!tracks.length) return;
      const d = scrollY - sy;
      sy = scrollY;
      vel = Math.max(vel * 0.92, Math.min(6, Math.abs(d) / 14));
      if (vel < 0.01) vel = 0;
      tracks.forEach((tr) => tr.getAnimations().forEach((a) => (a.playbackRate = 1 + vel)));
      return vel > 0;
    }),
  );

  requestTick();
  return () => off.forEach((f) => f());
}
