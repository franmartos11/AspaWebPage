// Movimiento de Casos: filtro del listado (control segmentado) y visor de capturas de cada caso.
import { $, $$, EXPO, reducedMotion } from "./core";
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
  const lb = $<HTMLDialogElement>("#lb");
  if (!lb) return () => {};
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
    list = $$<HTMLElement>("[data-lb]", t.parentElement!);
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
  };
}
