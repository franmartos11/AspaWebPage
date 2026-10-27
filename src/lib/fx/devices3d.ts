// WEBS · escena del visor: la MacBook muestra la captura de escritorio de la web del rubro y el
// iPhone la de celular. Portado del visor "notebook + celular" del diseño, con los modelos del
// Home (devices-model.ts). Se carga en diferido desde devices.ts: nunca va en el JS inicial.
import * as THREE from "three";
import { PHONE } from "./phone-orbit";
import {
  MAC_SCREEN,
  PHONE_SCREEN,
  buildIPhone,
  buildMacBook,
  buildStudioEnv,
  contactShadow,
  fitTop,
  macScreenGeo,
  macScreenTexture,
  phoneScreenGeo,
  shadowTexture,
  tuneScreen,
} from "./devices-model";
import { RUBRO_WEBS, webShot, type WebView } from "./devices";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ---------- tweens mínimos (las curvas de GSAP que usaba el diseño) ---------- */
type Ease = (t: number) => number;
const E = {
  p1out: (t: number) => 1 - (1 - t) ** 2, // power1.out (la de GSAP por defecto)
  p2out: (t: number) => 1 - (1 - t) ** 3,
  p2in: (t: number) => t ** 3,
  p3out: (t: number) => 1 - (1 - t) ** 4,
  // elastic.out(1, .6)
  elastic: (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : Math.pow(2, -10 * t) * Math.sin(((t - 0.15) * Math.PI * 2) / 0.6) + 1),
};
type Tw = { o: Record<string, number>; k: string; to: number; d: number; e: Ease; at: number; from?: number };
function tweens() {
  let list: Tw[] = [];
  let now = 0;
  return {
    /** anima o[k] hasta `to` en d segundos, a partir de `delay` (el valor inicial se toma al arrancar;
     *  al arrancar, reemplaza a cualquier otra animación de la misma propiedad) */
    to(o: object, vals: Record<string, number>, d: number, e: Ease = E.p1out, delay = 0) {
      for (const k in vals) list.push({ o: o as Record<string, number>, k, to: vals[k], d, e, at: now + delay });
    },
    kill(...os: object[]) {
      list = list.filter((t) => !os.includes(t.o));
    },
    busy: () => list.length > 0,
    step(t: number) {
      now = t;
      for (const tw of list)
        if (tw.from === undefined && t >= tw.at) {
          tw.from = tw.o[tw.k];
          list = list.filter((x) => x === tw || x.o !== tw.o || x.k !== tw.k || x.from === undefined);
        }
      list = list.filter((tw) => {
        if (tw.from === undefined) return true;
        const p = clamp((t - tw.at) / tw.d, 0, 1);
        tw.o[tw.k] = lerp(tw.from, tw.to, tw.e(p));
        return p < 1;
      });
    },
  };
}

/**
 * Monta la escena en el contenedor .m3d (sec: el bloque que se observa para pausar fuera de
 * la vista). onLive se llama con el primer cuadro dibujado.
 */
export function mountDevices(el: HTMLElement, sec: HTMLElement, first: WebView, isMobileDevice: boolean, onLive?: () => void) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, isMobileDevice ? 1.5 : 1.75));
  // mismo revelado que el Home: AgX y el estudio de softboxes
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = "m3d-canvas";
  const studio = buildStudioEnv(renderer);
  const scene = new THREE.Scene();
  scene.environment = studio.env;
  const camera = new THREE.PerspectiveCamera(28, 1, 0.05, 100);
  const tw = tweens();
  // estado del bucle (se declara antes de cualquier kick())
  let visible = false,
    dead = false,
    raf = 0,
    last = performance.now(),
    rest = 0;

  const rig = new THREE.Group();
  rig.position.x = -0.58; // centra el conjunto notebook + celular
  scene.add(rig);

  /* ---------- MacBook abierta, con la pantalla encendida ---------- */
  const mac = buildMacBook();
  rig.add(mac.group);
  mac.lid.rotation.x = -0.18; // como en el diseño: algo menos abierta que en el Home
  mac.alu.envMapIntensity = 0.85;
  mac.refl.material.opacity = 0.35;
  mac.halo.material.opacity = 0.55;
  mac.kGlow.material.opacity = 0.45;
  // el reflejo del vidrio va por encima de las capturas
  mac.refl.renderOrder = 10;

  /* ---------- iPhone parado a la derecha, un poco adelante ---------- */
  // al costado de la notebook con aire real: en el diseño (x = 1,85) se metía en la base
  // un 30 % más grande que el real (como el celular del diseño): la web en celular se lee mejor
  const PS = 1.3;
  const PY = (PHONE.h * PS) / 2 + 0.02;
  const iph = buildIPhone({ glassT: mac.glassT, haloT: mac.haloT });
  const ph = iph.group;
  rig.add(ph);
  const PX = 2.55,
    PZ = 0.25;
  ph.position.set(PX, PY, PZ);
  ph.rotation.set(0, -0.32, 0.02);
  ph.scale.setScalar(PS);
  iph.halo.material.opacity = 0.3;
  iph.light.intensity = 1.1;

  /* ---------- pantallas: dos capas por equipo para el fundido entre webs ---------- */
  const layer = (geo: THREE.BufferGeometry, parent: THREE.Object3D, z: number, y: number, ro: number) =>
    [0, 1].map((i) => {
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, toneMapped: false, depthWrite: false }));
      m.position.set(0, y, z + i * 0.0004);
      m.renderOrder = ro + i;
      parent.add(m);
      return m;
    });
  const macGeo = macScreenGeo(),
    phGeo = phoneScreenGeo();
  const L = layer(macGeo, mac.lid, MAC_SCREEN.z + 0.0004, MAC_SCREEN.y, 2);
  const P = layer(phGeo, ph, PHONE_SCREEN.z, 0, 2);

  /* ---------- luces y sombras (las del Home con la tapa abierta) ---------- */
  scene.add(new THREE.HemisphereLight(0xdfe4ff, 0x0c0c14, 0.3));
  const key = new THREE.DirectionalLight(0xffffff, 0.75);
  key.position.set(-3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc8ccff, 0.6);
  rim.position.set(4, 2, -4);
  scene.add(rim);
  const edgeL = new THREE.DirectionalLight(0xffffff, 1.4);
  edgeL.position.set(0, 3, -5);
  scene.add(edgeL);
  const shadowT = shadowTexture();
  const shadow = contactShadow(shadowT, 5.2, 3.9, 0.65);
  shadow.position.y = -0.035;
  scene.add(shadow);
  const phSd = contactShadow(shadowT, 1.3, 0.62, 0.42);
  phSd.position.set(PX, -0.03, PZ);
  phSd.rotation.z = 0.32;
  rig.add(phSd);

  /* ---------- texturas: se cargan una vez y quedan en caché ---------- */
  const aniso = renderer.capabilities.getMaxAnisotropy();
  const big = () => (el.clientWidth || innerWidth) * Math.min(devicePixelRatio, 2) > 900;
  type Slot = { t: THREE.Texture; ready: Promise<void> };
  const cache = new Map<string, Slot>();
  const deskTex = (v: WebView): Slot => {
    const ck = "d:" + v.d;
    let s = cache.get(ck);
    if (!s) {
      const hi = big();
      let res!: () => void;
      const ready = new Promise<void>((r) => (res = r));
      const t = macScreenTexture(webShot(v.d, !hi), v.name, hi ? 1600 : 1024, aniso, () => res());
      cache.set(ck, (s = { t, ready }));
    }
    return s;
  };
  const loader = new THREE.TextureLoader();
  const phoneTex = (key: string): Slot => {
    const ck = "m:" + key;
    let s = cache.get(ck);
    if (!s) {
      let res!: () => void;
      const ready = new Promise<void>((r) => (res = r));
      const t = tuneScreen(
        loader.load(
          webShot(key),
          (tt) => {
            fitTop(tt, PHONE_SCREEN.w / PHONE_SCREEN.h);
            res();
          },
          undefined,
          () => res(),
        ),
        aniso,
      );
      cache.set(ck, (s = { t, ready }));
    }
    return s;
  };

  /* ---------- cambio de web: fundido de pantallas, el celular entra o sale y un giro leve ---------- */
  let li = 0,
    pi = 0,
    want: WebView = first,
    curKey = "";
  // fundido de pantalla: siempre a valores absolutos, cortando lo que estuviera en curso
  const fade = (layers: THREE.Mesh[], i: number, map: THREE.Texture) => {
    const na = layers[1 - i].material as THREE.MeshBasicMaterial,
      oa = layers[i].material as THREE.MeshBasicMaterial;
    tw.kill(na, oa);
    na.map = map;
    na.needsUpdate = true;
    // la capa nueva queda por encima de la vieja
    layers[1 - i].renderOrder = 3;
    layers[i].renderOrder = 2;
    tw.to(na, { opacity: 1 }, 0.5, E.p2out);
    tw.to(oa, { opacity: 0 }, 0.5);
    return 1 - i;
  };
  const apply = (v: WebView) => {
    const k = v.d + "|" + v.m;
    if (k === curKey) return;
    curKey = k;
    li = fade(L, li, deskTex(v).t);
    tw.kill(ph.position, ph.scale);
    if (v.m) {
      pi = fade(P, pi, phoneTex(v.m).t);
      tw.to(ph.position, { y: PY }, 0.7, E.p3out);
      tw.to(ph.scale, { x: PS, y: PS, z: PS }, 0.5, E.p3out);
    } else {
      tw.to(ph.position, { y: -0.6 }, 0.5, E.p2in);
      tw.to(ph.scale, { x: 0.001, y: 0.001, z: 0.001 }, 0.35, E.p2in);
    }
    // giro leve con destino fijo: nunca se acumula aunque se pase rápido por varios rubros
    if (!drag) {
      tw.kill(rig.rotation);
      tw.to(rig.rotation, { y: -0.12, x: 0 }, 0.25, E.p2out);
      tw.to(rig.rotation, { y: 0 }, 0.8, E.p3out, 0.25);
    }
    kick();
  };
  // espera a que la captura esté lista (así el fundido nunca pasa por una pantalla vacía);
  // si mientras tanto se eligió otra web, gana la última
  const show = (v: WebView) => {
    want = v;
    Promise.all([deskTex(v).ready, v.m ? phoneTex(v.m).ready : null]).then(() => !dead && want === v && apply(v));
  };

  /* ---------- arrastrar para girar ±20°, vuelve solo ---------- */
  let drag: { x: number; y: number; ry: number; rx: number } | null = null;
  const LIM = THREE.MathUtils.degToRad(20);
  const onDown = (e: PointerEvent) => {
    drag = { x: e.clientX, y: e.clientY, ry: rig.rotation.y, rx: rig.rotation.x };
    el.setPointerCapture(e.pointerId);
    tw.kill(rig.rotation);
    kick();
  };
  const onDrag = (e: PointerEvent) => {
    if (!drag) return;
    rig.rotation.y = clamp(drag.ry + (e.clientX - drag.x) * 0.006, -LIM, LIM);
    rig.rotation.x = clamp(drag.rx + (e.clientY - drag.y) * 0.004, -LIM / 2, LIM / 2);
    kick();
  };
  const onUp = () => {
    if (!drag) return;
    drag = null;
    tw.to(rig.rotation, { x: 0, y: 0 }, 1.4, E.elastic);
    kick();
  };
  el.addEventListener("pointerdown", onDown);
  el.addEventListener("pointermove", onDrag);
  el.addEventListener("pointerup", onUp);
  el.addEventListener("pointercancel", onUp);
  // la notebook sigue apenas al mouse (inclinación)
  const mouse = { y: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.y = (e.clientY / innerHeight) * 2 - 1;
    kick();
  };
  addEventListener("pointermove", onMove, { passive: true });

  /* ---------- cámara: encuadre fijo; en contenedores altos se aleja para que entre todo ---------- */
  const fitDist = (h: number) => h / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
  function resize() {
    const w = el.clientWidth,
      h = el.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const narrow = w / h < 1;
    camera.position.set(0.15, 1.95, fitDist(narrow ? 5.9 : 4.4) * (narrow ? 1.1 / camera.aspect : 1));
    camera.lookAt(0.15, 1.05, 0);
    kick();
  }
  el.appendChild(canvas);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  // solo con el navegador automatizado (verificación): estado de la escena
  if (navigator.webdriver)
    (window as Window & { __dev3d?: unknown }).__dev3d = {
      stats: () => ({ ...renderer.info.render, geometries: renderer.info.memory.geometries, textures: renderer.info.memory.textures }),
      cur: () => curKey,
      // contornos en pantalla (para comprobar que el celular no se encima con la notebook)
      rects: () => {
        const r = el.getBoundingClientRect();
        const skip = new Set<THREE.Object3D>([mac.refl, mac.halo, mac.kGlow, iph.halo, ...L, ...P]);
        const rect = (root: THREE.Object3D) => {
          let x0 = Infinity,
            y0 = Infinity,
            x1 = -Infinity,
            y1 = -Infinity;
          root.updateWorldMatrix(true, true);
          root.traverse((o) => {
            const m = o as THREE.Mesh;
            if (!m.isMesh || skip.has(m) || !m.geometry) return;
            m.geometry.computeBoundingBox();
            const b = m.geometry.boundingBox!;
            for (const x of [b.min.x, b.max.x])
              for (const y of [b.min.y, b.max.y])
                for (const z of [b.min.z, b.max.z]) {
                  const v = m.localToWorld(new THREE.Vector3(x, y, z)).project(camera);
                  const sx = r.left + ((v.x + 1) / 2) * r.width,
                    sy = r.top + ((1 - v.y) / 2) * r.height;
                  x0 = Math.min(x0, sx);
                  x1 = Math.max(x1, sx);
                  y0 = Math.min(y0, sy);
                  y1 = Math.max(y1, sy);
                }
          });
          return { left: x0, top: y0, right: x1, bottom: y1 };
        };
        return { phone: rect(ph), laptop: rect(mac.group), box: r.toJSON() };
      },
    };

  /* ---------- bucle: dibuja solo en pantalla y mientras algo se mueve ---------- */
  const io = new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    kick();
  });
  io.observe(sec);
  const onVis = () => kick();
  document.addEventListener("visibilitychange", onVis);
  function kick() {
    rest = 0;
    if (!raf && !dead && visible && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }
  }
  function loop(t: number) {
    raf = 0;
    if (dead || !visible || document.hidden) return;
    const dt = Math.min(0.05, (t - last) / 1000);
    last = t;
    tw.step(t / 1000);
    if (!drag) rig.rotation.x = lerp(rig.rotation.x, mouse.y * 0.02, 0.03);
    // sombra del celular: acompaña su tamaño
    const on = clamp(ph.scale.x / PS, 0, 1);
    phSd.material.opacity = 0.42 * on;
    iph.light.intensity = 1.1 * on;
    renderer.render(scene, camera);
    if (!el.classList.contains("live")) {
      el.classList.add("live");
      onLive?.();
    }
    // sigue mientras haya animaciones o la inclinación no haya llegado a su destino
    const settling = drag || tw.busy() || Math.abs(rig.rotation.x - mouse.y * 0.02) > 1e-4;
    rest = settling ? 0 : rest + dt;
    if (rest < 0.25) raf = requestAnimationFrame(loop);
  }

  show(first);
  // precarga del resto cuando la primera ya está (de a una, sin competir con la página)
  deskTex(first).ready.then(() => {
    const all = Object.values(RUBRO_WEBS);
    const next = (i: number) => {
      if (dead || i >= all.length) return;
      const v = all[i];
      Promise.all([deskTex(v).ready, v.m ? phoneTex(v.m).ready : null]).then(() => next(i + 1));
    };
    next(0);
  });

  return {
    show,
    dispose() {
      dead = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onDrag);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      canvas.remove();
      el.classList.remove("live");
      cache.forEach((s) => s.t.dispose());
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        mats.forEach((mt) => {
          (mt as THREE.MeshBasicMaterial).map?.dispose();
          mt.dispose();
        });
      });
      studio.dispose();
      renderer.dispose();
      delete (window as Window & { __dev3d?: unknown }).__dev3d;
    },
  };
}
