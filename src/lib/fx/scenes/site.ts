// Escena "site" (Constructoras: la obra en marcha), portada del diseño (script8): se arma la grúa,
// suben las columnas piso por piso con su encofrado, bajan las losas, aparecen el obrador, la pila
// de vigas, el mixer, los conos, los operarios y el andamio, y al final el vidriado de los primeros
// pisos. La grúa gira y sube una viga en loop. Se arma cuando la escena está en pantalla y se
// desarma (al doble de velocidad) si subís y queda abajo.
import { THREE, P, mat, stage, box, edges, lineSet, contactShadow, interact, want, clamp, lerp, easeOut, easeBack, seg } from "./kit";

export function mount(el: HTMLElement): () => void {
  const { S, run, dispose } = stage(el, 30, [17.2, 12.2, 19.6], [0.4, 3.1, 0.4]);
  const { scene, g } = S;
  g.add(box(11, 0.1, 9, mat.ground(), 0, -0.05, 0));
  // pozo y cerco de obra
  g.add(box(5.4, 0.02, 4.2, new THREE.MeshStandardMaterial({ color: 0x0c0c10, roughness: 1 }), -0.6, 0.001, 0));
  const fence = lineSet(
    [
      [-4.6, -3.6, 3.8, -3.6],
      [3.8, -3.6, 3.8, 3.6],
      [3.8, 3.6, -4.6, 3.6],
      [-4.6, 3.6, -4.6, -3.6],
    ],
    0.4,
    0xffffff,
  );
  (fence.material as THREE.LineBasicMaterial).opacity = 0.25;
  g.add(fence);

  // pisos: columnas, losa, encofrado (aristas azules) y vidriado en los tres primeros
  const C = mat.conc(),
    W = mat.white(),
    FLR = 6,
    H = 0.72;
  type Level = { cols: THREE.Mesh[]; slab: THREE.Mesh; form: THREE.LineSegments; facade: THREE.Mesh | null };
  const levels: Level[] = [];
  for (let f = 0; f < FLR; f++) {
    const lv = new THREE.Group();
    lv.position.y = f * H;
    const cols: THREE.Mesh[] = [];
    [-2.6, -1, 0.6].forEach((x) =>
      [-1.6, 0, 1.6].forEach((z) => {
        const c = box(0.14, H - 0.08, 0.14, C, x, 0, z, true);
        c.scale.y = 0.001;
        lv.add(c);
        cols.push(c);
      }),
    );
    const slab = box(3.6, 0.08, 3.6, f < FLR - 1 ? W : C, -1, H - 0.04, 0);
    slab.visible = false;
    lv.add(slab);
    const form = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(3.6, H - 0.08, 3.6)),
      new THREE.LineBasicMaterial({ color: P.blueL, transparent: true, opacity: 0 }),
    );
    form.position.set(-1, (H - 0.08) / 2, 0);
    lv.add(form);
    const facade = f < 3 ? box(3.62, H - 0.1, 3.62, mat.glass(), -1, 0, 0, true) : null;
    if (facade) {
      facade.visible = false;
      lv.add(facade);
    }
    g.add(lv);
    levels.push({ cols, slab, form, facade });
  }

  // grúa torre
  const crane = new THREE.Group();
  crane.position.set(2.6, 0, -1.6);
  g.add(crane);
  const cm = mat.blue();
  const mast = box(0.28, 6.4, 0.28, cm, 0, 0, 0, true);
  crane.add(mast);
  edges(mast, 0xffffff, 0.35);
  const head = new THREE.Group();
  head.position.y = 6.4;
  crane.add(head);
  const jib = box(6.2, 0.2, 0.24, cm, -2.4, 0.1, 0);
  head.add(jib);
  edges(jib, 0xffffff, 0.35);
  head.add(box(1.6, 0.18, 0.24, cm, 1.2, 0.1, 0), box(0.5, 0.4, 0.4, mat.dark(), 1.8, -0.1, 0), box(0.36, 0.3, 0.36, mat.white(), 0.1, -0.25, 0.25));
  const trolley = new THREE.Group();
  head.add(trolley);
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 1, 6).translate(0, -0.5, 0), mat.frame());
  trolley.add(cable);
  const beam = box(1.2, 0.08, 0.12, mat.white(), 0, 0, 0);
  trolley.add(beam);
  crane.scale.y = 0.001;
  crane.visible = false;

  // obrador, materiales, mixer, conos, operarios y andamio
  const W2 = mat.white(),
    Dk = mat.dark(),
    Bl = mat.blue();
  const extras: THREE.Object3D[] = [];
  const pop = (o: THREE.Object3D, d: number) => {
    o.userData.d = d;
    o.scale.setScalar(0.001);
    g.add(o);
    extras.push(o);
    return o;
  };
  const trailer = new THREE.Group();
  trailer.add(box(2, 0.8, 0.9, W2, 0, 0, 0, true), box(1.6, 0.18, 0.02, Dk, 0, 0.5, 0.46), box(0.3, 0.55, 0.02, Dk, 0.75, 0.05, 0.46, true));
  trailer.position.set(-3.5, 0, 2.7);
  pop(trailer, 0.3);
  const stack = new THREE.Group();
  for (let k = 0; k < 4; k++) stack.add(box(1.6, 0.08, 0.12, k % 2 ? W2 : mat.conc(), 0, 0.04 + k * 0.09, (k % 2) * 0.06));
  stack.position.set(2.2, 0, 2.7);
  pop(stack, 0.5);

  // camión mixer: chasis, cabina con parabrisas, ruedas y trompo que gira sobre su propio eje
  const mixer = new THREE.Group();
  mixer.add(box(2.1, 0.12, 0.7, Dk, 0, 0.2, 0, true));
  const mcab = new THREE.Group();
  mcab.add(
    box(0.6, 0.62, 0.72, W2, 0, 0.32, 0, true),
    box(0.04, 0.26, 0.6, new THREE.MeshPhysicalMaterial({ color: 0x1a2633, roughness: 0.05, clearcoat: 1 }), 0.3, 0.6, 0, true),
    box(0.62, 0.05, 0.74, Bl, 0, 0.33, 0, true),
  );
  mcab.position.x = 0.78;
  mixer.add(mcab);
  [
    [-0.7, 0.37],
    [-0.25, 0.37],
    [0.75, 0.37],
    [-0.7, -0.37],
    [-0.25, -0.37],
    [0.75, -0.37],
  ].forEach(([x, z]) => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.12, 20), Dk);
    w.rotation.x = Math.PI / 2;
    w.position.set(x, 0.15, z);
    mixer.add(w);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.13, 12), W2);
    hub.rotation.x = Math.PI / 2;
    hub.position.set(x, 0.15, z);
    mixer.add(hub);
  });
  const prof = [
    [0.0, 0.5],
    [0.2, 0.52],
    [0.42, 0.46],
    [0.62, 0.32],
    [0.72, 0.18],
  ].map(([y, r]) => new THREE.Vector2(r * 0.85, y * 1.6 - 0.55));
  const drumGeo = new THREE.LatheGeometry(prof, 28);
  drumGeo.rotateZ(-Math.PI / 2);
  const drumPivot = new THREE.Group();
  drumPivot.position.set(-0.35, 0.72, 0);
  drumPivot.rotation.z = 0.22;
  mixer.add(drumPivot);
  const drum = new THREE.Mesh(drumGeo, Bl);
  drumPivot.add(drum);
  for (let k = 0; k < 4; k++) {
    const stripe = box(0.42, 0.035, 0.05, W2, 0, 0, 0);
    stripe.position.set(-0.02, Math.cos((k / 4) * 6.283) * 0.43, Math.sin((k / 4) * 6.283) * 0.43);
    stripe.rotation.x = (k / 4) * 6.283;
    stripe.rotation.y = 0.35;
    drum.add(stripe);
  }
  const chute = box(0.35, 0.04, 0.12, W2, -1.15, 0.55, 0);
  chute.rotation.z = 0.5;
  mixer.add(chute);
  mixer.position.set(3.1, 0, 1.5);
  mixer.rotation.y = -0.35;
  pop(mixer, 0.7);
  [
    [-4.2, 3.3],
    [-3.4, 3.3],
    [3.2, 3.3],
    [3.6, -3.3],
  ].forEach(([x, z], k) => pop(new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 16).translate(0, 0.15, 0), Bl), 0.9 + k * 0.08).position.set(x, 0, z));
  const workers = [
    [-1.8, 1.1],
    [0, -0.9],
    [-0.4, 0.9],
  ].map(([x, z], k) => {
    const w = new THREE.Group();
    w.add(new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.32, 10).translate(0, 0.16, 0), Dk));
    const hm = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), W2);
    hm.position.y = 0.36;
    w.add(hm);
    w.userData = { x, k };
    w.position.set(x, 0, z);
    w.visible = false;
    g.add(w);
    return w;
  });
  const scaf = new THREE.Group();
  g.add(scaf);
  const scafM = new THREE.MeshStandardMaterial({ color: P.blueL });
  for (let k = 0; k <= 6; k++) scaf.add(box(0.025, FLR * H, 0.025, scafM, -2.9 + k * 0.62, 0, 1.98, true));
  for (let k = 1; k < FLR; k++) scaf.add(box(3.75, 0.02, 0.02, scafM, -1, k * H, 1.98));
  scaf.scale.y = 0.001;
  scaf.visible = false;
  const sh = contactShadow(11, 9, 0.5);
  sh.position.y = -0.12;
  scene.add(sh);

  let t0 = -0.2;
  const spin = interact(S, -0.2);
  run((dt, t) => {
    const wv = want(el);
    t0 = clamp(t0 + dt * (wv > 0 ? 1 : wv < 0 ? -2 : 0), -0.2, 8);
    const e = t0;
    const pc = easeOut(seg(e, 0.1, 1));
    crane.visible = pc > 0;
    crane.scale.y = Math.max(0.001, pc);
    levels.forEach((u, f) => {
      const d = 0.9 + f * 0.62;
      u.cols.forEach((c, i) => (c.scale.y = Math.max(0.001, easeBack(seg(e, d + i * 0.02, 0.35)))));
      (u.form.material as THREE.LineBasicMaterial).opacity =
        f === FLR - 1 ? 0.6 * seg(e, d + 0.3, 0.3) : 0.55 * seg(e, d + 0.3, 0.2) * (1 - seg(e, d + 0.55, 0.3));
      const ps = easeOut(seg(e, d + 0.4, 0.3));
      u.slab.visible = ps > 0 && f < FLR - 1;
      u.slab.position.y = H - 0.04 + (1 - ps) * 0.5;
      if (u.facade) {
        const pf = seg(e, FLR * 0.62 + 1.4 + f * 0.25, 0.5);
        u.facade.visible = pf > 0;
        (u.facade.material as THREE.MeshPhysicalMaterial).opacity = 0.7 * pf;
      }
    });
    extras.forEach((o) => o.scale.setScalar(Math.max(0.001, easeBack(seg(e, o.userData.d, 0.5)))));
    drum.rotation.x = t * 0.9;
    // los operarios caminan sobre la última losa terminada
    const top = clamp(Math.floor((e - 0.9) / 0.62), 0, FLR - 1);
    workers.forEach((w) => {
      w.visible = e > 1.4;
      w.position.y = Math.min(top, FLR - 2) * H + H;
      w.position.x = w.userData.x + Math.sin(t * 0.8 + w.userData.k * 2) * 0.35;
    });
    const pa = easeOut(seg(e, FLR * 0.62 + 0.6, 0.8));
    scaf.visible = pa > 0;
    scaf.scale.y = Math.max(0.001, pa);
    // la grúa trabaja: gira despacio y sube una viga en loop
    const w = Math.max(0, e - 1.2);
    head.rotation.y = 0.42 + Math.sin(w * 0.35) * 0.35;
    const cyc = (w % 6) / 6;
    trolley.position.x = -1 - cyc * 2.8;
    const drop = cyc < 0.5 ? lerp(5.9, 2, cyc * 2) : lerp(2, 5.9, (cyc - 0.5) * 2);
    cable.scale.y = 6.4 - drop;
    beam.position.y = -(6.4 - drop);
    beam.visible = cyc < 0.5;
    spin(t);
  });
  return dispose;
}
