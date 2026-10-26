// Escena "house" (Arquitectos: del plano a la casa), portada del diseño (script8): se dibuja el
// plano en el piso, crecen los volúmenes, bajan las losas, aparecen vidrios, pileta y árboles y al
// final se prende la luz cálida adentro. Se arma cuando la escena está en pantalla y se desarma
// (al doble de velocidad) si subís y queda abajo.
import { THREE, P, mat, stage, box, edges, lineSet, tree, contactShadow, interact, want, clamp, lerp, easeOut, easeBack, seg } from "./kit";

export function mount(el: HTMLElement): () => void {
  const { S, run, dispose } = stage(el, 30, [12, 9, 13.8], [0.3, 1.5, 0.3]);
  const { scene, g } = S;
  g.add(box(10, 0.1, 8, mat.ground(), 0, -0.05, 0));

  // plano: muros, pileta, vereda y cotas
  const plan: number[][] = [
    [-3, -1.5, 1, -1.5],
    [1, -1.5, 1, 1.5],
    [1, 1.5, -3, 1.5],
    [-3, 1.5, -3, -1.5],
    [1, -2.2, 3.3, -2.2],
    [3.3, -2.2, 3.3, 0.7],
    [3.3, 0.7, 1, 0.7],
    [-1, -1.5, -1, 0.3],
    [-3, 0, -1, 0],
    [2.1, -2.2, 2.1, -0.9],
    [-2.7, 2.3, 0.5, 2.3],
    [0.5, 2.3, 0.5, 3.3],
    [0.5, 3.3, -2.7, 3.3],
    [-2.7, 3.3, -2.7, 2.3],
    [-3, 4, 3.3, 4],
    [-3, 3.85, -3, 4.15],
    [3.3, 3.85, 3.3, 4.15],
    [4.1, -2.2, 4.1, 1.5],
    [3.95, -2.2, 4.25, -2.2],
    [3.95, 1.5, 4.25, 1.5],
  ];
  // barridos de puertas (cuartos de círculo)
  [
    [-1, 0.3, 0.8, 0, Math.PI / 2],
    [1, 1.5, 0.9, Math.PI, Math.PI * 1.5],
  ].forEach(([cx, cz, r, a0, a1]) => {
    for (let k = 0; k < 10; k++) {
      const a = a0 + ((a1 - a0) * k) / 10,
        b = a0 + ((a1 - a0) * (k + 1)) / 10;
      plan.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r, cx + Math.cos(b) * r, cz + Math.sin(b) * r]);
    }
  });
  const lines = lineSet(plan);
  const linesM = lines.material as THREE.LineBasicMaterial;
  g.add(lines);

  const W = mat.white(),
    D = mat.dark(),
    G = mat.glass(),
    Wd = mat.wood();
  // volúmenes: planta baja, ala lateral y el volumen alto que vuela
  const A = box(4, 2.4, 3, W, -1, 0, 0, true),
    B = box(2.3, 2.3, 2.9, W, 2.15, 0, -0.75, true),
    C = box(4.2, 1.7, 2.6, W, 0.9, 2.4, -0.6, true);
  [A, B, C].forEach((o) => {
    edges(o, 0x000000, 0.12);
    o.scale.y = 0.001;
    o.visible = false;
    g.add(o);
  });
  const slat = box(0.8, 1.5, 0.04, Wd, 2.58, 2.5, 0.72, true);
  slat.visible = false;
  g.add(slat);
  const rA = box(4.5, 0.14, 3.5, D, -1, 2.47, 0),
    rC = box(4.6, 0.14, 3, D, 0.9, 4.17, -0.6);
  [rA, rC].forEach((o) => {
    o.visible = false;
    g.add(o);
  });
  // paños vidriados con sus parantes
  const mullions = new Map<THREE.Mesh, THREE.Mesh[]>();
  const glasses = [
    [3.6, 2, 0.05, -1, 0.2, 1.53],
    [0.05, 1.6, 2.2, -3.03, 0.4, 0],
    [3.1, 1.2, 0.05, 0.5, 2.65, 0.72],
    [1.5, 1.7, 0.05, 2.15, 0.25, 0.74],
  ].map(([w, h, d, x, y, z]) => {
    const o = box(w, h, d, G, x, y, z, true);
    o.visible = false;
    g.add(o);
    const ms: THREE.Mesh[] = [];
    for (let i = 1; i < 4; i++) {
      const mu = box(0.03, h, 0.06, mat.frame(), x - w / 2 + (w * i) / 4, y, z, true);
      if (w < 0.1) mu.position.set(x, y, z - d / 2 + (2.2 * i) / 4 - 1.1);
      mu.visible = false;
      g.add(mu);
      ms.push(mu);
    }
    mullions.set(o, ms);
    return o;
  });
  const water = new THREE.MeshPhysicalMaterial({ color: P.blueL, roughness: 0.02, clearcoat: 1, transparent: true, opacity: 0.9 });
  const pool = box(3, 0.06, 0.85, water, -1.1, 0, 2.8, true);
  pool.scale.y = 0.001;
  g.add(pool);
  const deck = box(3.6, 0.04, 1.5, Wd, -1.1, 0, 2.8, true);
  deck.position.y = -0.01;
  deck.visible = false;
  g.add(deck);
  const trees = [
    [3.6, 2.4, 1.3],
    [-3.8, -1.9, 1.6],
    [3.9, -2.9, 1.1],
  ].map(([x, z, s]) => {
    const t = tree(x, z, s, mat.white());
    t.scale.setScalar(0.001);
    g.add(t);
    return t;
  });
  const lawnM = new THREE.MeshStandardMaterial({ color: 0x1d2621, roughness: 1, transparent: true, opacity: 0 });
  g.add(box(9.2, 0.02, 7.2, lawnM, 0, 0.005, 0, true));
  const stones = [0, 1, 2, 3, 4].map((i) => {
    const st = box(0.55, 0.03, 0.28, mat.white(), 1.6 + i * 0.05, 0, 1.2 + i * 0.55, true);
    st.visible = false;
    g.add(st);
    return st;
  });
  // luz cálida detrás de los vidrios y apliques de fachada
  const warm = new THREE.MeshStandardMaterial({ color: 0x2a2218, emissive: 0xffd9a8, emissiveIntensity: 0 });
  const glow = [
    [3.4, 1.8, -1, 0.1, 1.5],
    [3.1, 1.05, 0.4, 2.55, 0.68],
    [1.3, 1.5, 2.1, 0.15, 0.6],
  ].map(([w, h, x, y, z]) => {
    const o = box(w, h, 0.02, warm, x, y, z - 0.06, true);
    o.visible = false;
    g.add(o);
    return o;
  });
  const lampM = new THREE.MeshStandardMaterial({ color: 0x111, emissive: 0xffe2b8, emissiveIntensity: 0 });
  [
    [-2.5, 0.95, 1.56],
    [0.4, 0.95, 1.56],
    [2.95, 0.95, 0.68],
  ].forEach(([x, y, z]) => g.add(box(0.18, 0.05, 0.04, lampM, x, y, z)));
  const sh = contactShadow(11, 9, 0.5);
  sh.position.y = -0.12;
  scene.add(sh);

  let t0 = -0.2;
  const spin = interact(S, -0.12);
  run((dt, t) => {
    const wv = want(el);
    t0 = clamp(t0 + dt * (wv > 0 ? 1 : wv < 0 ? -2 : 0), -0.2, 8);
    const e = t0;
    lines.geometry.setDrawRange(0, Math.floor(lines.userData.n * easeOut(seg(e, 0, 1.8))) & ~1);
    linesM.opacity = lerp(1, 0.28, seg(e, 2.4, 0.8));
    (
      [
        [A, 1.6],
        [B, 1.85],
        [C, 2.6],
      ] as const
    ).forEach(([o, d]) => {
      const p = easeBack(seg(e, d, 0.8));
      o.visible = p > 0;
      o.scale.y = Math.max(0.001, p);
    });
    C.position.x = 0.9 + (1 - easeOut(seg(e, 2.6, 1))) * -1.6;
    const r = easeOut(seg(e, 2.4, 0.6));
    rA.visible = r > 0;
    rA.position.y = 2.47 + (1 - r) * 1.2;
    const r2 = easeOut(seg(e, 3.2, 0.6));
    rC.visible = r2 > 0;
    rC.position.y = 4.17 + (1 - r2) * 1.2;
    rC.position.x = C.position.x;
    slat.visible = e > 3.3;
    slat.scale.x = easeOut(seg(e, 3.3, 0.5));
    const pg = seg(e, 3.4, 0.6);
    G.opacity = 0.85 * pg;
    glasses.forEach((o) => {
      o.visible = pg > 0;
      mullions.get(o)!.forEach((m) => (m.visible = pg > 0.5));
    });
    deck.visible = e > 3.6;
    pool.scale.y = Math.max(0.001, easeOut(seg(e, 3.8, 0.6)));
    trees.forEach((tr, i) => tr.scale.setScalar(Math.max(0.001, easeBack(seg(e, 4 + i * 0.15, 0.6)))));
    lawnM.opacity = seg(e, 0.2, 1) * 0.9;
    stones.forEach((st, i) => (st.visible = e > 3.9 + i * 0.08));
    const li = seg(e, 4.5, 1);
    warm.emissiveIntensity = li * 0.9;
    glow.forEach((o) => (o.visible = li > 0));
    lampM.emissiveIntensity = li * 2.2;
    spin(t);
  });
  return dispose;
}
