// HOME · la notebook que se abre con el scroll (como apple.com/macbook).
// Portado de la escena "notebook" del diseño (Three.js r160). Se carga en diferido:
// nunca forma parte del JS inicial de la página. Los modelos están en devices-model.ts.
import * as THREE from "three";
import { ISO_A, ISO_B } from "./iso-a";
import { LAPTOP, ORBIT, PHONE, phonePose } from "./phone-orbit";
import {
  MAC_SCREEN,
  PHONE_SCREEN,
  additive,
  buildIPhone,
  buildMacBook,
  buildStudioEnv,
  canvasTex,
  contactShadow,
  fitTop,
  macScreenGeo,
  macScreenTexture,
  phoneScreenGeo,
  shadowTexture,
  tuneScreen,
} from "./devices-model";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const sg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);

// captura de escritorio, captura de celular y lo que muestra la barra del navegador
const SHOTS: [string, string, string][] = [
  ["rodeo-desktop", "rodeo-mobile", "Aspa Rodeo"],
  ["scout-desktop", "scout-mobile", "Aspa Scout"],
  ["dh-engineering-desktop", "dh-engineering-mobile", "DH Engineering"],
  ["architecture-360-desktop", "architecture-360-mobile", "Architecture 360"],
];

/** Monta la escena en el contenedor. Devuelve la función que la desarma. */
export function mountNotebook(el: HTMLElement, sec: HTMLElement, isMobileDevice: boolean, getProgress?: () => number) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, isMobileDevice ? 1.5 : 1.75));
  // AgX: colores y luces altas más naturales que ACES (aluminio y titanio sin virar)
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = "m3d-canvas";
  const studio = buildStudioEnv(renderer);

  const scene = new THREE.Scene();
  scene.environment = studio.env;
  const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 100);

  const rig = new THREE.Group();
  scene.add(rig);

  /* ---------- MacBook Pro 14" ---------- */
  const mac = buildMacBook();
  const { group: nb, lid, alu, logo: aM, refl, halo, kGlow } = mac;
  rig.add(nb);

  /* ---------- pantalla: arranque + capturas ---------- */
  const { w: sW, h: sH, y: sY, z: Z0 } = MAC_SCREEN;
  const BCW = 1024,
    BCH = Math.round((BCW * sH) / sW);
  const bootC = document.createElement("canvas");
  bootC.width = BCW;
  bootC.height = BCH;
  const bx = bootC.getContext("2d")!;
  const bootT = new THREE.CanvasTexture(bootC);
  bootT.colorSpace = THREE.SRGBColorSpace;
  const aPath = new Path2D(ISO_A);
  const ib = ISO_B;
  let bootK = -1;
  const drawBoot = (k: number) => {
    if (k === bootK) return;
    bootK = k;
    bx.fillStyle = "#07070b";
    bx.fillRect(0, 0, BCW, BCH);
    const g = bx.createRadialGradient(BCW / 2, BCH / 2, 10, BCW / 2, BCH / 2, 520);
    g.addColorStop(0, "rgba(45,43,255," + 0.35 * k + ")");
    g.addColorStop(1, "rgba(0,0,0,0)");
    bx.fillStyle = g;
    bx.fillRect(0, 0, BCW, BCH);
    const s = 220 / (ib[3] - ib[1]);
    bx.save();
    bx.translate(BCW / 2 - ((ib[0] + ib[2]) / 2) * s, BCH / 2 - ((ib[1] + ib[3]) / 2) * s);
    bx.scale(s, s);
    bx.lineWidth = 2.2 / s;
    bx.strokeStyle = "rgba(255,255,255,.95)";
    bx.setLineDash([2400, 2400]);
    bx.lineDashOffset = 2400 * (1 - k);
    bx.stroke(aPath);
    bx.globalAlpha = Math.max(0, k * 2 - 1);
    bx.fillStyle = "#fff";
    bx.fill(aPath, "evenodd");
    bx.restore();
    bootT.needsUpdate = true;
  };
  drawBoot(0);
  const bootS = new THREE.Mesh(
    macScreenGeo(),
    new THREE.MeshBasicMaterial({ color: 0x000000, map: bootT, transparent: true, opacity: 1, toneMapped: false, depthWrite: false }),
  );
  bootS.position.set(0, sY, Z0);
  lid.add(bootS);

  const loader = new THREE.TextureLoader();
  const big = innerWidth * devicePixelRatio > 1600 && !isMobileDevice;
  const aniso = renderer.capabilities.getMaxAnisotropy();
  let loaded = 0;
  const need = SHOTS.length * 2;
  const ld = (name: string, asp: number) =>
    tuneScreen(
      loader.load(
        `/3d/${name}${big ? "" : "-sm"}.webp`,
        (tt) => {
          fitTop(tt, asp);
          loaded++;
        },
        undefined,
        () => loaded++,
      ),
      aniso,
    );
  // Las capturas son 16:9 y la pantalla de la Mac es casi 16:10: se componen como en una Mac
  // real (barra de menús + barra del navegador + la página; ver macScreenTexture).
  const ldMac = (name: string, label: string) => macScreenTexture(`/3d/${name}${big ? "" : "-sm"}.webp`, label, big ? 2048 : 1280, aniso, () => loaded++);
  const shots = SHOTS.map((s, i) => {
    const m = new THREE.Mesh(macScreenGeo(), new THREE.MeshBasicMaterial({ map: ldMac(s[0], s[2]), transparent: true, opacity: 0, toneMapped: false, depthWrite: false }));
    m.position.set(0, sY, Z0 + 0.0004 + i * 0.0004);
    m.renderOrder = 2 + i;
    lid.add(m);
    return m;
  });
  const sweepT = canvasTex(
    256,
    8,
    (x) => {
      const g = x.createLinearGradient(0, 0, 256, 0);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(0.5, "rgba(255,255,255,.55)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, 256, 8);
    },
    false,
  );
  const sweep = new THREE.Mesh(new THREE.PlaneGeometry(0.7, sH), additive(sweepT));
  sweep.position.set(0, sY, Z0 + 0.0036);
  lid.add(sweep);

  /* ---------- iPhone 15 Pro ---------- */
  const iph = buildIPhone({ glassT: mac.glassT, haloT: mac.haloT });
  const { group: ph, refl: phR, sheen: phSh, sheenT, halo: phHalo, light: phL } = iph;
  rig.add(ph);
  const { w: PW, h: PHh, t: PT } = PHONE;
  const phS = SHOTS.map((s) => {
    const m = new THREE.Mesh(phoneScreenGeo(), new THREE.MeshBasicMaterial({ map: ld(s[1], PHONE_SCREEN.w / PHONE_SCREEN.h), transparent: true, opacity: 0, toneMapped: false, depthWrite: false }));
    m.position.z = PHONE_SCREEN.z;
    ph.add(m);
    return m;
  });
  ph.visible = false;

  /* ---------- luces (el resplandor de la pantalla sobre el teclado es kGlow) ---------- */
  scene.add(new THREE.HemisphereLight(0xdfe4ff, 0x0c0c14, 0.3));
  const key = new THREE.DirectionalLight(0xffffff, 0.75);
  key.position.set(-3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc8ccff, 0.6);
  rim.position.set(4, 2, -4);
  scene.add(rim);
  const edgeL = new THREE.DirectionalLight(0xffffff, 0.0);
  edgeL.position.set(0, 3, -5);
  scene.add(edgeL);
  const shadowTex = shadowTexture();
  const shadow = contactShadow(shadowTex, 5.2, 3.9, 0.65);
  shadow.position.y = -0.035;
  scene.add(shadow);
  const phSd = contactShadow(shadowTex, 1.1, 0.55, 0);
  phSd.visible = false;
  rig.add(phSd);


  /* ---------- cámara: cerrada en 3/4 → de frente → entra a la pantalla ---------- */
  let rx = 0,
    ry = 0,
    mobile = false,
    phQ = -1,
    phQV = 0;
  const PW0 = 7;
  // centro y normal de la pantalla con la tapa abierta: al final la cámara entra de frente a ella
  lid.rotation.x = LAPTOP.lidOpen;
  scene.updateMatrixWorld(true);
  const tgtLook = bootS.getWorldPosition(new THREE.Vector3());
  const scrN = new THREE.Vector3(0, 0, 1).applyQuaternion(lid.getWorldQuaternion(new THREE.Quaternion()));
  lid.rotation.x = Math.PI / 2;
  const v3 = new THREE.Vector3(),
    look = new THREE.Vector3(),
    tgtPos = new THREE.Vector3();
  const camAt = (p: number, W: number, H: number) => {
    const o = ease(sg(p, 0, 0.25)),
      d = sg(p, 0.8, 0.95),
      dd = d * d * (3 - 2 * d);
    const asp = W / H;
    const R = (mobile ? 10.5 : 8.7) * Math.max(1, (1.55 / asp) * 0.95);
    const a = lerp(0.75, 0, o),
      h = lerp(1.3, 2.0, o);
    v3.set(Math.sin(a) * R, h, Math.cos(a) * R);
    look.set(0, lerp(0.36, 0.88, o), lerp(0, -0.36, o));
    if (dd > 0) {
      v3.lerp(tgtPos.copy(tgtLook).addScaledVector(scrN, mobile ? 2.4 : 2.15), dd);
      look.lerp(tgtLook, dd);
    }
    camera.position.copy(v3);
    camera.lookAt(look);
  };

  const mouse = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = (e.clientY / innerHeight) * 2 - 1;
  };
  addEventListener("pointermove", onMove, { passive: true });

  // solo con el navegador automatizado (tests): dónde cae el celular en pantalla, en px CSS
  if (navigator.webdriver)
    (window as Window & { __nb3d?: unknown }).__nb3d = {
      // presupuesto de la escena (último cuadro dibujado)
      stats: () => ({ ...renderer.info.render, geometries: renderer.info.memory.geometries, textures: renderer.info.memory.textures }),
      phoneRect: () => {
        if (!ph.visible) return null;
        const r = el.getBoundingClientRect();
        let x0 = Infinity,
          y0 = Infinity,
          x1 = -Infinity,
          y1 = -Infinity;
        for (const sx of [-1, 1])
          for (const sy of [-1, 1])
            for (const sz of [-1, 1]) {
              const v = ph.localToWorld(new THREE.Vector3((sx * PW) / 2, (sy * PHh) / 2, (sz * PT) / 2)).project(camera);
              const x = r.left + ((v.x + 1) / 2) * r.width,
                y = r.top + ((1 - v.y) / 2) * r.height;
              x0 = Math.min(x0, x);
              x1 = Math.max(x1, x);
              y0 = Math.min(y0, y);
              y1 = Math.max(y1, y);
            }
        return { left: x0, top: y0, right: x1, bottom: y1 };
      },
    };

  // progreso con inercia (lo calcula home.ts y lo comparte con los textos del hero)
  const progress =
    getProgress ??
    (() => {
      const R = sec.getBoundingClientRect();
      return clamp(-R.top / Math.max(1, R.height - innerHeight), 0, 1);
    });
  const smooth = (x: number) => x * x * (3 - 2 * x);

  function update(dt: number, t: number) {
    const p = progress();
    // tapa: 0° cerrada → 110° abierta
    const o = ease(sg(p, 0, 0.25));
    lid.rotation.x = lerp(Math.PI / 2, LAPTOP.lidOpen, o);
    // reflejo que recorre el aluminio al abrir
    alu.envMapIntensity = 0.85 + Math.sin(o * Math.PI) * 0.6;
    aM.opacity = aM.map ? 0.82 + 0.12 * Math.sin(t * 1.2) * (1 - o) : 0;
    // encendido
    const on = sg(p, 0.25, 0.35);
    bootS.material.color.setScalar(clamp(on * 1.4, 0, 1));
    drawBoot(on);
    const ready = loaded >= need;
    if (ready && p >= 0.36) bootS.material.color.setScalar(0.02);
    refl.material.opacity = on * 0.35;
    halo.material.opacity = on * 0.9;
    kGlow.material.opacity = on * 0.45;
    edgeL.intensity = 0.6 + o * 0.8;
    // capturas: una por tramo
    const N = SHOTS.length;
    const q = sg(p, 0.35, 0.8) * N;
    const idx = Math.min(N - 1, Math.floor(q));
    // fundido largo y con curva entre capturas (antes era lineal y en un tramo corto)
    const XF = 0.16;
    shots.forEach((m, i) => {
      const l = i === 0 ? 1 : smooth(clamp((q - i + XF) / (2 * XF), 0, 1)),
        r = i === N - 1 ? 1 : smooth(clamp((i + 1 - q + XF) / (2 * XF), 0, 1));
      m.material.opacity = ready && p >= 0.35 ? l * r : 0;
    });
    const fr = q - idx;
    if (p >= 0.35) {
      sweep.material.opacity = clamp(1 - Math.abs(fr - 0.12) * 7, 0, 1) * 0.55;
      sweep.position.x = lerp(-sW / 2, sW / 2, smooth(clamp(fr * 4, 0, 1)));
    } else sweep.material.opacity = 0;
    // celular: orbita alrededor de la notebook (recorrido en phone-orbit.ts, testeado para que
    // nunca la toque). Sigue al mismo tramo que las capturas, con un resorte encima para que
    // el movimiento tenga peso; al scrollear para atrás hace el mismo camino al revés.
    const qt = (p - 0.35) / 0.45 * N;
    if (p < 0.3 || p > 0.86) {
      phQ = clamp(qt, -0.01, 4);
      phQV = 0;
    } else {
      phQV += (PW0 * PW0 * (qt - phQ) - 2 * PW0 * phQV) * dt;
      phQ += phQV * dt;
    }
    const pose = phonePose(clamp(phQ, 0, 4));
    const vis = phQ > 0 && phQ < 4 && pose.enter > 0.001;
    ph.visible = phSd.visible = vis;
    if (vis) {
      const still = 1 - pose.move;
      ph.position.set(pose.x, pose.y + Math.sin(t * 0.9) * 0.018 * still, pose.z);
      ph.rotation.set(pose.pitch + Math.sin(t * 0.7) * 0.01 * still, pose.yaw, pose.roll);
      ph.scale.setScalar(ORBIT.scale * lerp(0.92, 1, pose.enter));
      // por detrás de la notebook se apaga un poco (queda en la sombra de la tapa)
      const back = clamp(-Math.cos((pose.theta * Math.PI) / 180), 0, 1) * 0.4;
      const wake = smooth(sg(pose.enter, 0.45, 1));
      phS.forEach((m, i) => {
        m.material.opacity = i === pose.screen ? wake : 0;
        m.material.color.setScalar(lerp(0.55, 1, wake) * (1 - back));
      });
      phR.material.opacity = 0.18 * pose.enter;
      phHalo.material.opacity = 0.3 * wake * (1 - back);
      phL.intensity = 1.1 * wake * (1 - back);
      // el reflejo del vidrio se desliza con el giro (como uno de verdad) y brilla al moverse
      sheenT.offset.x = 0.25 - pose.yaw * 0.45;
      phSh.material.opacity = 0.42 * wake * pose.move;
      // sombra de contacto sobre la mesa
      phSd.position.set(pose.x, -0.03, pose.z);
      phSd.rotation.z = -pose.yaw;
      phSd.material.opacity = 0.42 * pose.enter;
    }
    // flotar y seguir al mouse (±6°)
    const fl = 1 - o;
    nb.position.y = Math.sin(t * 1.1) * 0.035 * fl;
    rx = lerp(rx, mouse.y * 0.105, 0.05);
    ry = lerp(ry, mouse.x * 0.105, 0.05);
    rig.rotation.set(rx * (1 - sg(p, 0.8, 0.9)), ry * (1 - sg(p, 0.8, 0.9)), 0);
    camAt(p, el.clientWidth || innerWidth, el.clientHeight || innerHeight);
    // al entrar a la pantalla, el lienzo se funde con la sección siguiente; termina antes del
    // final del hero (0,96) para que, aunque el progreso venga algo atrasado, no se vea
    // la notebook a medio entrar mientras la sección se va
    el.style.opacity = (1 - sg(p, 0.89, 0.96)).toFixed(3);
  }

  /* ---------- tamaño, visibilidad y bucle ---------- */
  function resize() {
    const w = el.clientWidth,
      h = el.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    mobile = w / h < 1;
    camera.fov = mobile ? 44 : 30;
    camera.updateProjectionMatrix();
  }
  el.appendChild(canvas);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  let visible = true;
  const io = new IntersectionObserver((es) => (visible = es[0].isIntersecting));
  io.observe(sec);

  let last = performance.now(),
    raf = 0;
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

  return () => {
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
        (mt as THREE.MeshBasicMaterial).map?.dispose();
        mt.dispose();
      });
    });
    studio.dispose();
    renderer.dispose();
  };
}
