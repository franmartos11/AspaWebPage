// Modelos 3D compartidos: MacBook Pro 14" y iPhone 15 Pro procedurales (medidas reales de
// phone-orbit.ts), el estudio de luz con el que se reflejan y utilidades de pantalla.
// Los usan la notebook del Home (notebook3d.ts) y el visor de webs (devices3d.ts).
// Solo se importa desde módulos que se cargan en diferido: nunca entra en el JS inicial.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { LAPTOP, MM, PHONE } from "./phone-orbit";
import { LOGO_A, LOGO_LETTERS, LOGO_PHX, PX_FULL } from "@/lib/logo-paths";

const mm = (v: number) => v * MM;

/* ---------- utilidades ---------- */
export const canvasTex = (w: number, h: number, draw: (x: CanvasRenderingContext2D) => void, srgb = true) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
};
export const radial = (stops: [number, string][]) => (x: CanvasRenderingContext2D) => {
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  stops.forEach(([o, c]) => g.addColorStop(o, c));
  x.fillStyle = g;
  x.fillRect(0, 0, 256, 256);
};
// sombra de contacto (degradé radial) y el resplandor celeste de las pantallas
export const shadowTexture = () => canvasTex(256, 256, radial([[0, "rgba(0,0,0,.75)"], [0.45, "rgba(0,0,0,.35)"], [1, "rgba(0,0,0,0)"]]));
export const haloTexture = () =>
  canvasTex(256, 256, radial([[0, "rgba(140,150,255,.55)"], [0.45, "rgba(90,95,255,.18)"], [1, "rgba(0,0,0,0)"]]), false);
// reflejo diagonal tenue del vidrio
export const glassTexture = () =>
  canvasTex(256, 256, (x) => {
    const g = x.createLinearGradient(0, 0, 256, 256);
    g.addColorStop(0, "rgba(255,255,255,.10)");
    g.addColorStop(0.4, "rgba(255,255,255,.02)");
    g.addColorStop(0.55, "rgba(255,255,255,0)");
    g.addColorStop(1, "rgba(255,255,255,.04)");
    x.fillStyle = g;
    x.fillRect(0, 0, 256, 256);
  });
export const additive = (map: THREE.Texture, opacity = 0) =>
  new THREE.MeshBasicMaterial({ map, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
/** Plano de sombra de contacto, acostado sobre la mesa. */
export const contactShadow = (map: THREE.Texture, w: number, d: number, opacity: number) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map, transparent: true, opacity, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  m.renderOrder = -1;
  return m;
};
export const pill = (w: number, h: number) => {
  const r = h / 2,
    sh = new THREE.Shape();
  sh.moveTo(-w / 2 + r, -r);
  sh.lineTo(w / 2 - r, -r);
  sh.absarc(w / 2 - r, 0, r, -Math.PI / 2, Math.PI / 2, false);
  sh.lineTo(-w / 2 + r, r);
  sh.absarc(-w / 2 + r, 0, r, Math.PI / 2, Math.PI * 1.5, false);
  return new THREE.ShapeGeometry(sh, 24);
};
// rectángulo redondeado plano con UV 0..1 (pantallas y vidrios)
// r: un radio para las cuatro esquinas o [sup. izq., sup. der., inf. der., inf. izq.]
const rrShape = (w: number, h: number, r: number | number[]) => {
  const [tl, tr, br, bl] = typeof r === "number" ? [r, r, r, r] : r;
  const sh = new THREE.Shape(),
    x = -w / 2,
    y = -h / 2;
  sh.moveTo(x + bl, y);
  sh.lineTo(x + w - br, y);
  if (br) sh.quadraticCurveTo(x + w, y, x + w, y + br);
  sh.lineTo(x + w, y + h - tr);
  if (tr) sh.quadraticCurveTo(x + w, y + h, x + w - tr, y + h);
  sh.lineTo(x + tl, y + h);
  if (tl) sh.quadraticCurveTo(x, y + h, x, y + h - tl);
  sh.lineTo(x, y + bl);
  if (bl) sh.quadraticCurveTo(x, y, x + bl, y);
  return sh;
};
export const rrGeo = (w: number, h: number, r: number | number[], seg = 10) => {
  const g = new THREE.ShapeGeometry(rrShape(w, h, r), seg);
  const pos = g.attributes.position,
    uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
  uv.needsUpdate = true;
  return g;
};
// losa con cantos redondeados (base, tapa, celular, teclas): rectángulo redondeado extruido
// con bisel; queda centrada y con el grosor en z
const slab = (w: number, h: number, t: number, r: number, bev: number, bevSeg = 5, curveSeg = 20) => {
  const g = new THREE.ExtrudeGeometry(rrShape(w - 2 * bev, h - 2 * bev, Math.max(0.0005, r - bev)), {
    depth: t - 2 * bev,
    curveSegments: curveSeg,
    bevelEnabled: true,
    bevelThickness: bev,
    bevelSize: bev,
    bevelSegments: bevSeg,
  });
  g.translate(0, 0, -(t - 2 * bev) / 2);
  return g;
};
const glassMaterial = () =>
  new THREE.MeshPhysicalMaterial({ color: 0x010102, roughness: 0.12, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 0.35 });

/** Calidad de una textura de pantalla: sRGB, anisotropía máxima y mipmaps. */
export const tuneScreen = (t: THREE.Texture, maxAniso: number) => {
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = maxAniso;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.magFilter = THREE.LinearFilter;
  return t;
};
/** Encuadra una captura en una pantalla de proporción asp: entra a lo ancho y queda arriba. */
export const fitTop = (t: THREE.Texture, asp: number) => {
  const img = t.image as HTMLImageElement;
  const a = img.width / img.height;
  if (a > asp) {
    t.repeat.set(asp / a, 1);
    t.offset.set(0, 0);
  } else {
    t.repeat.set(1, a / asp);
    t.offset.set(0, 1 - a / asp);
  }
  t.needsUpdate = true;
};

/* ---------- estudio de luz ---------- */
/** Entorno para los reflejos (PMREM). dispose() libera la textura y el generador. */
export function buildStudioEnv(renderer: THREE.WebGLRenderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  // Estudio de fotografía de producto: caja oscura con softboxes. Los reflejos largos y limpios
  // en los cantos del aluminio y el titanio son los que dan el aspecto de foto de Apple.
  const studio = new THREE.Scene();
  studio.add(new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), new THREE.MeshBasicMaterial({ color: 0x050507, side: THREE.BackSide })));
  const softbox = (w: number, h: number, k: number, pos: [number, number, number], color = 0xffffff) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
    m.material.color.multiplyScalar(k);
    m.position.set(...pos);
    m.lookAt(0, 0.6, 0);
    studio.add(m);
  };
  softbox(9, 9, 1.5, [0, 10, 0]); // cenital
  softbox(2.4, 10, 4, [-9, 2.5, 3]); // tira izquierda: el filo de luz en los cantos
  softbox(2.4, 10, 2.6, [9, 2.5, 1.5]); // tira derecha
  softbox(16, 5.5, 1.1, [0, 2.6, -10], 0xdde0ff); // fondo: lo que refleja la tapa cerrada y el apoyamanos
  softbox(12, 2.2, 0.5, [0, 0.8, 10]); // relleno frontal tenue
  const env = pmrem.fromScene(studio, 0.02).texture;
  studio.traverse((o) => {
    const m = o as THREE.Mesh;
    m.geometry?.dispose();
    (m.material as THREE.Material | undefined)?.dispose();
  });
  return {
    env,
    dispose() {
      env.dispose();
      pmrem.dispose();
    },
  };
}

/* ---------- MacBook Pro 14" ---------- */
const { bw: BW, bd: BD, bt: BT, lt: LT, gap: LG } = LAPTOP;
const LH = BD; // alto de la tapa
// pantalla Liquid Retina XDR (302,4 × 196,6 mm, notch)
const sW = mm(302.4),
  sH = mm(196.6),
  sTop = LH - mm(4.6),
  NW = mm(30),
  NH = mm(7.4); // el notch: misma altura que la barra de menús
/** Medidas de la pantalla de la Mac, en coordenadas de la tapa (lid). */
export const MAC_SCREEN = { w: sW, h: sH, y: sTop - sH / 2, top: sTop, notchH: NH, z: LT / 2 + 0.0022 };
// esquinas superiores redondeadas, inferiores rectas (como la pantalla real)
export const macScreenGeo = () => rrGeo(sW, sH, [mm(4.5), mm(4.5), 0, 0], 12);

/**
 * Arma la notebook (base, teclado, trackpad, bisagra y tapa con logo, notch y reflejo del vidrio).
 * La tapa (lid) gira en la bisagra: rotation.x = π/2 cerrada, LAPTOP.lidOpen abierta.
 * Las pantallas las agrega quien la usa, en lid, con macScreenGeo() y MAC_SCREEN.
 */
export function buildMacBook(opts: { glassT?: THREE.Texture; haloT?: THREE.Texture } = {}) {
  const nb = new THREE.Group();

  /* materiales */
  // aluminio plata anodizado: granallado, de reflejo satinado y amplio (no cepillado)
  const alu = new THREE.MeshPhysicalMaterial({
    color: 0x34353a,
    roughness: 0.48,
    metalness: 1,
    clearcoat: 0.25,
    clearcoatRoughness: 0.45,
    envMapIntensity: 1.1,
  });
  const blackM = new THREE.MeshStandardMaterial({ color: 0x0b0b0d, roughness: 0.85, metalness: 0.1 });
  const glassM = glassMaterial();
  const flat = (g: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = nb) => {
    const o = new THREE.Mesh(g, m);
    o.rotation.x = -Math.PI / 2;
    o.position.set(x, y, z);
    parent.add(o);
    return o;
  };

  /* base */
  const base = new THREE.Mesh(slab(BW, BD, BT, mm(9.5), mm(1.6)), alu);
  base.rotation.x = -Math.PI / 2;
  base.position.y = BT / 2;
  nb.add(base);
  // patas de goma
  const footG = new THREE.CylinderGeometry(mm(7), mm(7.5), mm(1.2), 24);
  [-1, 1].forEach((sx) =>
    [-1, 1].forEach((sz) => {
      const f = new THREE.Mesh(footG, blackM);
      f.position.set(sx * (BW / 2 - mm(24)), -mm(0.6), sz * (BD / 2 - mm(22)));
      nb.add(f);
    }),
  );
  // muesca para abrir la tapa
  const scoop = new THREE.Mesh(
    new RoundedBoxGeometry(mm(62), mm(3), mm(4), 3, mm(1.2)),
    new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.5, metalness: 0.8 }),
  );
  scoop.position.set(0, BT - mm(0.9), BD / 2 - mm(1.4));
  nb.add(scoop);
  // puertos en los costados (se ven en las vistas en 3/4)
  const portM = new THREE.MeshBasicMaterial({ color: 0x050506 });
  const port = (side: number, z: number, w: number, h: number) => {
    const m = new THREE.Mesh(rrGeo(mm(w), mm(h), mm(Math.min(w, h) / 2)), portM);
    m.rotation.y = (side * Math.PI) / 2;
    m.position.set(side * (BW / 2 + 0.0004), BT / 2, z);
    nb.add(m);
  };
  port(-1, -mm(72), 16, 3.6); // MagSafe
  port(-1, -mm(48), 8.6, 2.8); // Thunderbolt
  port(-1, -mm(34), 8.6, 2.8);
  port(-1, mm(70), 3.6, 3.6); // auriculares
  port(1, -mm(50), 14.5, 4.4); // HDMI
  port(1, -mm(30), 8.6, 2.8); // Thunderbolt
  port(1, mm(62), 25, 2); // SDXC

  /* teclado: teclas de tamaño real, leyendas y Touch ID */
  const KW = mm(272),
    RP = mm(18.4),
    KD = RP * 6,
    U = KW / 14.5,
    KG = mm(2.2),
    KH = mm(1.1),
    KY = BT + mm(0.2), // tope de las teclas
    kz0 = -BD / 2 + mm(11);
  flat(rrGeo(KW + mm(3.5), KD + mm(3.5), mm(3)), new THREE.MeshStandardMaterial({ color: 0x08080a, roughness: 0.9 }), 0, BT + 0.0003, kz0 + KD / 2);
  type K = [number, string];
  const k1 = (s: string) => s.split(" ").map((c): K => [1, c]);
  const ROWS: K[][] = [
    [[1.5, "esc"], ...["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"].map((c): K => [1, c]), [1, ""]],
    [...k1("| 1 2 3 4 5 6 7 8 9 0 ' ¿"), [1.5, "⌫"]],
    [[1.5, "⇥"], ...k1("Q W E R T Y U I O P ´ + }")],
    [[1.75, "⇪"], ...k1("A S D F G H J K L Ñ {"), [1.75, "↩"]],
    [[2.25, "⇧"], ...k1("Z X C V B N M , . -"), [2.25, "⇧"]],
    [[1, "fn"], [1, "control"], [1, "option"], [1.25, "⌘"], [5, ""], [1.25, "⌘"], [1, "option"], [1, "◀"], [1, "▲▼"], [1, "▶"]],
  ];
  const keyGeos: THREE.BufferGeometry[] = [];
  const LCW = 2048,
    LCH = Math.round((LCW * KD) / KW),
    px = LCW / KW;
  const legends: [number, number, number, string][] = []; // x, z, ancho, texto
  const addKey = (cx: number, cz: number, w: number, d: number) => {
    const g = slab(w, d, KH, mm(1.7), mm(0.3), 1, 4);
    g.rotateX(-Math.PI / 2);
    g.translate(cx, KY - KH / 2, cz);
    keyGeos.push(g);
  };
  ROWS.forEach((row, ri) => {
    let x = -KW / 2;
    const cz = kz0 + RP * (ri + 0.5);
    row.forEach(([w, label]) => {
      const kw = w * U;
      if (label === "▲▼") {
        // flechas arriba/abajo: media altura, una sobre otra
        addKey(x + kw / 2, cz - RP / 4 + KG / 4, kw - KG, RP / 2 - KG / 2);
        addKey(x + kw / 2, cz + RP / 4, kw - KG, RP / 2 - KG / 2);
        legends.push([x + kw / 2, cz - RP / 4, kw, "▲"], [x + kw / 2, cz + RP / 4, kw, "▼"]);
      } else if (label === "◀" || label === "▶") {
        addKey(x + kw / 2, cz + RP / 4, kw - KG, RP / 2 - KG / 2);
        legends.push([x + kw / 2, cz + RP / 4, kw, label]);
      } else {
        addKey(x + kw / 2, cz, kw - KG, RP - KG);
        if (label) legends.push([x + kw / 2, cz, kw, label]);
      }
      x += kw;
    });
  });
  const keyM = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.8, metalness: 0, envMapIntensity: 0.3 });
  nb.add(new THREE.Mesh(mergeGeometries(keyGeos), keyM));
  keyGeos.forEach((g) => g.dispose());
  // leyendas impresas: una sola textura sobre el plano de los topes de las teclas
  const legendT = canvasTex(LCW, LCH, (x) => {
    x.fillStyle = "rgba(235,235,240,.7)";
    x.textAlign = "center";
    x.textBaseline = "middle";
    legends.forEach(([lx, lz, kw, t]) => {
      const cx = (lx + KW / 2) * px,
        cy = (lz - kz0) * px;
      const word = t.length > 2 && !/^F\d/.test(t);
      const fs = /^F\d/.test(t) || word ? U * px * 0.15 : t.length === 1 && /[A-ZÑ0-9]/.test(t) ? U * px * 0.27 : U * px * 0.22;
      x.font = `500 ${fs.toFixed(0)}px -apple-system, "Helvetica Neue", Arial, sans-serif`;
      // como en las Mac: los modificadores van abajo, las letras al centro
      x.fillText(t, cx, word ? cy + RP * px * 0.24 : cy, kw * px * 0.8);
    });
  });
  legendT.anisotropy = 8;
  flat(
    new THREE.PlaneGeometry(KW, KD),
    new THREE.MeshStandardMaterial({ map: legendT, transparent: true, roughness: 0.6, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }),
    0,
    KY + 0.0002,
    kz0 + KD / 2,
  );
  // parlantes: micro perforaciones a los costados del teclado
  const grilleT = canvasTex(128, 1024, (x) => {
    x.fillStyle = "#000";
    for (let r = 0; r < 88; r++)
      for (let k = 0; k < 10; k++) {
        x.beginPath();
        x.arc(8 + k * 12.3 + (r % 2) * 6, 6 + r * 11.6, 3.2, 0, Math.PI * 2);
        x.fill();
      }
  });
  grilleT.anisotropy = 8;
  const grilleM = new THREE.MeshBasicMaterial({ map: grilleT, transparent: true, depthWrite: false });
  [-1, 1].forEach((sd) => flat(new THREE.PlaneGeometry(mm(13), KD), grilleM, sd * (KW / 2 + mm(10.2)), BT + 0.0003, kz0 + KD / 2));
  // trackpad de vidrio con su borde
  const TPW = mm(145),
    TPD = mm(82),
    tpz = BD / 2 - mm(10) - TPD / 2;
  flat(rrGeo(TPW + mm(0.8), TPD + mm(0.8), mm(6.4)), new THREE.MeshStandardMaterial({ color: 0x17181b, roughness: 0.6, metalness: 0.5 }), 0, BT + 0.0003, tpz);
  flat(
    rrGeo(TPW, TPD, mm(6)),
    new THREE.MeshPhysicalMaterial({ color: 0x34353a, roughness: 0.34, metalness: 1, clearcoat: 0.5, clearcoatRoughness: 0.3 }),
    0,
    BT + 0.0006,
    tpz,
  );
  // bisagra: el cilindro oscuro entre la base y el borde inferior de la pantalla
  const hinge = new THREE.Mesh(
    new THREE.CylinderGeometry(mm(4.2), mm(4.2), mm(258), 32),
    new THREE.MeshStandardMaterial({ color: 0x1d1e21, roughness: 0.5, metalness: 0.9 }),
  );
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, BT + mm(0.5), -BD / 2 + mm(4.5));
  nb.add(hinge);

  /* tapa (pivote en la bisagra): cerrada = apoyada exacta sobre la base */
  const lid = new THREE.Group();
  lid.position.set(0, BT + LG + LT / 2, -BD / 2);
  nb.add(lid);
  const lidB = new THREE.Mesh(slab(BW, LH, LT, mm(9.5), mm(1.2)), alu);
  lidB.position.y = LH / 2;
  lid.add(lidB);
  const bez = new THREE.Mesh(rrGeo(BW - mm(3.6), LH - mm(3.6), mm(8)), glassM);
  bez.position.set(0, LH / 2, LT / 2 + 0.0006);
  lid.add(bez);

  // logo completo de Aspa en la tapa (cara externa): letras blancas y el fénix en celeste.
  // Arranca invisible; cuando carga queda en opacity 0,92 (quien lo anima mira logo.map).
  const logo = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, toneMapped: false });
  const aMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.52, (0.52 * 890) / 2857), logo);
  aMesh.rotation.set(0, Math.PI, Math.PI);
  aMesh.position.set(1.22, LH - 0.22, -LT / 2 - 0.0012);
  lid.add(aMesh);
  (() => {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -150 2857 890" width="2857" height="890">` +
      LOGO_LETTERS.map((l) => `<path fill="#fff" d="${l.d}"/>`).join("") +
      `<path fill="#fff" d="${LOGO_A}"/>` +
      `<path fill="#35ADF2" fill-rule="evenodd" transform="${PX_FULL.replace(/px/g, "")}" d="${LOGO_PHX}"/></svg>`;
    const img = new Image();
    img.onload = () => {
      const t = canvasTex(2048, Math.round((2048 * 890) / 2857), (x) => x.drawImage(img, 0, 0, 2048, Math.round((2048 * 890) / 2857)));
      t.anisotropy = 8;
      logo.map = t;
      logo.opacity = 0.92;
      logo.needsUpdate = true;
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  })();

  // notch con la cámara
  const notch = new THREE.Mesh(rrGeo(NW, NH + mm(1), [0, 0, mm(2.4), mm(2.4)], 8), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  notch.position.set(0, sTop - NH / 2 + mm(0.5), MAC_SCREEN.z + 0.005);
  lid.add(notch);
  const lens = new THREE.Mesh(
    new THREE.CircleGeometry(mm(1.2), 24),
    new THREE.MeshPhysicalMaterial({ color: 0x0b1022, roughness: 0.08, metalness: 0.3, clearcoat: 1 }),
  );
  lens.position.set(0, sTop - NH / 2, MAC_SCREEN.z + 0.0055);
  lid.add(lens);

  // reflejo del vidrio sobre la pantalla (arranca apagado)
  const glassT = opts.glassT ?? glassTexture();
  const refl = new THREE.Mesh(macScreenGeo(), additive(glassT));
  refl.position.set(0, MAC_SCREEN.y, MAC_SCREEN.z + 0.003);
  lid.add(refl);
  // resplandor de la pantalla: detrás de la tapa y sobre el teclado (arrancan apagados)
  const haloT = opts.haloT ?? haloTexture();
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(7.5, 5), additive(haloT));
  halo.position.set(0, MAC_SCREEN.y, -0.3);
  lid.add(halo);
  const kGlow = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 1.2), additive(haloT));
  kGlow.rotation.x = -Math.PI / 2;
  kGlow.position.set(0, BT + 0.003, -0.5);
  nb.add(kGlow);

  return {
    group: nb,
    lid,
    alu,
    logo,
    refl: refl as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>,
    halo: halo as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>,
    kGlow: kGlow as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>,
    glassT,
    haloT,
  };
}

/**
 * Captura de escritorio compuesta como en una Mac real: barra de menús negra a la altura del
 * notch + barra del navegador con la dirección + la página. Las capturas son 16:9 y la pantalla
 * es casi 16:10: la página se recorta apenas a los costados en lugar de estirarse.
 * done(ok) avisa cuando terminó (o falló) la carga.
 */
export function macScreenTexture(src: string, label: string, W: number, maxAniso: number, done?: (ok: boolean) => void) {
  const H = Math.round((W * sH) / sW);
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const t = tuneScreen(new THREE.CanvasTexture(c), maxAniso);
  const img = new Image();
  img.decoding = "async";
  img.onload = () => {
    const x = c.getContext("2d")!;
    const mb = Math.round((H * NH) / sH),
      tb = Math.round(H * 0.043),
      y0 = mb + tb;
    x.fillStyle = "#000";
    x.fillRect(0, 0, W, mb);
    x.fillStyle = "#1c1c1f";
    x.fillRect(0, mb, W, tb);
    x.fillStyle = "rgba(255,255,255,.08)";
    x.fillRect(0, y0 - 1, W, 1);
    ["#ff5f57", "#febc2e", "#28c840"].forEach((col, i) => {
      x.fillStyle = col;
      x.beginPath();
      x.arc(tb * 0.62 + i * tb * 0.5, mb + tb / 2, tb * 0.15, 0, Math.PI * 2);
      x.fill();
    });
    const pw = W * 0.3,
      phh = tb * 0.6;
    x.fillStyle = "#2b2b30";
    x.beginPath();
    x.roundRect((W - pw) / 2, mb + (tb - phh) / 2, pw, phh, phh / 2);
    x.fill();
    x.fillStyle = "rgba(255,255,255,.72)";
    x.font = `500 ${Math.round(tb * 0.3)}px -apple-system, "Helvetica Neue", Arial, sans-serif`;
    x.textAlign = "center";
    x.textBaseline = "middle";
    x.fillText(label, W / 2, mb + tb / 2 + 1);
    const s = Math.max(W / img.width, (H - y0) / img.height),
      dw = img.width * s;
    x.drawImage(img, (W - dw) / 2, y0, dw, img.height * s);
    t.needsUpdate = true;
    done?.(true);
  };
  img.onerror = () => done?.(false);
  img.src = src;
  return t;
}

/* ---------- iPhone 15 Pro ---------- */
const { w: PW, h: PHh, t: PT } = PHONE;
const pSW = mm(66.4),
  pSH = mm(142.2);
/** Medidas de la pantalla del celular (centrada en el grupo; z = cara del vidrio). */
export const PHONE_SCREEN = { w: pSW, h: pSH, z: PT / 2 + 0.0015 };
export const phoneScreenGeo = () => rrGeo(pSW, pSH, mm(9.2), 16);

/**
 * Arma el celular: titanio natural, vidrio frontal, Dynamic Island, dorso esmerilado y cámaras,
 * botones, reflejo del vidrio (refl), brillo que lo cruza (sheen), resplandor y luz de pantalla
 * (los dos últimos arrancan apagados). Las pantallas las agrega quien lo usa con phoneScreenGeo().
 */
export function buildIPhone(opts: { glassT?: THREE.Texture; haloT?: THREE.Texture } = {}) {
  const ph = new THREE.Group();
  const tiM = new THREE.MeshPhysicalMaterial({
    color: 0x9d988f,
    roughness: 0.32,
    metalness: 1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.35,
    envMapIntensity: 1.2,
  });
  ph.add(new THREE.Mesh(slab(PW, PHh, PT, mm(11.5), mm(1.5), 6), tiM));
  // vidrio propio, algo más satinado: al girar, el reflejo es un brillo amplio y no un punto duro
  const phGlassM = glassMaterial();
  phGlassM.roughness = 0.3;
  phGlassM.clearcoatRoughness = 0.32;
  const phG = new THREE.Mesh(rrGeo(PW - mm(1.4), PHh - mm(1.4), mm(10.4), 16), phGlassM);
  phG.position.z = PT / 2 + 0.0005;
  ph.add(phG);
  const isl = new THREE.Mesh(pill(mm(20.5), mm(6.2)), new THREE.MeshBasicMaterial({ color: 0 }));
  isl.position.set(0, pSH / 2 - mm(5.5), PT / 2 + 0.004);
  isl.renderOrder = 10;
  ph.add(isl);
  // dorso de vidrio esmerilado con el módulo de cámaras (arriba a la izquierda, visto de atrás)
  const backM = new THREE.MeshPhysicalMaterial({ color: 0x8f8a82, roughness: 0.62, metalness: 0.1, clearcoat: 0.4, clearcoatRoughness: 0.7 });
  const back = new THREE.Mesh(rrGeo(PW - mm(1.4), PHh - mm(1.4), mm(10.4), 16), backM);
  back.rotation.y = Math.PI;
  back.position.z = -PT / 2 - 0.0005;
  ph.add(back);
  const camMod = new THREE.Group();
  camMod.position.set(PW / 2 - mm(21.6), PHh / 2 - mm(22.1), -PT / 2);
  ph.add(camMod);
  const plat = new THREE.Mesh(slab(mm(36), mm(37), mm(1.4), mm(7), mm(0.5), 3, 12), new THREE.MeshPhysicalMaterial({ color: 0x8f8a82, roughness: 0.25, metalness: 0.1, clearcoat: 1 }));
  plat.position.z = -mm(0.7);
  camMod.add(plat);
  const lensGlass = new THREE.MeshPhysicalMaterial({ color: 0x05060a, roughness: 0.05, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.02 });
  const lensCore = new THREE.MeshPhysicalMaterial({ color: 0x141b33, roughness: 0.1, metalness: 0.4, clearcoat: 1 });
  const ringG = new THREE.CylinderGeometry(mm(7), mm(7), mm(1.8), 40);
  [
    [-8.6, 8.6],
    [-8.6, -8.6],
    [8.6, 0],
  ].forEach(([u, v]) => {
    const ring = new THREE.Mesh(ringG, tiM);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(-mm(u), mm(v), -mm(2.3));
    camMod.add(ring);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(mm(5.6), 40), lensGlass);
    disc.rotation.y = Math.PI;
    disc.position.set(-mm(u), mm(v), -mm(3.2) - 0.0003);
    camMod.add(disc);
    const core = new THREE.Mesh(new THREE.CircleGeometry(mm(2.6), 32), lensCore);
    core.rotation.y = Math.PI;
    core.position.set(-mm(u), mm(v), -mm(3.2) - 0.0006);
    camMod.add(core);
  });
  [
    [8.6, 9.4, 0xe8e2cf],
    [8.6, -9.4, 0x0a0a0c],
  ].forEach(([u, v, col]) => {
    const d = new THREE.Mesh(new THREE.CircleGeometry(mm(2.8), 24), new THREE.MeshStandardMaterial({ color: col, roughness: 0.35 }));
    d.rotation.y = Math.PI;
    d.position.set(-mm(u), mm(v), -mm(1.4) - 0.0004);
    camMod.add(d);
  });
  // botón de acción y volumen a la izquierda, botón lateral a la derecha
  const btn = (side: number, yc: number, len: number) => {
    const b = new THREE.Mesh(new RoundedBoxGeometry(mm(1.4), len, mm(3), 3, mm(0.6)), tiM);
    b.position.set(side * (PW / 2 + mm(0.2)), yc, 0);
    ph.add(b);
  };
  btn(-1, PHh / 2 - mm(32), mm(7.6));
  btn(-1, PHh / 2 - mm(47), mm(10));
  btn(-1, PHh / 2 - mm(60), mm(10));
  btn(1, PHh / 2 - mm(53), mm(17));

  // reflejo del vidrio sobre la pantalla
  const glassT = opts.glassT ?? glassTexture();
  const refl = new THREE.Mesh(phoneScreenGeo(), additive(glassT, 0.18));
  refl.position.z = PT / 2 + 0.0025;
  ph.add(refl);
  // brillo diagonal que cruza el vidrio (se desliza moviendo sheenT.offset.x)
  const sheenT = canvasTex(
    512,
    64,
    (x) => {
      const g = x.createLinearGradient(0, 0, 512, 0);
      g.addColorStop(0.36, "rgba(255,255,255,0)");
      g.addColorStop(0.5, "rgba(255,255,255,.5)");
      g.addColorStop(0.64, "rgba(255,255,255,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, 512, 64);
    },
    false,
  );
  sheenT.repeat.set(0.5, 1);
  sheenT.rotation = -0.5;
  const sheen = new THREE.Mesh(phoneScreenGeo(), additive(sheenT));
  sheen.position.z = PT / 2 + 0.003;
  ph.add(sheen);
  // resplandor suave detrás del celular y luz de la pantalla (ilumina lo que tenga cerca)
  const haloT = opts.haloT ?? haloTexture();
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 3.2), additive(haloT));
  halo.position.z = -0.12;
  ph.add(halo);
  const light = new THREE.PointLight(0xbfd0ff, 0, 2.4, 2);
  light.position.z = 0.4;
  ph.add(light);

  return {
    group: ph,
    refl: refl as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>,
    sheen: sheen as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>,
    sheenT,
    halo: halo as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>,
    light,
  };
}
