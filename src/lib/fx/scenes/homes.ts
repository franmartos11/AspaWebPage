// Escena "homes" (Constructoras de vivienda: un barrio de modelos), portada del diseño (script8): se
// dibujan los lotes, crecen las tres casas modelo (dos aguas, techo plano con planta alta y un agua)
// con sus árboles, aparecen los carteles con el nombre del modelo y al final se prende la luz cálida.
// Pasando el mouse por una casa la levanta y resalta su cartel. Se arma con el scroll (scrub en
// kit.ts) y se desarma si volvés a subir.
import { pageLang } from "../core";
import { THREE, mat, stage, box, edges, lineSet, tree, contactShadow, interact, lerp, easeOut, easeBack, seg, cssFont, scrub } from "./kit";

// carteles de los modelos (los nombres son propios; los dormitorios, en el idioma de la página)
const INFO = (bed: string) => [
  ["Aromo", `2 ${bed} · 85 m²`],
  ["Tala", `3 ${bed} · 120 m²`],
  ["Espinillo", `3 ${bed} · 140 m²`],
];

export function mount(el: HTMLElement): () => void {
  const { S, run, dispose } = stage(el, 30, [12.5, 9, 14], [0, 1, 0]);
  const { scene, camera, g } = S;
  g.add(box(12, 0.1, 8, mat.ground(), 0, -0.05, 0));

  // lotes y línea municipal
  const lots = [-4, 0, 4],
    segs: number[][] = [];
  lots.forEach((x) =>
    segs.push([x - 1.8, -2.6, x + 1.8, -2.6], [x + 1.8, -2.6, x + 1.8, 2.6], [x + 1.8, 2.6, x - 1.8, 2.6], [x - 1.8, 2.6, x - 1.8, -2.6]),
  );
  segs.push([-6, 3.3, 6, 3.3]);
  const lines = lineSet(segs);
  const linesM = lines.material as THREE.LineBasicMaterial;
  g.add(lines);

  const W = mat.white(),
    D = mat.dark(),
    G = mat.glass();
  const gable = (w: number, d: number) => {
    const sh = new THREE.Shape();
    sh.moveTo(-w / 2 - 0.15, 0);
    sh.lineTo(w / 2 + 0.15, 0);
    sh.lineTo(0, 1);
    sh.lineTo(-w / 2 - 0.15, 0);
    const r = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: d + 0.3, bevelEnabled: false }), D);
    r.position.z = -(d + 0.3) / 2;
    return r;
  };
  const houses: THREE.Group[] = [];
  const trees: THREE.Group[] = [];
  (
    [
      [-4, "gable"],
      [0, "flat"],
      [4, "shed"],
    ] as const
  ).forEach(([x, kind]) => {
    const h = new THREE.Group();
    h.position.set(x, 0, -0.3);
    const body = box(2.4, 1.6, 2.2, W, 0, 0, 0, true);
    h.add(body);
    edges(body, 0x000000, 0.1);
    let roof: THREE.Mesh;
    if (kind === "gable") {
      roof = gable(2.4, 2.2);
      roof.position.y = 1.6;
    } else if (kind === "flat") {
      roof = box(2.8, 0.14, 2.6, D, 0, 1.67, 0);
      h.add(box(1.4, 1, 1.6, W, -0.4, 1.74, -0.2, true));
    } else {
      roof = box(2.7, 0.12, 2.6, D, 0, 1.9, 0);
      roof.rotation.z = 0.22;
    }
    h.add(roof);
    h.add(box(0.9, 1, 0.04, G, -0.5, 0.2, 1.12, true), box(0.5, 1.1, 0.04, mat.wood(), 0.6, 0, 1.12, true));
    const tr = tree(x + 1.4, 1.9, 0.8, mat.white());
    tr.scale.setScalar(0.001);
    g.add(tr);
    trees.push(tr);
    h.scale.set(1, 0.001, 1);
    h.visible = false;
    g.add(h);
    houses.push(h);
  });

  // calle, veredas, jardines, entradas, carteles con el modelo y luces
  g.add(box(12, 0.02, 1.3, new THREE.MeshStandardMaterial({ color: 0x101014, roughness: 1 }), 0, 0.005, 3.95, true));
  for (let k = 0; k < 8; k++) g.add(box(0.6, 0.025, 0.06, mat.white(), -5.2 + k * 1.5, 0.01, 3.95, true));
  g.add(box(12, 0.04, 0.35, mat.conc(), 0, 0, 3.12, true));
  const lawnM = new THREE.MeshStandardMaterial({ color: 0x2a3a2e, roughness: 1, transparent: true, opacity: 0 });
  lots.forEach((x) => {
    g.add(box(3.5, 0.015, 5.1, lawnM, x, 0.006, 0, true));
    g.add(box(0.9, 0.025, 1.9, mat.conc(), x + 0.6, 0.008, 1.95, true));
  });
  const glowM = new THREE.MeshStandardMaterial({ color: 0x221c14, emissive: 0xffd9a8, emissiveIntensity: 0 });
  houses.forEach((h) => h.add(box(0.86, 0.96, 0.02, glowM, -0.5, 0.22, 1.09, true)));
  const font = cssFont("--disp"),
    info = INFO(pageLang() === "en" ? "bed" : "dorm");
  const signs = houses.map((h, k) => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 200;
    const x = c.getContext("2d")!;
    x.fillStyle = "rgba(11,11,12,.85)";
    x.beginPath();
    x.roundRect(8, 8, 496, 184, 28);
    x.fill();
    x.strokeStyle = "#6E6CFF";
    x.lineWidth = 4;
    x.stroke();
    x.fillStyle = "#fff";
    x.font = `700 64px ${font}`;
    x.fillText(info[k][0], 36, 92);
    x.fillStyle = "#b9b9c2";
    x.font = `500 40px ${cssFont()}`;
    x.fillText(info[k][1], 36, 158);
    const tx = new THREE.CanvasTexture(c);
    tx.colorSpace = THREE.SRGBColorSpace;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tx, transparent: true, opacity: 0, depthWrite: false }));
    sp.scale.set(1.8, 0.7, 1);
    sp.position.set(h.position.x, 3.4, -0.3);
    g.add(sp);
    return sp;
  });

  // casa bajo el puntero (o tocada): se levanta y resalta su cartel
  let hovH = -1;
  const ray = new THREE.Raycaster(),
    ndc = new THREE.Vector2();
  const aimH = (e: PointerEvent | MouseEvent) => {
    const r = el.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, (-(e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(houses, true)[0];
    hovH = -1;
    if (hit) {
      let o: THREE.Object3D | null = hit.object;
      while (o && !houses.includes(o as THREE.Group)) o = o.parent;
      hovH = houses.indexOf(o as THREE.Group);
    }
    el.style.cursor = hovH >= 0 ? "pointer" : "";
  };
  const onLeave = (e: PointerEvent) => {
    if (e.pointerType === "mouse") hovH = -1;
  };
  el.addEventListener("pointermove", aimH);
  el.addEventListener("click", aimH);
  el.addEventListener("pointerleave", onLeave);

  const sh = contactShadow(13, 9, 0.5);
  sh.position.y = -0.12;
  scene.add(sh);

  // se arma con el scroll: el segundo número es el final de su línea de tiempo (la obra completa)
  const prog = scrub(el, 4.7);
  const spin = interact(S, -0.1);
  run((dt, t) => {
    const e = prog(dt);
    lines.geometry.setDrawRange(0, Math.floor(lines.userData.n * easeOut(seg(e, 0, 1.3))) & ~1);
    linesM.opacity = lerp(1, 0.3, seg(e, 3, 0.8));
    houses.forEach((h, i) => {
      const p = easeBack(seg(e, 1.2 + i * 0.55, 0.7));
      h.visible = p > 0;
      h.scale.y = Math.max(0.001, p);
      trees[i].scale.setScalar(Math.max(0.001, easeBack(seg(e, 2 + i * 0.55, 0.6))));
      h.position.y = lerp(h.position.y, i === hovH ? 0.18 : 0, 0.15);
    });
    lawnM.opacity = seg(e, 0.4, 1) * 0.95;
    glowM.emissiveIntensity = seg(e, 3.6, 1) * 0.9;
    signs.forEach((sp, k) => {
      const base = seg(e, 2.6 + k * 0.3, 0.5);
      sp.material.opacity = base * (hovH < 0 || hovH === k ? 1 : 0.35);
      sp.position.y = 3.3 + (k === 1 ? 0.45 : 0) + (1 - easeOut(base)) * 0.4 + (hovH === k ? 0.2 : 0) + Math.sin(t * 1.5 + k) * 0.04;
    });
    spin(t, prog.p);
  });
  return () => {
    el.removeEventListener("pointermove", aimH);
    el.removeEventListener("click", aimH);
    el.removeEventListener("pointerleave", onLeave);
    el.style.cursor = "";
    dispose();
  };
}
