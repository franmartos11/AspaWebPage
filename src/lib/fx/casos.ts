// Movimiento de Casos: filtro del listado (control segmentado) y visor de capturas de cada caso.
import { $, $$, clamp, EXPO, isDesk, lerp, onTick, reducedMotion, requestTick } from "./core";
import { initSeg } from "./ui";

/* ---------- /casos: el filtro oculta los trabajos que no son del tipo elegido ---------- */
export function initCasos() {
  const sg = $('[data-seg="casos"]');
  if (!sg) return () => {};
  const bs = $$<HTMLButtonElement>("button", sg);
  const items = $$<HTMLElement>("#casesGrid li");
  return initSeg(sg, (i) => {
    const f = bs[i].dataset.f!;
    items.forEach((li) => (li.hidden = f !== "all" && !li.dataset.f!.split(" ").includes(f)));
  });
}

/* ---------- casos: visor (<dialog>) con anterior/siguiente, flechas del teclado y Escape ---------- */
export function initCaso() {
  const offTour = initTour(),
    offShow = initShowcase();
  const lb = $<HTMLDialogElement>("#lb");
  if (!lb)
    return () => {
      offTour();
      offShow();
    };
  const img = $<HTMLImageElement>("#lbImg", lb)!,
    cap = $("#lbCap", lb)!,
    count = $("#lbCount", lb)!,
    inner = $(".lb-in", lb)!;
  let list: HTMLElement[] = [],
    i = 0;
  const pad = (n: number) => String(n).padStart(2, "0");
  const show = () => {
    const b = list[i],
      thumb = $<HTMLImageElement>("img", b)!;
    img.removeAttribute("srcset");
    img.src = thumb.currentSrc || thumb.src; // lo que ya está en caché, mientras llega la grande
    img.sizes = b.dataset.sizes || "";
    if (b.dataset.srcset) img.srcset = b.dataset.srcset;
    img.alt = thumb.alt;
    cap.textContent = b.dataset.cap || "";
    count.textContent = `${pad(i + 1)} / ${pad(list.length)}`;
  };
  const step = (d: number) => {
    i = (i + d + list.length) % list.length;
    show();
  };
  const onClick = (e: MouseEvent) => {
    const t = (e.target as Element).closest<HTMLElement>("[data-lb]");
    if (!t) return;
    // las capturas de un mismo grupo se recorren juntas aunque estén en filas distintas (recorrido de Scout)
    list = $$<HTMLElement>("[data-lb]", t.closest<HTMLElement>("[data-lb-group]") ?? t.parentElement!);
    i = list.indexOf(t);
    show();
    lb.showModal();
    window.__lenis?.stop();
    if (!reducedMotion())
      inner.animate(
        [
          { opacity: 0, transform: "scale(.96)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 600, easing: EXPO },
      );
  };
  const onLb = (e: MouseEvent) => {
    const t = e.target as Element;
    if (t === lb || t.closest("[data-lb-close]")) lb.close();
    else if (t.closest("[data-lb-next]")) step(1);
    else if (t.closest("[data-lb-prev]")) step(-1);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  };
  const onClose = () => window.__lenis?.start();
  const main = document.getElementById("main")!;
  main.addEventListener("click", onClick);
  lb.addEventListener("click", onLb);
  lb.addEventListener("keydown", onKey);
  lb.addEventListener("close", onClose);
  return () => {
    main.removeEventListener("click", onClick);
    lb.removeEventListener("click", onLb);
    lb.removeEventListener("keydown", onKey);
    lb.removeEventListener("close", onClose);
    if (lb.open) lb.close();
    offTour();
    offShow();
  };
}

/* ---------- hero con escena (Scout): la pantalla sigue al puntero y se endereza con el scroll ---------- */
function initShowcase() {
  const stage = $("[data-sx]");
  if (!stage) return () => {};
  const scene = $(".sx-scene", stage)!;
  // "Ver los módulos": salto suave con el scroll de Lenis, dejando lugar para el header
  const onJump = (e: MouseEvent) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href="#caso-modulos"]');
    const el = a && document.getElementById("caso-modulos");
    if (!el) return;
    e.preventDefault();
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -120, duration: 1.4 });
    else el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
  };
  document.addEventListener("click", onJump);
  if (reducedMotion()) return () => document.removeEventListener("click", onJump);

  let tx = 0,
    ty = 0,
    mx = 0,
    my = 0,
    lastSp = -1;
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !isDesk()) return;
    tx = clamp((e.clientX / innerWidth) * 2 - 1, -1, 1);
    ty = clamp((e.clientY / innerHeight) * 2 - 1, -1, 1);
    requestTick();
  };
  const onLeave = () => {
    tx = ty = 0;
    requestTick();
  };
  const tick = () => {
    const r = stage.getBoundingClientRect(),
      vh = innerHeight;
    if (r.bottom < 0 || r.top > vh) return false;
    // 0 cuando la escena asoma abajo, 1 cuando su centro llega a la mitad de la pantalla
    const sp = clamp((vh - r.top) / (vh * 0.5 + r.height * 0.5), 0, 1);
    mx = lerp(mx, tx, 0.08);
    my = lerp(my, ty, 0.08);
    if (Math.abs(sp - lastSp) > 0.001) {
      scene.style.setProperty("--sp", sp.toFixed(3));
      lastSp = sp;
    }
    scene.style.setProperty("--mx", mx.toFixed(3));
    scene.style.setProperty("--my", my.toFixed(3));
    return Math.abs(mx - tx) > 0.002 || Math.abs(my - ty) > 0.002;
  };
  addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
  const offTick = onTick(tick);
  return () => {
    offTick();
    removeEventListener("pointermove", onMove);
    document.documentElement.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("click", onJump);
  };
}

/* ---------- módulos de Scout: pestañas con avance solo hasta que se elige una a mano ---------- */
function initTour() {
  const mt = $("[data-mt]");
  if (!mt) return () => {};
  const tabs = $$<HTMLButtonElement>('[role="tab"]', mt),
    panels = $$<HTMLElement>('[role="tabpanel"]', mt),
    RM = reducedMotion();
  let cur = 0,
    auto = !RM,
    seen = false,
    hover = false;

  const show = (i: number, focus = false) => {
    cur = i;
    tabs.forEach((b, k) => {
      const on = k === i;
      b.classList.toggle("on", on);
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p, k) => p.classList.toggle("on", k === i));
    if (focus) tabs[i].focus();
  };
  // el avance solo se pausa fuera de pantalla o con el puntero encima, y se apaga al elegir a mano
  const sync = () => {
    mt.classList.toggle("auto", auto);
    mt.classList.toggle("paused", !seen || hover);
  };
  const manual = () => {
    auto = false;
    sync();
  };
  const onClick = (e: MouseEvent) => {
    const i = tabs.indexOf((e.target as Element).closest<HTMLButtonElement>('[role="tab"]')!);
    if (i < 0) return;
    manual();
    show(i);
  };
  const onKey = (e: KeyboardEvent) => {
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    const n = tabs.length,
      k = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: n - 1 }[e.key];
    if (k === undefined) return;
    e.preventDefault();
    manual();
    show((k + n) % n, true);
  };
  // la barra de la pestaña activa terminó de llenarse: pasa al módulo siguiente
  const onEnd = (e: AnimationEvent) => {
    if (!auto || e.animationName !== "mtBar") return;
    show((cur + 1) % tabs.length);
  };
  const onEnter = () => {
    hover = true;
    sync();
  };
  const onLeave = () => {
    hover = false;
    sync();
  };
  const io = new IntersectionObserver(
    ([en]) => {
      seen = en.isIntersecting;
      sync();
    },
    { threshold: 0.35 },
  );
  io.observe(mt);
  const list = $(".mt-list", mt)!,
    stage = $(".mt-stage", mt)!;
  list.addEventListener("click", onClick);
  list.addEventListener("keydown", onKey);
  list.addEventListener("animationend", onEnd);
  stage.addEventListener("pointerenter", onEnter);
  stage.addEventListener("pointerleave", onLeave);
  sync();
  return () => {
    io.disconnect();
    list.removeEventListener("click", onClick);
    list.removeEventListener("keydown", onKey);
    list.removeEventListener("animationend", onEnd);
    stage.removeEventListener("pointerenter", onEnter);
    stage.removeEventListener("pointerleave", onLeave);
  };
}
