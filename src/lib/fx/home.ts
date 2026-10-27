// Movimiento del Home: textos del hero según el scroll, acordeón con autoplay,
// galería horizontal guiada por el scroll y carga diferida de la notebook 3D.
import { $, $$, EXPO, clamp, onTick, pageLang, reducedMotion } from "./core";
import { initGallery } from "./hgal";
import { initSteps } from "./steps";

const SOFT = "cubic-bezier(.22,1,.36,1)";

// leyendas del hero (las mismas que FALLBACK_CARDS en views/home/HomeView.tsx)
const NBI_T = {
  es: [
    ["Aspa Scout", "Gestión comercial"],
    ["DH Engineering", "Sitio para constructora"],
    ["Aspa Rodeo", "Sistema de gestión de hacienda"],
    ["Architecture 360", "Web para desarrollista"],
  ],
  en: [
    ["Aspa Scout", "Sales management"],
    ["DH Engineering", "Construction company website"],
    ["Aspa Rodeo", "Livestock management system"],
    ["Architecture 360", "Real estate developer website"],
  ],
};

/* ---------- hero: la notebook que se abre ---------- */
function initHero(off: (() => void)[]) {
  const s = $("#nbHero");
  const m = $(".nb-3d", s || document);
  if (!s || !m) return;
  const html = document.documentElement;
  const RM = reducedMotion();
  const fallback = () => {
    s.classList.add("fb");
  };
  if (html.classList.contains("no3d")) return;

  let progress = 0;
  const t = $("#nbTxt"),
    b = $("#nbSub"),
    tag = $("#nbTag"),
    mk = $("#nbMarks");
  let cur = -1,
    shown = false;
  // leyenda: cada renglón sale hacia arriba y el nuevo entra desde abajo, dentro de su máscara
  const NBI = NBI_T[pageLang()];
  const lines = tag ? $$(".ln > span", tag) : [];
  const bars = mk ? $$("s", mk) : [];
  const fill = (i: number) => {
    lines[0].querySelector("b")!.textContent = String(i + 1).padStart(2, "0");
    lines[1].textContent = NBI[i][0];
    lines[2].textContent = NBI[i][1];
  };
  const reveal = (delay = 0) =>
    lines.forEach((l, j) =>
      l.animate([{ transform: "translate3d(0,110%,0)" }, { transform: "none" }], {
        duration: 1000,
        delay: delay + j * 80,
        easing: SOFT,
        fill: "backwards",
      }),
    );
  const swap = (i: number) => {
    lines.forEach((l) => l.getAnimations().forEach((a) => a.cancel()));
    if (RM || !shown) return fill(i);
    const outs = lines.map((l, j) =>
      l.animate(
        [
          { transform: "none", opacity: 1 },
          { transform: "translate3d(0,-110%,0)", opacity: 0 },
        ],
        { duration: 420, delay: j * 50, easing: "cubic-bezier(.5,0,.75,0)", fill: "forwards" },
      ),
    );
    Promise.all(outs.map((a) => a.finished))
      .then(() => {
        fill(i);
        outs.forEach((a) => a.cancel());
        reveal();
      })
      .catch(() => {}); // cancelada por un cambio más nuevo
  };
  // Progreso con inercia: el scroll fija el objetivo y el hero lo sigue con amortiguación
  // exponencial (independiente de los fps). Así el 3D y los textos se mueven suave aunque
  // el scroll venga a tirones (táctil nativo, rueda sin Lenis) y siempre van sincronizados.
  const DAMP = RM ? 1000 : 5.5;
  // Límite de velocidad en el tramo de los trabajos (0,3–0,8): la escena no avanza más rápido
  // que 1 trabajo cada ~1,6 s (con el arranque y el frenado, cada paso dura unos 2 s; cada
  // trabajo ocupa 0,1125 del progreso). Al acercarse al final (o al principio) del hero el
  // límite se levanta de a poco, para que la cámara siempre llegue a entrar a la pantalla
  // antes de que la sección se vaya. La velocidad además se suaviza (arranca y frena sin golpes).
  const VMAX = RM ? Infinity : 0.1125 / 1.55;
  const ACC = 16;
  const ss = (x: number) => {
    const c = clamp(x, 0, 1);
    return c * c * (3 - 2 * c);
  };
  let sp = -1,
    sv = 0,
    last = 0;
  off.push(
    onTick((now) => {
      if (s.classList.contains("fb")) return;
      const r = s.getBoundingClientRect();
      const tp = clamp(-r.top / Math.max(1, r.height - innerHeight), 0, 1);
      // después de una pausa (sin ticks), el primer paso cuenta como un cuadro normal
      const gap = last ? (now - last) / 1000 : 0;
      const dt = gap > 0 && gap < 0.1 ? gap : 0.016;
      last = now;
      const offscreen = r.bottom < 0 || r.top > innerHeight;
      if (sp < 0 || offscreen || RM) {
        sp = tp;
        sv = 0;
      } else {
        const lift = Math.max(ss((tp - 0.8) / 0.12), ss((0.3 - tp) / 0.12));
        const vmax = sp > 0.3 && sp < 0.8 ? VMAX + (4 - VMAX) * lift : Infinity;
        const vt = clamp((tp - sp) * DAMP, -vmax, vmax);
        sv += (vt - sv) * (1 - Math.exp(-dt * ACC));
        const next = sp + sv * dt;
        // sin pasarse del objetivo
        if ((tp - sp) * (tp - next) <= 0) {
          sp = tp;
          sv = 0;
        } else sp = next;
      }
      if (Math.abs(tp - sp) < 0.0002 && Math.abs(sv) < 0.002) {
        sp = tp;
        sv = 0;
      }
      progress = sp;
      if (offscreen) return;
      const p = sp;
      const k = clamp(p / 0.22, 0, 1);
      if (t) {
        t.style.transform = `translate3d(0,${-k * 14}vh,0)`;
        t.style.opacity = (1 - k).toFixed(3);
      }
      if (b) {
        b.style.opacity = (1 - clamp(p / 0.12, 0, 1)).toFixed(3);
        b.style.pointerEvents = p > 0.1 ? "none" : "";
        b.toggleAttribute("inert", p > 0.1);
      }
      const q = clamp((p - 0.35) / 0.45, 0, 0.9999) * 4;
      const idx = Math.floor(q);
      const vis = p > 0.355 && p < 0.775;
      if (tag && lines.length === 3) {
        if (idx !== cur) {
          cur = idx;
          swap(idx);
        }
        if (vis !== shown) {
          shown = vis;
          tag.classList.toggle("on", vis);
          if (vis && !RM) reveal(120);
        }
      }
      // línea de progreso: el tramo actual se llena con el scroll
      bars.forEach((x, j) => (x.style.transform = `scaleX(${j < idx ? 1 : j === idx ? (q - idx).toFixed(3) : 0})`));
      return sp !== tp;
    }),
  );

  // Tramo de los trabajos por pasos: un gesto = un trabajo (paradas en el centro de cada uno,
  // donde el celular está quieto). Con movimiento reducido el scroll queda libre.
  if (!RM)
    off.push(
      initSteps(
        s,
        [0.56, 1.5, 2.5, 3.42].map((q) => 0.35 + q * 0.1125),
        () => progress,
      ),
    );

  // La escena 3D se descarga en diferido: en escritorio cuando la página queda ociosa,
  // en táctiles recién con la primera interacción. Mientras tanto se ve la imagen fija.
  let unmount: (() => void) | null = null;
  let started = false;
  const coarse = matchMedia("(pointer: coarse)").matches;
  const start = () => {
    if (started) return;
    started = true;
    events.forEach((e) => removeEventListener(e, start));
    const timer = setTimeout(() => !m.classList.contains("live") && fallback(), 9000);
    import("./notebook3d")
      .then(({ mountNotebook }) => {
        unmount = mountNotebook(m, s, coarse || innerWidth < 981, () => progress);
      })
      .catch((err) => {
        console.warn("3D desactivado:", err);
        html.classList.replace("has3d", "no3d");
        fallback();
      })
      .finally(() => clearTimeout(timer));
  };
  const events = ["scroll", "pointerdown", "keydown", "touchstart", "wheel"];
  events.forEach((e) => addEventListener(e, start, { passive: true, once: true }));
  let idle = 0;
  if (!coarse) {
    const ric = window.requestIdleCallback || ((f: () => void) => setTimeout(f, 1));
    const later = () => (idle = window.setTimeout(() => ric(start, { timeout: 2000 }), 2500));
    if (document.readyState === "complete") later();
    else addEventListener("load", later, { once: true });
  }
  off.push(() => {
    clearTimeout(idle);
    events.forEach((e) => removeEventListener(e, start));
    unmount?.();
  });
}

/* ---------- «Cuatro formas…»: acordeón con escenario sticky y autoplay ---------- */
function initTabs(off: (() => void)[]) {
  $$("[data-tabs]").forEach((T) => {
    const RM = reducedMotion();
    const tabs = $$(".tab", T),
      btns = tabs.map((x) => $<HTMLButtonElement>(".tl button", x)!),
      st = $$(".tst", T),
      marks = $$(".stories i", T);
    const fills = marks.map((m) => $("s", m)!);
    let cur = 0,
      anim: Animation | null = null,
      markAnim: Animation | null = null,
      inView = false,
      paused = false;
    const run = () => {
      anim?.cancel();
      markAnim?.cancel();
      if (RM) return;
      const bar = $(".tbar i", tabs[cur])!;
      anim = bar.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 6500, easing: "linear", fill: "forwards" });
      // el relleno de la línea de arriba avanza a la par de la barra de la pestaña
      markAnim =
        fills[cur]?.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 6500, easing: "linear", fill: "forwards" }) ?? null;
      anim.onfinish = () => set((cur + 1) % tabs.length);
      if (!inView || paused) {
        anim.pause();
        markAnim?.pause();
      }
    };
    const set = (i: number) => {
      if (i === cur && anim) return;
      const prev = st[cur];
      cur = i;
      tabs.forEach((x, k) => x.classList.toggle("on", k === i));
      btns.forEach((x, k) => x.setAttribute("aria-expanded", String(k === i)));
      marks.forEach((x, k) => x.classList.toggle("done", RM ? k <= i : k < i));
      st.forEach((x) => x.classList.remove("top"));
      const nx = st[i];
      nx.classList.add("on", "top");
      if (!RM && prev !== nx) {
        prev.classList.remove("on");
        prev.animate(
          [
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0, transform: "scale(.97)" },
          ],
          { duration: 500, easing: EXPO },
        );
        nx.animate(
          [
            { opacity: 0, transform: "translateY(14px) scale(.985)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 900, delay: 120, easing: EXPO, fill: "backwards" },
        );
      }
      st.forEach((x) => x !== nx && x.classList.remove("on"));
      run();
    };
    tabs.forEach((x, k) =>
      x.addEventListener("click", (e) => {
        if ((e.target as Element).closest("a")) return;
        set(k);
      }),
    );
    const pz = (v: boolean) => {
      paused = v;
      if (!anim) return;
      if (v || !inView) {
        anim.pause();
        markAnim?.pause();
      } else {
        anim.play();
        markAnim?.play();
      }
    };
    T.addEventListener("mouseenter", () => pz(true));
    T.addEventListener("mouseleave", () => pz(false));
    T.addEventListener("focusin", () => pz(true));
    T.addEventListener("focusout", () => pz(false));
    const io = new IntersectionObserver(
      (es) => {
        inView = es[0].isIntersecting;
        if (!anim) return;
        if (inView && !paused) {
          anim.play();
          markAnim?.play();
        } else {
          anim.pause();
          markAnim?.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(T);
    if (RM) marks[0]?.classList.add("done");
    run();
    off.push(() => {
      io.disconnect();
      anim?.cancel();
      markAnim?.cancel();
    });
  });
}

export function initHome() {
  const off: (() => void)[] = [];
  initHero(off);
  initTabs(off);
  off.push(initGallery());
  return () => off.forEach((f) => f());
}
