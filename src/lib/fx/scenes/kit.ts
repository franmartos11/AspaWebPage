// Kit de las escenas 3D de los rubros (portado de script8 del diseño): escenario con luces,
// paleta y materiales, cajas con aristas, líneas, árboles y el leve seguimiento del mouse.
// Cada escena monta su propio renderer en su contenedor y lo libera al desmontarse.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export { THREE };

export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
export const easeBack = (x: number) => {
  const c = 1.4;
  return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
};
/** Avance 0..1 de un tramo que empieza en `a` y dura `d`. */
export const seg = (t: number, a: number, d: number) => clamp((t - a) / d, 0, 1);

export const P = {
  white: 0xf3f3f1,
  warm: 0xe9e7e2,
  conc: 0xcfcfd2,
  dark: 0x23232a,
  frame: 0x15151a,
  blue: 0x2d2bff,
  blueL: 0x6e6cff,
  glass: 0x1a2633,
  ground: 0x16161b,
};

export const mat = {
  white: () => new THREE.MeshPhysicalMaterial({ color: P.white, roughness: 0.72, clearcoat: 0.15, clearcoatRoughness: 0.6 }),
  conc: () => new THREE.MeshStandardMaterial({ color: P.conc, roughness: 0.85 }),
  dark: () => new THREE.MeshPhysicalMaterial({ color: P.dark, roughness: 0.75, metalness: 0, clearcoat: 0.1, envMapIntensity: 0.6 }),
  frame: () => new THREE.MeshStandardMaterial({ color: P.frame, roughness: 0.4, metalness: 0.6 }),
  glass: () =>
    new THREE.MeshPhysicalMaterial({
      color: P.glass,
      roughness: 0.04,
      metalness: 0.25,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.85,
      envMapIntensity: 1.6,
    }),
  lit: () => new THREE.MeshStandardMaterial({ color: 0x1a2633, emissive: 0xfff1d6, emissiveIntensity: 0, roughness: 0.3 }),
  blue: () => new THREE.MeshPhysicalMaterial({ color: P.blue, roughness: 0.35, metalness: 0.2, clearcoat: 0.5 }),
  ground: () => new THREE.MeshStandardMaterial({ color: P.ground, roughness: 0.95 }),
  wood: () => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 64;
    const x = c.getContext("2d")!;
    for (let i = 0; i < 32; i++) {
      const v = (150 + Math.random() * 40) | 0;
      x.fillStyle = `rgb(${v},${(v * 0.72) | 0},${(v * 0.5) | 0})`;
      x.fillRect(i * 8, 0, 7, 64);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 1);
    return new THREE.MeshStandardMaterial({ map: t, roughness: 0.7 });
  },
};

/* ---------- materialización: al terminar de armarse, la maqueta blanca pasa a materiales reales ---------- */
function canvasTex(w: number, h: number, draw: (x: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}
export const tex = {
  /** Hormigón visto: tablas de encofrado horizontales, cada una con su tono, y poros. */
  concrete: () =>
    canvasTex(512, 512, (x) => {
      for (let b = 0; b < 8; b++) {
        const v = 168 + Math.random() * 22;
        x.fillStyle = `rgb(${v | 0},${(v * 0.985) | 0},${(v * 0.955) | 0})`;
        x.fillRect(0, b * 64, 512, 64);
        x.fillStyle = "rgba(0,0,0,.14)";
        x.fillRect(0, b * 64, 512, 2);
      }
      for (let i = 0; i < 9000; i++) {
        const a = Math.random() * 0.12;
        x.fillStyle = Math.random() < 0.5 ? `rgba(0,0,0,${a})` : `rgba(255,255,255,${a})`;
        x.fillRect(Math.random() * 512, Math.random() * 512, 1.5, 1.5);
      }
    }),
  /** Madera en listones verticales con veta. */
  wood: () =>
    canvasTex(512, 256, (x) => {
      for (let i = 0; i < 16; i++) {
        const v = 128 + Math.random() * 46;
        x.fillStyle = `rgb(${v | 0},${(v * 0.68) | 0},${(v * 0.44) | 0})`;
        x.fillRect(i * 32, 0, 30, 256);
        x.fillStyle = "rgba(0,0,0,.35)";
        x.fillRect(i * 32 + 30, 0, 2, 256);
        for (let k = 0; k < 6; k++) {
          x.fillStyle = `rgba(60,30,10,${0.08 + Math.random() * 0.1})`;
          x.fillRect(i * 32 + Math.random() * 28, 0, 1, 256);
        }
      }
    }),
};

/**
 * Recubre cada pieza con un material texturado que aparece con `p` (0 → 1): una cáscara apenas más
 * grande que comparte la geometría, así la maqueta blanca queda debajo y no hay que cambiar materiales.
 * `rep`: cuántas veces se repite la textura en cada cara.
 */
export function skin(meshes: THREE.Object3D[], map: THREE.Texture, rep: [number, number], roughness = 0.85) {
  const t = map.clone();
  t.repeat.set(rep[0], rep[1]);
  t.needsUpdate = true;
  // polygonOffset: la cáscara siempre gana en profundidad (en piezas finas, como lamas, parpadeaba)
  const m = new THREE.MeshStandardMaterial({
    map: t,
    roughness,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  m.visible = false;
  meshes.forEach((o) => {
    if (!(o instanceof THREE.Mesh)) return;
    const s = new THREE.Mesh(o.geometry, m);
    s.scale.setScalar(1.004);
    o.add(s);
  });
  return (p: number) => {
    m.opacity = p;
    m.visible = p > 0;
    m.depthWrite = p > 0.99;
  };
}

export const box = (w: number, h: number, d: number, m: THREE.Material, x = 0, y = 0, z = 0, base = false) => {
  const geo = new THREE.BoxGeometry(w, h, d);
  if (base) geo.translate(0, h / 2, 0);
  const o = new THREE.Mesh(geo, m);
  o.position.set(x, y, z);
  return o;
};

export function edges(o: THREE.Mesh, color = 0xffffff, op = 0.18) {
  const e = new THREE.LineSegments(new THREE.EdgesGeometry(o.geometry, 30), new THREE.LineBasicMaterial({ color, transparent: true, opacity: op }));
  o.add(e);
  return e;
}

/** Segmentos [x1, z1, x2, z2] sobre el piso (planos, trazos de obra). */
export function lineSet(segs: number[][], y = 0.02, color = P.blueL) {
  const pos = new Float32Array(segs.length * 6);
  segs.forEach((q, i) => pos.set([q[0], y, q[1], q[2], y, q[3]], i * 6));
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const l = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 1 }));
  l.userData.n = segs.length * 2;
  return l;
}

export function tree(x: number, z: number, s: number, m: THREE.Material) {
  const t = new THREE.Group();
  t.add(box(0.06 * s, 0.7 * s, 0.06 * s, mat.frame(), 0, 0, 0, true));
  [
    [0, 1, 0, 0.45],
    [0.22, 0.85, 0.1, 0.32],
    [-0.2, 0.9, -0.08, 0.3],
  ].forEach(([a, b, c, r]) => {
    const sp = new THREE.Mesh(new THREE.IcosahedronGeometry(r * s, 2), m);
    sp.position.set(a * s, b * s, c * s);
    t.add(sp);
  });
  t.position.set(x, 0, z);
  return t;
}

let shadowTexCache: THREE.Texture | null = null;
/** Sombra de contacto suave (textura radial) para apoyar los objetos en el piso. */
export function contactShadow(w: number, d: number, op: number) {
  if (!shadowTexCache) {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    r.addColorStop(0, "rgba(0,0,0,.75)");
    r.addColorStop(0.45, "rgba(0,0,0,.35)");
    r.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = r;
    g.fillRect(0, 0, 256, 256);
    shadowTexCache = new THREE.CanvasTexture(c);
    shadowTexCache.colorSpace = THREE.SRGBColorSpace;
  }
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: shadowTexCache, transparent: true, opacity: op, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  m.renderOrder = -1;
  return m;
}

/** Arranca recién cuando la escena se ve casi entera. */
export const seen = (el: HTMLElement) => {
  const r = el.getBoundingClientRect(),
    vis = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
  return vis > Math.min(r.height, innerHeight) * 0.55;
};
/**
 * La obra se arma con el scroll: devuelve una función que, en cada cuadro, da el tiempo de la línea de
 * la escena (0 → `end`) según cuánto se scrolleó. Si la escena está dentro de un tramo fijo
 * (`[data-scrub]`, la sección queda quieta mientras se scrollea) se usa ese tramo; si no, el paso de la
 * escena por la pantalla. Se acerca al objetivo con suavidad, así un scroll brusco no la hace saltar.
 */
export function scrub(el: HTMLElement, end: number) {
  const track = el.closest<HTMLElement>("[data-scrub]");
  const host = el as HTMLElement & { __poke?: () => void };
  let e = -0.2;
  const step = Object.assign(
    (dt: number) => {
      const vh = innerHeight,
        r = (track ?? el).getBoundingClientRect();
      // con tramo: arranca un poco antes de fijarse y termina al final del tramo
      const p = track ? clamp((vh * 0.3 - r.top) / Math.max(1, r.height - vh * 0.7), 0, 1) : clamp((vh * 0.9 - r.top) / (vh * 0.6), 0, 1);
      const d = p * end - e;
      e += d * Math.min(1, dt * 6);
      // mientras la obra se mueve, la escena dibuja a ritmo completo (ver `run`)
      if (Math.abs(d) > 0.002) host.__poke?.();
      step.p = clamp(e / end, 0, 1);
      return e;
    },
    { p: 0 },
  );
  return step;
}

/** Curva suave (0..1) para el recorrido de la cámara. */
const smooth = (x: number) => x * x * (3 - 2 * x);

export type Stage = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** grupo raíz de la escena (rota con el mouse vía `interact`) */
  g: THREE.Group;
  renderer: THREE.WebGLRenderer;
  el: HTMLElement;
  /** posición del mouse normalizada (-1..1) */
  mouse: { x: number; y: number };
  mobile: boolean;
};

/**
 * Escenario como el del diseño (luz de cielo, clave blanca, contraluz azul) con su propio renderer.
 * `run(update)` arranca el bucle: pausa fuera de pantalla o con la pestaña oculta; `.live` en el
 * contenedor al primer cuadro. Devuelve la función que desarma todo.
 */
export function stage(el: HTMLElement, fov: number, cam: [number, number, number], look: [number, number, number]) {
  const mobile = matchMedia("(pointer: coarse)").matches || innerWidth < 981;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = "m3d-canvas";
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, 0.04).texture;
  room.traverse((o) => {
    const m = o as THREE.Mesh;
    m.geometry?.dispose();
  });
  const scene = new THREE.Scene();
  scene.environment = env;
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.05, 100);
  const g = new THREE.Group();
  scene.add(g);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x202028, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 1.25);
  key.position.set(6, 10, 7);
  scene.add(key);
  const rim = new THREE.DirectionalLight(P.blueL, 0.9);
  rim.position.set(-7, 4, -6);
  scene.add(rim);

  const mouse = { x: 0, y: 0 };
  // último movimiento (mouse o la obra con el scroll): sin movimiento, la escena dibuja a 30 cuadros por segundo
  let motion = performance.now();
  (el as HTMLElement & { __poke?: () => void }).__poke = () => (motion = performance.now());
  const onMove = (e: PointerEvent) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = (e.clientY / innerHeight) * 2 - 1;
    motion = performance.now();
  };
  addEventListener("pointermove", onMove, { passive: true });

  // encuadre: más lejos en contenedores angostos (como en el diseño)
  let onResize: ((w: number, h: number) => void) | null = null;
  const resize = () => {
    const w = el.clientWidth,
      h = el.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const a = w / h;
    const k = a < 1.1 ? 1.22 : a < 1.5 ? 1.1 : 1;
    camera.position.set(...cam).multiplyScalar(k);
    camera.lookAt(...look);
    onResize?.(w, h);
  };
  el.appendChild(canvas);
  const ro = new ResizeObserver(resize);
  ro.observe(el);
  resize();

  let visible = true;
  const io = new IntersectionObserver((es) => (visible = es[0].isIntersecting));
  io.observe(el);

  const S: Stage = { scene, camera, g, renderer, el, mouse, mobile };
  let raf = 0;
  // para los tests de presupuesto: lo que cuesta dibujar el último cuadro
  (el as HTMLElement & { __stats?: () => Record<string, number> }).__stats = () => ({
    ...renderer.info.render,
    geometries: renderer.info.memory.geometries,
    textures: renderer.info.memory.textures,
    pixelRatio: renderer.getPixelRatio(),
  });
  const run = (update: (dt: number, t: number) => void, opts: { onResize?: (w: number, h: number) => void } = {}) => {
    onResize = opts.onResize ?? null;
    resize();
    let last = performance.now(),
      skip = false;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) {
        last = t;
        return;
      }
      // en reposo (nada se arma ni se mueve el mouse) un cuadro sí y uno no: la mitad de trabajo para la GPU
      if (t - motion > 700 && (skip = !skip)) return;
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      update(dt, t / 1000);
      renderer.render(scene, camera);
      if (!el.classList.contains("live")) el.classList.add("live");
    };
    raf = requestAnimationFrame(loop);
  };
  const dispose = () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    removeEventListener("pointermove", onMove);
    canvas.remove();
    el.classList.remove("live");
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
      mats.forEach((mt) => {
        (mt as THREE.MeshStandardMaterial).map?.dispose();
        mt.dispose();
      });
    });
    env.dispose();
    pmrem.dispose();
    renderer.dispose();
  };
  return { S, run, dispose };
}

/** Giro suave del grupo con el mouse y una oscilación lenta (como en el diseño). */
export function interact(S: Stage, base = -0.15) {
  let rx = 0,
    ry = 0,
    zoom = 0;
  /** `p`: avance de la obra (0..1). La cámara arranca cerca y casi cenital (el plano) y, a medida que
   *  se arma, gira y se aleja hasta la vista de la obra terminada. */
  return (t: number, p = 1) => {
    rx = lerp(rx, S.mouse.y * 0.05, 0.05);
    ry = lerp(ry, S.mouse.x * 0.16, 0.05);
    const k = smooth(p);
    S.g.rotation.set(rx + (1 - k) * 0.1, base + ry + (1 - k) * -0.42 + Math.sin(t * 0.12) * 0.03, 0);
    const z = 1 + (1 - k) * 0.1;
    if (Math.abs(z - zoom) > 1e-4) {
      zoom = z;
      S.camera.zoom = z;
      S.camera.updateProjectionMatrix();
    }
  };
}

/** Contrato de cada escena: se monta en su contenedor y devuelve cómo desmontarla. */
export type SceneModule = { mount: (el: HTMLElement) => () => void };

/** Familia tipográfica de una variable CSS (p. ej. "--sans") para dibujar texto en un canvas. */
export const cssFont = (v = "--sans") => getComputedStyle(document.documentElement).getPropertyValue(v).trim() || "Arial, sans-serif";
