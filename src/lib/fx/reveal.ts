// Revelados: bloques (.rv), imágenes que se descubren (.rv-img), títulos por línea con máscara ([data-lines]),
// contadores ([data-count]) y el respaldo de 1,5 s si el observer no se disparó.
import { $$, clamp, fontsReady, reducedMotion } from "./core";

/** Parte un título en líneas reales (según el ancho) para revelarlas con máscara. */
function lines(h: HTMLElement) {
  if (!h.dataset.src) h.dataset.src = h.innerHTML;
  h.innerHTML = h.dataset.src;
  const words: HTMLElement[] = [];
  [...h.childNodes].forEach((n) => {
    if (n.nodeType === 3) {
      (n.textContent || "").split(/(\s+)/).forEach((w) => {
        if (w && !/^\s+$/.test(w)) {
          const s = document.createElement("span");
          s.className = "lw";
          s.textContent = w;
          words.push(s);
        }
      });
    } else {
      const s = document.createElement("span");
      s.className = "lw";
      s.appendChild(n.cloneNode(true));
      words.push(s);
    }
  });
  h.textContent = "";
  words.forEach((w, k) => {
    h.appendChild(w);
    if (k < words.length - 1) h.appendChild(document.createTextNode(" "));
  });
  const rows: HTMLElement[][] = [];
  let top: number | null = null;
  words.forEach((w) => {
    const t = w.offsetTop;
    if (top === null || Math.abs(t - top) > 4) {
      rows.push([]);
      top = t;
    }
    rows[rows.length - 1].push(w);
  });
  h.textContent = "";
  rows.forEach((r, k) => {
    const ln = document.createElement("span");
    ln.className = "ln";
    const inn = document.createElement("span");
    inn.className = "lni";
    inn.style.setProperty("--k", String(k));
    r.forEach((w, j) => {
      inn.appendChild(w);
      if (j < r.length - 1) inn.appendChild(document.createTextNode(" "));
    });
    ln.appendChild(inn);
    h.appendChild(ln);
  });
}

function counter(el: HTMLElement, io: IntersectionObserver[]) {
  const to = Number(el.dataset.count),
    pre = el.dataset.pre || "",
    post = el.dataset.post || "";
  if (reducedMotion()) return;
  el.textContent = pre + "0" + post;
  const o = new IntersectionObserver(
    (es) => {
      if (!es[0].isIntersecting) return;
      o.disconnect();
      const t0 = performance.now();
      const f = (t: number) => {
        const u = clamp((t - t0) / 1400, 0, 1),
          e = 1 - Math.pow(1 - u, 4);
        el.textContent = pre + Math.round(to * e) + post;
        if (u < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    },
    { rootMargin: "0px 0px -40% 0px" },
  );
  o.observe(el);
  io.push(o);
}

/** Activa los revelados dentro de root. Devuelve la limpieza. */
export function initReveals(root: ParentNode) {
  const heads = $$("[data-lines]", root);
  const targets = $$(".rv,.rv-img,[data-lines]", root);
  const observers: IntersectionObserver[] = [];
  const reveal = (el: Element) => el.classList.add("in");

  if (reducedMotion()) {
    targets.forEach(reveal);
    return () => {};
  }

  heads.forEach(lines);
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          reveal(e.target);
          io.unobserve(e.target);
        }
      }),
    { rootMargin: "0px 0px -8% 0px" },
  );
  observers.push(io);
  targets.forEach((el) => io.observe(el));

  // respaldo: si algo está en pantalla 1,5 s y no se reveló, se muestra igual
  const seenAt = new Map<Element, number>();
  const failsafe = setInterval(() => {
    const now = performance.now();
    targets.forEach((el) => {
      if (el.classList.contains("in")) return;
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) {
        if (!seenAt.has(el)) seenAt.set(el, now);
        else if (now - (seenAt.get(el) || now) > 1500) reveal(el);
      } else seenAt.delete(el);
    });
  }, 300);

  // al cambiar fuentes o ancho, se vuelven a calcular las líneas
  const relayout = () =>
    heads.forEach((h) => {
      const was = h.classList.contains("in");
      lines(h);
      if (was) h.classList.add("in");
    });
  fontsReady().then(relayout);
  let rt = 0;
  const onResize = () => {
    clearTimeout(rt);
    rt = window.setTimeout(relayout, 150);
  };
  addEventListener("resize", onResize);

  $$("[data-count]", root).forEach((el) => counter(el, observers));

  return () => {
    clearInterval(failsafe);
    removeEventListener("resize", onResize);
    observers.forEach((o) => o.disconnect());
  };
}
