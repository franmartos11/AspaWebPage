// Recorrido del celular alrededor de la notebook. Es matemática pura (sin Three.js) para
// poder testearlo: tests/orbit.spec.ts comprueba que nunca toca la notebook.
//
// Vista desde arriba: el celular rodea la notebook por detrás, nunca por delante (así nunca
// queda cruzado sobre la pantalla, ni si el scroll se detiene a mitad de camino).
// Entra desde atrás de la tapa → para a la derecha (trabajo 1) → rodea por detrás hasta la
// izquierda (2) → vuelve por detrás a la derecha (3) → izquierda (4) → sale por detrás.
// Cambia de sentido solo en las paradas, donde ya está quieto. Su pantalla cambia en la mitad
// de cada vuelta, cuando la tapa lo tapa.

// Medidas reales de Apple en mm, a escala de la escena: la MacBook Pro 14" (312,6 mm de
// ancho) mide 3,3 unidades. La escena 3D y los tests usan estas mismas constantes.
export const MM = 3.3 / 312.6;
export const LAPTOP = {
  bw: 312.6 * MM, // MacBook Pro 14": 312,6 × 221,2 mm, 15,5 mm cerrada
  bd: 221.2 * MM,
  bt: 9.9 * MM, // base
  lt: 5.6 * MM, // tapa
  gap: 0.4 * MM, // luz entre base y tapa cerrada
  lidOpen: (-20 * Math.PI) / 180, // 110° de apertura
};
export const PHONE = { w: 70.6 * MM, h: 146.6 * MM, t: 8.25 * MM }; // iPhone 15 Pro
// a/b: radios en x/z, c: centro en z (corrido hacia atrás para dar aire al frente),
// y: altura del centro (flota apenas sobre la mesa)
export const ORBIT = { a: 2.55, b: 2.3, c: -0.9, y: 0.95, scale: 1 };

const D = Math.PI / 180;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smooth = (x: number) => x * x * (3 - 2 * x);
// suave en los extremos y con algo de impulso en el medio (quíntica: aceleración continua)
const glide = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);

type Seg = { q0: number; q1: number; t0: number; t1: number; y0: number; y1: number; bump: number };
// q: tramo de trabajo en curso (0..4, el mismo que usan las capturas de la notebook)
// t: ángulo en la elipse (0 = adelante, 90 = derecha, 180 = atrás, 270 = izquierda)
// y0/y1: giro inicial/final; bump: giro extra en el medio del tramo (de canto = ±90°,
// mirando hacia donde va)
const STOP = 0.3; // giro en las paradas: mira a la cámara
const SEGS: Seg[] = [
  { q0: 0, q1: 0.42, t0: 200, t1: 70, y0: 1.9, y1: -STOP, bump: 0 },
  { q0: 0.7, q1: 1.3, t0: 70, t1: 290, y0: -STOP, y1: STOP, bump: -Math.PI / 2 },
  { q0: 1.7, q1: 2.3, t0: 290, t1: 70, y0: STOP, y1: -STOP, bump: Math.PI / 2 },
  { q0: 2.7, q1: 3.3, t0: 70, t1: 290, y0: -STOP, y1: STOP, bump: -Math.PI / 2 },
  { q0: 3.5, q1: 3.92, t0: 290, t1: 200, y0: STOP, y1: 1.9, bump: 0 },
];

// Largo de arco de la elipse → ángulo, para que la velocidad sobre la curva sea pareja.
const LUT_FROM = 60,
  LUT_TO = 300,
  LUT_N = 961;
const lut = (() => {
  const s = new Float64Array(LUT_N);
  const step = ((LUT_TO - LUT_FROM) / (LUT_N - 1)) * D;
  for (let i = 1; i < LUT_N; i++) {
    const t = (LUT_FROM * D) + (i - 0.5) * step;
    s[i] = s[i - 1] + Math.hypot(ORBIT.a * Math.cos(t), ORBIT.b * Math.sin(t)) * step;
  }
  return s;
})();
const arcOf = (deg: number) => {
  const f = clamp(((deg - LUT_FROM) / (LUT_TO - LUT_FROM)) * (LUT_N - 1), 0, LUT_N - 1);
  const i = Math.min(LUT_N - 2, Math.floor(f));
  return lut[i] + (lut[i + 1] - lut[i]) * (f - i);
};
const degOf = (s: number) => {
  let lo = 0,
    hi = LUT_N - 1;
  while (hi - lo > 1) {
    const m = (lo + hi) >> 1;
    if (lut[m] < s) lo = m;
    else hi = m;
  }
  const f = lo + (s - lut[lo]) / Math.max(1e-9, lut[hi] - lut[lo]);
  return LUT_FROM + (f / (LUT_N - 1)) * (LUT_TO - LUT_FROM);
};

export type PhonePose = {
  x: number;
  y: number;
  z: number;
  yaw: number;
  pitch: number;
  roll: number;
  theta: number; // grados
  move: number; // 0 quieto … 1 a máxima velocidad (para inclinación, brillo, etc.)
  enter: number; // 0..1 entrada (1 = ya llegó) — y salida, de vuelta a 0
  screen: number; // índice de la captura que muestra
};

export function phonePose(q: number): PhonePose {
  // tramo actual (o la parada en la que está)
  let seg = SEGS[0],
    f = 0;
  if (q <= SEGS[0].q0) f = 0;
  else
    for (let i = 0; i < SEGS.length; i++) {
      const s = SEGS[i];
      if (q < s.q0) {
        seg = SEGS[i - 1];
        f = 1;
        break;
      }
      seg = s;
      f = clamp((q - s.q0) / (s.q1 - s.q0), 0, 1);
      if (q <= s.q1) break;
    }
  const g = glide(f);
  const theta = degOf(arcOf(seg.t0) + (arcOf(seg.t1) - arcOf(seg.t0)) * g);
  const t = theta * D;
  const move = Math.sin(Math.PI * f) * (f > 0 && f < 1 ? 1 : 0);
  const first = seg === SEGS[0],
    last = seg === SEGS[SEGS.length - 1];
  const sideways = !first && !last;
  const enter = first ? smooth(f) : last ? 1 - smooth(f) : 1;
  return {
    x: ORBIT.a * Math.sin(t),
    y: ORBIT.y,
    z: ORBIT.c + ORBIT.b * Math.cos(t),
    yaw: seg.y0 + (seg.y1 - seg.y0) * smooth(f) + seg.bump * Math.sin(Math.PI * f),
    pitch: -0.04,
    // se inclina hacia el centro de la curva, como un objeto con peso
    roll: sideways ? Math.sign(seg.bump) * 0.09 * move : 0,
    theta,
    move,
    enter,
    // cambia justo en el medio de cada vuelta (q = 1, 2, 3), cuando pasa detrás de la tapa
    screen: Math.min(3, Math.max(0, Math.floor(q))),
  };
}
