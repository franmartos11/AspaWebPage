// Escena "room" (Interiorismo: el ambiente se amuebla), portada del diseño (script8): se dibuja
// la planta, suben las paredes, aparecen ventana, cortinas y el rayo de luz, y los muebles entran
// uno por uno hasta que se prenden las lámparas. Se arma cuando la escena está en pantalla y se
// desarma (al doble de velocidad) si subís y queda abajo.
import { THREE, mat, stage, box, lineSet, contactShadow, interact, want, clamp, lerp, easeOut, easeBack, seg } from "./kit";

/** Alfombra: rectángulos concéntricos sobre canvas. */
function rugMat() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const x = c.getContext("2d")!;
  x.fillStyle = "#e2ddd3";
  x.fillRect(0, 0, 256, 256);
  x.strokeStyle = "#c9c2b5";
  x.lineWidth = 6;
  for (let k = 12; k < 128; k += 22) x.strokeRect(k, k, 256 - 2 * k, 256 - 2 * k);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshStandardMaterial({ map: t, roughness: 1 });
}

export function mount(el: HTMLElement): () => void {
  const { S, run, dispose } = stage(el, 30, [9.2, 7, 10.2], [0, 1.1, 0]);
  const { scene, g } = S;
  const W = mat.white(),
    Wd = mat.wood(),
    D = mat.dark();
  const linen = new THREE.MeshStandardMaterial({ color: 0xe9e3d8, roughness: 0.95 }),
    sage = new THREE.MeshStandardMaterial({ color: 0x9fb39a, roughness: 0.85 }),
    terra = new THREE.MeshStandardMaterial({ color: 0xc08a64, roughness: 0.8 }),
    stone = new THREE.MeshStandardMaterial({ color: 0xd4d0c8, roughness: 0.6 });
  g.add(box(6, 0.1, 5, Wd, 0, -0.05, 0));
  // planta: muros, alfombra, mesa, sillón y aberturas
  const plan = lineSet(
    [
      [-3, -2.5, 3, -2.5],
      [-3, -2.5, -3, 2.5],
      [-1.5, -1.3, 1.5, -1.3],
      [1.5, -1.3, 1.5, 0.4],
      [1.5, 0.4, -1.5, 0.4],
      [-1.5, 0.4, -1.5, -1.3],
      [-0.6, 1, 0.6, 1],
      [0.6, 1, 0.6, 1.9],
      [0.6, 1.9, -0.6, 1.9],
      [-0.6, 1.9, -0.6, 1],
      [2, -2.2, 2.8, -2.2],
      [2.8, -2.2, 2.8, -0.6],
      [2.8, -0.6, 2, -0.6],
      [2, -0.6, 2, -2.2],
      [-2.95, -2.2, -2.6, -2.2],
      [-2.95, 2, -2.6, 2],
    ],
    0.01,
  );
  const planM = plan.material as THREE.LineBasicMaterial;
  g.add(plan);
  const wb = box(6, 2.7, 0.12, W, 0, 0, -2.56, true),
    wl = box(0.12, 2.7, 5, W, -3.06, 0, 0, true);
  [wb, wl].forEach((o) => {
    o.scale.y = 0.001;
    g.add(o);
  });
  const skirting = [box(6, 0.08, 0.02, D, 0, 0, -2.49, true), box(0.02, 0.08, 5, D, -2.99, 0, 0, true)];
  skirting.forEach((o) => {
    o.visible = false;
    g.add(o);
  });
  // ventana con marco, cortinas y rayo de luz
  const win = new THREE.Group();
  win.add(
    box(2, 1.6, 0.04, mat.glass(), 0, 0, 0, true),
    box(2.1, 0.06, 0.08, D, 0, 1.6, 0, true),
    box(2.1, 0.06, 0.08, D, 0, 0, 0, true),
    box(0.06, 1.6, 0.08, D, -1.02, 0, 0, true),
    box(0.06, 1.6, 0.08, D, 1.02, 0, 0, true),
    box(0.04, 1.6, 0.06, D, 0, 0, 0, true),
  );
  win.position.set(0.4, 0.75, -2.48);
  win.visible = false;
  g.add(win);
  const curt = [-0.9, 1.7].map((x) => {
    const c = box(0.35, 2.2, 0.05, linen, x, 0.3, -2.38, true);
    c.scale.y = 0.001;
    g.add(c);
    return c;
  });
  const beamM = new THREE.MeshBasicMaterial({
    color: 0xfff2d8,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  const beam = new THREE.Mesh(new THREE.PlaneGeometry(2, 3.4), beamM);
  beam.position.set(0.4, 0.9, -1);
  beam.rotation.x = -1.05;
  g.add(beam);
  // cuadros
  const art = (
    [
      [-3, 1.35, 0.2, 0.9, 0.65, mat.blue()],
      [-3, 1.25, 1.3, 0.5, 0.7, terra],
    ] as const
  ).map(([x, y, z, w, h, m]) => {
    const a = new THREE.Group();
    a.add(box(0.04, h + 0.06, w + 0.06, D, 0, 0, 0, true), box(0.05, h, w, m, 0.01, 0.03, 0, true));
    a.position.set(x + 0.04, y, z);
    a.visible = false;
    g.add(a);
    return a;
  });
  // muebles: cada uno entra (escala con rebote) en su momento `d`
  const items: { o: THREE.Object3D; d: number }[] = [];
  const it = (o: THREE.Object3D, d: number) => {
    o.scale.setScalar(0.001);
    g.add(o);
    items.push({ o, d });
  };
  it(box(3.4, 0.02, 2.2, rugMat(), 0, 0, -0.45, true), 1.5);
  const sofa = new THREE.Group();
  sofa.add(
    box(2.8, 0.36, 0.95, linen, 0, 0.08, 0, true),
    box(2.8, 0.55, 0.24, linen, 0, 0.08, -0.36, true),
    box(0.22, 0.48, 0.95, linen, -1.29, 0.08, 0, true),
    box(0.22, 0.48, 0.95, linen, 1.29, 0.08, 0, true),
  );
  [-0.7, 0, 0.7].forEach((x) => sofa.add(box(0.62, 0.12, 0.66, linen, x, 0.44, 0.05, true)));
  (
    [
      [-0.85, sage],
      [0.85, terra],
    ] as const
  ).forEach(([x, m]) => {
    const c = box(0.4, 0.38, 0.12, m, x, 0.5, -0.2, true);
    c.rotation.x = -0.2;
    sofa.add(c);
  });
  [
    [-1.25, -0.35],
    [1.25, -0.35],
    [-1.25, 0.35],
    [1.25, 0.35],
  ].forEach(([x, z]) => sofa.add(box(0.05, 0.08, 0.05, D, x, 0, z, true)));
  sofa.position.set(0, 0, -1.75);
  it(sofa, 1.7);
  // mesa ratona con florero y libros
  const table = new THREE.Group();
  table.add(new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.05, 40).translate(0, 0.38, 0), stone));
  table.add(new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.36, 24).translate(0, 0.18, 0), D));
  table.add(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.22, 16).translate(0, 0.52, 0), terra));
  [0, 1, 2].forEach((k) => {
    const bk = box(0.28, 0.03, 0.2, k === 1 ? mat.blue() : W, 0.2, 0.42 + k * 0.03, -0.05);
    bk.rotation.y = k * 0.2;
    table.add(bk);
  });
  table.position.set(0, 0, -0.45);
  it(table, 1.9);
  const arm = new THREE.Group();
  arm.add(
    box(0.9, 0.34, 0.85, sage, 0, 0.1, 0, true),
    box(0.9, 0.55, 0.2, sage, 0, 0.1, -0.33, true),
    box(0.15, 0.42, 0.85, sage, -0.38, 0.1, 0, true),
    box(0.15, 0.42, 0.85, sage, 0.38, 0.1, 0, true),
  );
  arm.position.set(1.95, 0, -0.5);
  arm.rotation.y = -1.1;
  it(arm, 2.1);
  // lámpara de pie y colgante (comparten la pantalla que se prende)
  const lampM = new THREE.MeshStandardMaterial({ color: 0xf1ece2, emissive: 0xffd9a8, emissiveIntensity: 0, side: THREE.DoubleSide });
  const lamp = new THREE.Group();
  lamp.add(box(0.04, 1.6, 0.04, D, 0, 0, 0, true), box(0.35, 0.03, 0.35, D, 0, 0, 0, true));
  const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 0.32, 28, 1, true), lampM);
  shade.position.y = 1.7;
  lamp.add(shade);
  lamp.position.set(-2.3, 0, -1.9);
  it(lamp, 2.3);
  const pend = new THREE.Group();
  pend.add(box(0.01, 0.9, 0.01, D, 0, 1.8, 0, true));
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), lampM);
  bulb.rotation.x = Math.PI;
  bulb.position.y = 1.82;
  pend.add(bulb);
  pend.position.set(0, 0, -0.45);
  it(pend, 2.5);
  // biblioteca con objetos
  const shelf = new THREE.Group();
  [0, 0.55, 1.1, 1.65].forEach((y) => shelf.add(box(0.32, 0.04, 1.8, Wd, 0, y + 0.35, 0)));
  (
    [
      [0.5, -0.55, W],
      [0.5, -0.3, mat.blue()],
      [0.5, -0.1, terra],
      [1.05, 0.4, W],
      [1.05, 0.6, sage],
      [1.6, -0.4, terra],
      [1.6, 0.3, W],
    ] as const
  ).forEach(([y, z, m]) => shelf.add(box(0.22, 0.26, 0.16, m, 0, y, z, true)));
  shelf.position.set(-2.8, 0, 1.1);
  it(shelf, 2.7);
  const plant = new THREE.Group();
  plant.add(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.38, 20).translate(0, 0.19, 0), terra));
  for (let k = 0; k < 7; k++) {
    const lf = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), sage);
    lf.scale.set(1, 1.8, 0.4);
    lf.position.set(Math.cos(k) * 0.14, 0.62 + Math.sin(k * 1.7) * 0.12, Math.sin(k) * 0.14);
    lf.rotation.z = Math.cos(k) * 0.6;
    plant.add(lf);
  }
  plant.position.set(2.4, 0, 1.5);
  it(plant, 2.9);
  const sh = contactShadow(8, 7, 0.5);
  sh.position.y = -0.12;
  scene.add(sh);

  let t0 = -0.2;
  const spin = interact(S, 0.35);
  run((dt, t) => {
    const wv = want(el);
    t0 = clamp(t0 + dt * (wv > 0 ? 1 : wv < 0 ? -2 : 0), -0.2, 8);
    const e = t0;
    plan.geometry.setDrawRange(0, Math.floor(plan.userData.n * easeOut(seg(e, 0, 1.2))) & ~1);
    planM.opacity = lerp(1, 0, seg(e, 2.2, 0.6));
    [wb, wl].forEach((w, i) => (w.scale.y = Math.max(0.001, easeBack(seg(e, 0.8 + i * 0.15, 0.7)))));
    skirting.forEach((o) => (o.visible = e > 1.5));
    win.visible = e > 1.4;
    art.forEach((a, i) => (a.visible = e > 3 + i * 0.15));
    curt.forEach((c, i) => (c.scale.y = Math.max(0.001, easeOut(seg(e, 1.6 + i * 0.1, 0.6)))));
    beamM.opacity = seg(e, 1.8, 1) * 0.12 * (1 - seg(e, 3.6, 1) * 0.6);
    items.forEach(({ o, d }) => o.scale.setScalar(Math.max(0.001, easeBack(seg(e, d, 0.55)))));
    lampM.emissiveIntensity = seg(e, 3.4, 0.8) * 1.8;
    spin(t);
  });
  return dispose;
}
