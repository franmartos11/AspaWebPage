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
/** 1 = en pantalla (se arma) · -1 = quedó abajo porque subiste (se desarma) · 0 = quedó arriba (se mantiene). */
export const want = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  if (r.top < innerHeight * 0.62 && r.bottom > innerHeight * 0.15) return 1;
  if (r.top > innerHeight * 0.82) return -1;
  return 0;
};

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
  const onMove = (e: PointerEvent) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = (e.clientY / innerHeight) * 2 - 1;
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
  const run = (update: (dt: number, t: number) => void, opts: { onResize?: (w: number, h: number) => void } = {}) => {
    onResize = opts.onResize ?? null;
    resize();
    let last = performance.now();
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (!visible || document.hidden) return;
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
    ry = 0;
  return (t: number) => {
    rx = lerp(rx, S.mouse.y * 0.05, 0.05);
    ry = lerp(ry, S.mouse.x * 0.16, 0.05);
    S.g.rotation.set(rx, base + ry + Math.sin(t * 0.12) * 0.03, 0);
  };
}

/** Contrato de cada escena: se monta en su contenedor y devuelve cómo desmontarla. */
export type SceneModule = { mount: (el: HTMLElement) => () => void };

/** Familia tipográfica de una variable CSS (p. ej. "--sans") para dibujar texto en un canvas. */
export const cssFont = (v = "--sans") => getComputedStyle(document.documentElement).getPropertyValue(v).trim() || "Arial, sans-serif";
