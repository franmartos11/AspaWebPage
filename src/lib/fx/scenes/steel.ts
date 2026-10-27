// Escena "steel" de la maqueta Trama (steel framing), portada del diseño (script8): la casa pasa de
// la estructura de perfiles a terminada según el avance (0..1) que maneja el deslizador: perfiles →
// lana → OSB → terminación → techo → aberturas, jardín, deck y luz. Al costado, el corte del muro
// con sus capas y nombres. La primera vez que se ve, si nadie tocó el control, hace el recorrido solo.
// Los controles (deslizador, pasos y etiqueta) los cablea ../trama.ts: acá solo se lee y avisa el avance.
import { pageLang } from "../core";
import { THREE, mat, stage, box, tree, contactShadow, interact, seen, lerp, easeBack, seg, cssFont } from "./kit";

/** Puente con los controles de la maqueta (vive en trama.ts, sin Three.js). */
export type TramaCtl = {
  /** avance pedido por el deslizador o los pasos (0..1) */
  target: number;
  /** alguien tocó el control: se corta el recorrido automático */
  touched: boolean;
  /** avance animado de la escena, para la etiqueta y el paso activo */
  show(v: number): void;
  /** recorrido automático: mueve el objetivo y el deslizador (si nadie lo tocó) */
  auto(v: number): void;
};

const ez = (x: number) => 1 - Math.pow(1 - x, 3);
// como el power1.inOut de GSAP que usaba el diseño
const inOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

export function mount(el: HTMLElement, ctl: TramaCtl): () => void {
  const { S, run, dispose } = stage(el, 32, [11.4, 7.2, 13.2], [0.2, 1.4, 0]);
  const { scene, camera, g, renderer } = S;
  const Lx = 6,
    D = 4,
    H = 2.6,
    rise = 1.3,
    half = D / 2,
    len = Math.hypot(half, rise),
    ang = Math.atan2(rise, half);

  // materiales: acero galvanizado, OSB, terminación con buñas, chapa y lana de vidrio
  const steelM = new THREE.MeshPhysicalMaterial({ color: 0xc9ced4, roughness: 0.28, metalness: 0.9, clearcoat: 0.3 });
  const osbTex = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const x = c.getContext("2d")!;
    x.fillStyle = "#c79a63";
    x.fillRect(0, 0, 256, 256);
    for (let k = 0; k < 420; k++) {
      x.fillStyle = `rgba(${(120 + Math.random() * 80) | 0},${(80 + Math.random() * 50) | 0},${(40 + Math.random() * 30) | 0},.55)`;
      x.save();
      x.translate(Math.random() * 256, Math.random() * 256);
      x.rotate(Math.random() * 3);
      x.fillRect(-14, -3, 28, 6);
      x.restore();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const osbM = new THREE.MeshStandardMaterial({ map: osbTex, roughness: 0.85, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
  const finM = new THREE.MeshPhysicalMaterial({
    color: 0xf3f2ee,
    roughness: 0.75,
    clearcoat: 0.15,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  finM.map = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const x = c.getContext("2d")!;
    x.fillStyle = "#ffffff";
    x.fillRect(0, 0, 256, 256);
    for (let k = 0; k < 4; k++) {
      const gx = k * 64;
      const gr = x.createLinearGradient(gx, 0, gx + 10, 0);
      gr.addColorStop(0, "#d9d8d2");
      gr.addColorStop(0.5, "#f7f6f2");
      gr.addColorStop(1, "#ffffff");
      x.fillStyle = gr;
      x.fillRect(gx, 0, 10, 256);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  })();
  const roofM = new THREE.MeshPhysicalMaterial({ color: 0x26282c, roughness: 0.45, metalness: 0.6, clearcoat: 0.4 });
  const woolM = new THREE.MeshStandardMaterial({ color: 0xf2d24b, roughness: 1 });
  g.add(box(Lx + 0.4, 0.16, D + 0.4, mat.conc(), 0, 0, 0, true));
  const B = (w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number) => {
    const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    o.position.set(x, y, z);
    g.add(o);
    return o;
  };

  // estructura: soleras, montantes cada 60 cm y cabriadas
  const prof: THREE.Mesh[] = [],
    s2 = 0.05,
    y0 = 0.16;
  for (const z of [-D / 2, D / 2]) {
    prof.push(B(Lx, s2, 0.09, steelM, 0, y0 + s2 / 2, z), B(Lx, s2, 0.09, steelM, 0, y0 + H, z));
    for (let x = -Lx / 2; x <= Lx / 2 + 0.01; x += 0.6) prof.push(B(s2, H, 0.09, steelM, x, y0 + H / 2, z));
  }
  for (const x of [-Lx / 2, Lx / 2]) {
    prof.push(B(0.09, s2, D, steelM, x, y0 + s2 / 2, 0), B(0.09, s2, D, steelM, x, y0 + H, 0));
    for (let z = -D / 2; z <= D / 2 + 0.01; z += 0.6) prof.push(B(0.09, H, s2, steelM, x, y0 + H / 2, z));
  }
  for (let x = -Lx / 2; x <= Lx / 2 + 0.01; x += 0.6) {
    const a = B(0.06, s2, len, steelM, x, y0 + H + rise / 2, -half / 2);
    a.rotation.x = -ang;
    const b = B(0.06, s2, len, steelM, x, y0 + H + rise / 2, half / 2);
    b.rotation.x = ang;
    prof.push(a, b, B(0.06, s2, D, steelM, x, y0 + H, 0), B(0.06, rise, s2, steelM, x, y0 + H + rise / 2, 0));
  }
  prof.forEach((p, k) => (p.userData.k = k / prof.length));

  // capas por paño: lana, OSB y terminación
  type Bay = { wool: THREE.Mesh; osb: THREE.Mesh; fin: THREE.Mesh; k: number };
  const bays: Bay[] = [];
  const addBay = (cx: number, cz: number, w: number, ry: number) => {
    const mk = (m: THREE.Material, dz: number, th: number) => {
      const o = B(w * 0.995, H * 0.985, th, m, cx + Math.sin(ry) * dz, y0 + H / 2, cz + Math.cos(ry) * dz);
      o.rotation.y = ry;
      o.visible = false;
      return o;
    };
    bays.push({ wool: mk(woolM, 0, 0.06), osb: mk(osbM, 0.075, 0.018), fin: mk(finM, 0.115, 0.026), k: 0 });
  };
  for (let x = -Lx / 2 + 0.3; x < Lx / 2; x += 0.6) {
    addBay(x, D / 2, 0.6, 0);
    addBay(x, -D / 2, 0.6, Math.PI);
  }
  for (let z = -D / 2 + 0.3; z < D / 2; z += 0.6) {
    addBay(Lx / 2, z, 0.6, Math.PI / 2);
    addBay(-Lx / 2, z, 0.6, -Math.PI / 2);
  }
  bays.forEach((b, k) => (b.k = k / bays.length));

  // hastiales, chapas del techo, cumbrera y canaletas
  const gs = new THREE.Shape();
  gs.moveTo(-half, 0);
  gs.lineTo(half, 0);
  gs.lineTo(0, rise);
  gs.lineTo(-half, 0);
  const gables = [Lx / 2 + 0.115, -Lx / 2 - 0.145].map((x) => {
    const m = new THREE.Mesh(new THREE.ExtrudeGeometry(gs, { depth: 0.03, bevelEnabled: false }), finM);
    m.rotation.y = Math.PI / 2;
    m.position.set(x, y0 + H, 0);
    m.visible = false;
    g.add(m);
    return m;
  });
  const roofs = [-1, 1].flatMap((sg) => {
    const r = new THREE.Group();
    r.position.set(0, y0 + H + rise + 0.035, 0);
    r.rotation.x = sg * ang;
    g.add(r);
    const sheets: THREE.Mesh[] = [];
    const RW = Lx + 0.5,
      n = 10,
      sw = RW / n,
      L = len + 0.36;
    for (let k = 0; k < n; k++) {
      const sh = box(sw, 0.035, L, roofM, -RW / 2 + sw * (k + 0.5), 0, (sg * L) / 2);
      sh.add(box(0.022, 0.035, L, roofM, sw / 2, 0.03, 0));
      r.add(sh);
      sh.visible = false;
      sheets.push(sh);
    }
    return sheets;
  });
  const ridge = box(
    Lx + 0.55,
    0.07,
    0.34,
    new THREE.MeshStandardMaterial({ color: 0x2c2e33, roughness: 0.7, metalness: 0.3 }),
    0,
    y0 + H + rise + 0.07,
    0,
  );
  ridge.visible = false;
  g.add(ridge);
  const gutterM = new THREE.MeshPhysicalMaterial({ color: 0xd9dde2, metalness: 0.7, roughness: 0.3 });
  const gutters = [-1, 1].map((sg) => {
    const gt = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, Lx + 0.7, 12), gutterM);
    gt.rotation.z = Math.PI / 2;
    gt.position.set(0, y0 + H + 0.02, sg * (half + 0.32));
    gt.visible = false;
    g.add(gt);
    return gt;
  });

  // aberturas: dos ventanas con marco, alféizar y parante, y la puerta de madera
  const glassM = mat.glass();
  const wins = [
    [1.9, 1.5, -1.55, 1.25],
    [1.2, 1.1, 1.75, 1.45],
  ].flatMap(([w, h, x, y]) => {
    const fr = box(w + 0.1, h + 0.1, 0.06, mat.frame(), x, y0 + y, D / 2 + 0.14);
    const gl = box(w, h, 0.04, glassM, x, y0 + y, D / 2 + 0.16);
    fr.add(box(w + 0.24, 0.05, 0.16, mat.conc(), 0, -h / 2 - 0.07, 0.06));
    fr.add(box(0.03, h, 0.03, mat.frame(), 0, 0, 0.03));
    fr.visible = gl.visible = false;
    g.add(fr, gl);
    return [fr, gl];
  });
  const door = box(0.9, 2, 0.06, mat.wood(), 0.42, y0 + 1, D / 2 + 0.15);
  door.add(box(0.04, 0.22, 0.05, mat.frame(), 0.33, 0, 0.05));
  door.add(box(1.02, 0.06, 0.1, mat.frame(), 0, 1.02, 0));
  door.visible = false;
  g.add(door);

  // entorno y casa corrida a la izquierda para dejar lugar al corte del muro
  g.children.forEach((c) => (c.position.x -= 1.6));
  g.add(box(13, 0.06, 8, mat.ground(), 0, -0.06, 0));
  const grassT = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const x = c.getContext("2d")!;
    x.fillStyle = "#2a3a2f";
    x.fillRect(0, 0, 256, 256);
    for (let k = 0; k < 5000; k++) {
      const v = 30 + Math.random() * 40;
      x.fillStyle = `rgba(${v},${v + 30},${v + 8},${0.18 + Math.random() * 0.25})`;
      x.fillRect(Math.random() * 256, Math.random() * 256, 1.4, 1.4 + Math.random() * 2);
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 4);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const lawnM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: grassT, roughness: 1, transparent: true, opacity: 0 });
  const lawn = box(12.6, 0.02, 7.6, lawnM, 0, -0.02, 0, true);
  g.add(lawn);
  const deck = box(2.6, 0.05, 1.2, mat.wood(), -1.6, 0, D / 2 + 0.9, true);
  deck.visible = false;
  g.add(deck);
  const trees = [
    [-5.3, -2.6, 1.2],
    [-5.2, 2.4, 1],
    [1.9, -3.1, 1.1],
  ].map(([x, z, sc]) => {
    const t = tree(x, z, sc, mat.white());
    t.scale.setScalar(0.001);
    g.add(t);
    return t;
  });
  const glowM = new THREE.MeshStandardMaterial({ color: 0x221c14, emissive: 0xffd9a8, emissiveIntensity: 0 });
  const glow = box(Lx - 0.4, H - 0.3, 0.02, glowM, -1.25, y0 + 0.1, D / 2 - 0.05, true);
  glow.visible = false;
  g.add(glow);

  // corte del muro: las capas separadas, con su nombre
  const cut = new THREE.Group();
  cut.position.set(4.9, y0, 1.9);
  cut.rotation.y = 0.7;
  g.add(cut);
  const font = cssFont();
  const lbl = (t: string) => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 192;
    const x = c.getContext("2d")!;
    x.fillStyle = "rgba(11,11,12,.86)";
    x.beginPath();
    x.roundRect(8, 8, 1008, 176, 88);
    x.fill();
    x.strokeStyle = "rgba(255,255,255,.22)";
    x.lineWidth = 3;
    x.stroke();
    x.fillStyle = "#fff";
    x.font = `600 82px ${font}`;
    x.textBaseline = "middle";
    x.fillText(t, 58, 100);
    const tx = new THREE.CanvasTexture(c);
    tx.colorSpace = THREE.SRGBColorSpace;
    tx.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tx, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }));
    sp.scale.set(1.3, 0.24, 1);
    return sp;
  };
  const studs = new THREE.Group();
  [-0.5, 0, 0.5].forEach((x) => studs.add(box(0.05, 1.7, 0.09, steelM, x, 0, 0, true)));
  studs.add(box(1.2, 0.05, 0.09, steelM, 0, 0, 0, true), box(1.2, 0.05, 0.09, steelM, 0, 1.65, 0, true));
  const memM = new THREE.MeshStandardMaterial({ color: 0xdfe6ff, roughness: 0.6 });
  const L =
    pageLang() === "en"
      ? ["Steel stud", "Thermal insulation", "OSB sheathing", "Water and wind barrier", "Exterior finish"]
      : ["Perfil de acero", "Aislación térmica", "Placa OSB", "Barrera de agua y viento", "Terminación exterior"];
  const layers: [THREE.Object3D, string, number][] = [
    [studs, L[0], 0],
    [box(1.1, 1.6, 0.07, woolM, 0, 0.05, 0, true), L[1], 0.2],
    [box(1.2, 1.7, 0.025, osbM, 0, 0, 0, true), L[2], 0.38],
    [box(1.2, 1.7, 0.008, memM, 0, 0, 0, true), L[3], 0.55],
    [box(1.2, 1.7, 0.035, finM, 0, 0, 0, true), L[4], 0.6],
  ];
  const cutParts = layers.map(([o, t, at], k) => {
    const sp = lbl(t);
    sp.position.set(1.4, 0.15 + k * 0.36, 0);
    const grp = new THREE.Group();
    grp.add(o, sp);
    grp.visible = false;
    cut.add(grp);
    return { grp, o, sp, at, k };
  });

  const sh = contactShadow(9, 6, 0.5);
  sh.position.set(-1.6, 0.006, 0);
  sh.renderOrder = 2;
  g.add(sh);

  // sombras reales suaves del sol sobre el terreno y la casa
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const sun = scene.children.find((o): o is THREE.DirectionalLight => o instanceof THREE.DirectionalLight && o.intensity > 1);
  if (sun) {
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = sun.shadow.camera;
    sc.left = -9;
    sc.right = 9;
    sc.top = 9;
    sc.bottom = -9;
    sc.near = 1;
    sc.far = 45;
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.03;
    sun.shadow.radius = 4;
    sun.position.set(6, 11, 7);
    sun.color.set(0xfff0dc);
    sun.intensity = 1.5;
  }
  scene.children.forEach((o) => {
    if (!(o instanceof THREE.HemisphereLight)) return;
    o.color.set(0xdfe8ff);
    o.groundColor.set(0x1a2016);
    o.intensity = 0.55;
  });
  g.traverse((o) => {
    if (o instanceof THREE.Mesh && o !== sh) o.castShadow = o.receiveShadow = true;
  });
  lawn.castShadow = false;

  let v = 0,
    autoAt = -1;
  const spin = interact(S, -0.2);
  run((dt, t) => {
    // recorrido automático la primera vez que se ve (medio segundo de espera y 5 s de ida)
    if (!ctl.touched) {
      if (autoAt < 0 && seen(el)) autoAt = t;
      if (autoAt >= 0) ctl.auto(inOut(seg(t, autoAt + 0.5, 5)));
    }
    v += (ctl.target - v) * Math.min(1, dt * 6);
    // 0–.2 estructura · .2–.4 lana · .35–.6 OSB · .55–.8 terminación · .7–.9 techo · .85–1 aberturas
    prof.forEach((p) => {
      const q = ez(seg(v * 5, p.userData.k * 0.8, 0.2));
      p.scale.y = Math.max(0.001, q);
      p.visible = q > 0.001;
    });
    bays.forEach((b) => {
      const qw = seg(v, 0.2 + b.k * 0.15, 0.05),
        qo = seg(v, 0.36 + b.k * 0.2, 0.05),
        qf = seg(v, 0.56 + b.k * 0.2, 0.05);
      b.wool.visible = qw > 0 && qf < 1;
      b.wool.scale.set(1, Math.max(0.001, ez(qw)), 1);
      b.osb.visible = qo > 0 && qf < 1;
      b.osb.position.y = y0 + H / 2 + (1 - ez(qo)) * 1.4;
      b.fin.visible = qf > 0;
      b.fin.scale.set(Math.max(0.001, ez(qf)), 1, 1);
    });
    gables.forEach((gm) => (gm.visible = v > 0.62));
    roofs.forEach((r, k) => {
      const q = seg(v, 0.7 + (k / roofs.length) * 0.15, 0.06);
      r.visible = q > 0;
      r.position.y = (1 - ez(q)) * 1.2;
    });
    const qa = seg(v, 0.86, 0.1);
    wins.forEach((o) => {
      o.visible = qa > 0;
      o.scale.setScalar(Math.max(0.001, easeBack(qa)));
    });
    door.visible = qa > 0;
    door.scale.y = Math.max(0.001, ez(qa));
    ridge.visible = v > 0.86;
    gutters.forEach((gt) => (gt.visible = v > 0.88));
    // la cámara gira un poco y sube a medida que la casa se completa
    const a = lerp(0.5, 0.9, ez(v)),
      hgt = lerp(7.2, 7.8, v);
    camera.position.set(Math.sin(a) * 19, hgt, Math.cos(a) * 19);
    camera.lookAt(0.6, 1.2, 0.3);
    lawnM.opacity = seg(v, 0, 0.15) * 0.95;
    deck.visible = v > 0.9;
    glowM.emissiveIntensity = seg(v, 0.92, 0.08) * 0.9;
    glow.visible = v > 0.92;
    trees.forEach((tr, q) => tr.scale.setScalar(Math.max(0.001, easeBack(seg(v, 0.88 + q * 0.03, 0.08)))));
    cutParts.forEach((p) => {
      const q = seg(v, p.at, 0.08);
      p.grp.visible = q > 0;
      p.grp.position.z = p.k * 0.34 + (1 - ez(q)) * 0.8;
      p.grp.position.x = -p.k * 0.06;
      p.o.scale.setScalar(Math.max(0.001, ez(q)));
      p.sp.material.opacity = q;
    });
    ctl.show(v);
    spin(t);
  });
  return () => {
    sun?.shadow.dispose();
    dispose();
  };
}
