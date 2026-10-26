// Sistemas · "Cómo trabajamos": narrativa SVG en 6 etapas guiada por el scroll.
// La sección es alta y su escenario queda fijo; al bajar se dibuja el boceto, el wireframe,
// el diseño, el código, los dispositivos y la versión 1.0, mientras avanzan la barra,
// los pasos y la leyenda.
import { $, $$, EXPO, clamp, onTick, reducedMotion } from "./core";

const CAPS = [
  "Entendemos el negocio, los objetivos y a quienes lo van a usar.",
  "Definimos qué funcionalidades valen más y en qué orden.",
  "Diseñamos un prototipo interactivo que podés tocar antes de programar.",
  "Programamos por etapas cortas: probás el sistema desde las primeras semanas.",
  "Probamos todo, con datos reales y en todos los dispositivos.",
  "Lo ponemos en marcha y seguimos al lado.",
];

/** Arma el SVG de la narrativa (mismo dibujo que el diseño). */
function buildSvg() {
  // línea "a mano alzada": 8 tramos con un temblor determinístico
  const wob = (x1: number, y1: number, x2: number, y2: number) => {
    let s = `M${x1} ${y1}`;
    for (let k = 1; k <= 8; k++) {
      const t = k / 8;
      s += ` L${(x1 + (x2 - x1) * t + Math.sin(k * 2.3 + x1) * 2.2).toFixed(1)} ${(y1 + (y2 - y1) * t + Math.cos(k * 1.9 + y1) * 2.2).toFixed(1)}`;
    }
    return s;
  };
  type B = [number, number, number, number];
  const rw = ([x, y, w, h]: B) =>
    [wob(x, y, x + w, y), wob(x + w, y, x + w, y + h), wob(x + w, y + h, x, y + h), wob(x, y + h, x, y)].join(" ");
  const r = ([x, y, w, h]: B) => `M${x} ${y}h${w}v${h}h${-w}Z`;
  // bloques de la pantalla: barra superior, menú lateral, 4 tarjetas, gráfico y panel
  const blocks: B[] = [
    [150, 90, 500, 34],
    [150, 132, 90, 250],
    [252, 132, 94, 60],
    [354, 132, 94, 60],
    [456, 132, 94, 60],
    [558, 132, 92, 60],
    [252, 202, 250, 180],
    [512, 202, 138, 180],
  ];
  const sketch =
    blocks.map(rw).join(" ") + " " + wob(270, 330, 330, 280) + " " + wob(330, 280, 380, 310) + " " + wob(380, 310, 470, 240);
  const wire = blocks.map(r).join(" ");
  const fills = blocks
    .map((b, k) => `<rect class="sf sf${k}" x="${b[0] + 3}" y="${b[1] + 3}" width="${b[2] - 6}" height="${b[3] - 6}" rx="5"/>`)
    .join("");
  const bars = [50, 80, 64, 110, 92, 140, 120]
    .map((h, k) => `<rect class="sbar" style="--k:${k}" x="${272 + k * 30}" y="${370 - h}" width="18" height="${h}" rx="3"/>`)
    .join("");
  const code = [...Array(9)]
    .map(
      (_, k) =>
        `<rect class="scode" style="--k:${k}" x="${708 + (k % 3 === 1 ? 18 : 0)}" y="${120 + k * 26}" width="${70 + ((k * 37) % 60)}" height="9" rx="4"/>`,
    )
    .join("");
  return `<svg viewBox="0 0 960 520" class="sdraw" aria-hidden="true">
   <g class="s-board"><rect x="130" y="70" width="540" height="330" rx="18" class="sbg"/>
    <path class="sk s1" pathLength="1" d="${sketch}"/>
    <path class="wf s2" pathLength="1" d="${wire}"/>
    <g class="s3g">${fills}${bars}</g></g>
   <g class="s4g"><rect x="690" y="96" width="210" height="270" rx="16" class="scbg"/>${code}</g>
   <g class="s5g"><path class="dv s5" pathLength="1" d="M110 410 h580 l40 34 h-660 z M120 60 h560 a12 12 0 0 1 12 12 v338 h-584 v-338 a12 12 0 0 1 12 -12 z"/><path class="dv s5" pathLength="1" d="M760 210 h120 a16 16 0 0 1 16 16 v220 a16 16 0 0 1 -16 16 h-120 a16 16 0 0 1 -16 -16 v-220 a16 16 0 0 1 16 -16 z"/>
     <g class="s5p"><rect x="756" y="236" width="128" height="22" rx="6" class="sf sf0"/><rect x="756" y="268" width="60" height="50" rx="8" class="sf sf2"/><rect x="824" y="268" width="60" height="50" rx="8" class="sf sf3"/><rect x="756" y="328" width="128" height="110" rx="8" class="sf sf6"/></g></g>
   <g class="s6g"><text x="480" y="488" class="sver" text-anchor="middle">Versión <tspan class="sver-n">0.1</tspan></text><circle class="sck s6" pathLength="1" cx="652" cy="70" r="30"/><path class="sck s6" pathLength="1" d="M638 70 l10 10 l20 -22"/></g>
  </svg>`;
}

/** Narrativa guiada por el scroll (sec = section.story). Devuelve la limpieza. */
export function initStory(sec: HTMLElement): () => void {
  const host = $("#storyDraw", sec) || $(".story-draw", sec);
  if (!host) return () => {};
  const RM = reducedMotion();
  host.innerHTML = buildSvg();
  const draw = $(".sdraw", host);
  const ver = $(".sver-n", host);
  const bar = $(".sb-line i", sec);
  const steps = $$("li", sec).filter((li) => li.parentElement?.classList.contains("sb-steps"));
  const cap = $("#storyCap", sec) || $(".story-cap", sec);

  let lastP = -1,
    cur = -1;
  const render = (p: number) => {
    // 6,25 tramos: el último cuarto de tramo deja la versión 1.0 quieta antes de soltar la sección
    const seg = p * 6.25;
    for (let k = 1; k <= 6; k++) sec.style.setProperty("--s" + k, clamp(seg - (k - 1), 0, 1).toFixed(3));
    if (draw) draw.style.transform = `translate3d(${(1 - 2 * p) * 3}%,0,0)`;
    if (bar) bar.style.transform = `scaleX(${p})`;
    const c = Math.min(5, Math.floor(seg));
    if (c !== cur) {
      const first = cur < 0;
      cur = c;
      steps.forEach((li, k) => {
        li.classList.toggle("done", k < c);
        li.classList.toggle("act", k === c);
        if (k === c) li.setAttribute("aria-current", "step");
        else li.removeAttribute("aria-current");
      });
      if (cap && cap.textContent !== CAPS[c]) {
        cap.textContent = CAPS[c];
        if (!RM && !first)
          cap.animate(
            [
              { opacity: 0, transform: "translateY(10px)" },
              { opacity: 1, transform: "none" },
            ],
            { duration: 700, easing: EXPO },
          );
      }
    }
    if (ver) ver.textContent = (0.1 + clamp(seg - 5, 0, 1) * 0.9).toFixed(1);
  };

  // con movimiento reducido la sección no es sticky (ver CSS): todo dibujado de entrada
  if (RM) {
    render(1);
    return () => {
      host.innerHTML = "";
    };
  }

  const off = onTick(() => {
    const r = sec.getBoundingClientRect();
    if (r.bottom < -innerHeight || r.top > innerHeight * 2) return; // lejos: no hace falta tocar nada
    const p = clamp(-r.top / Math.max(1, r.height - innerHeight), 0, 1);
    if (Math.abs(p - lastP) < 0.0005) return;
    lastP = p;
    render(p);
  });

  return () => {
    off();
    host.innerHTML = "";
    for (let k = 1; k <= 6; k++) sec.style.removeProperty("--s" + k);
  };
}
