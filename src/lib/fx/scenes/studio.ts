// Escena "studio" (Estudios de arquitectura: de la grilla a la maqueta), portada del diseño
// (script8): se trazan los ejes con sus letras, suben columnas y núcleo, bajan las losas
// escalonadas, aparece el vidrio, giran las lamas y se prende la luz adentro. Se arma con el scroll
// (scrub en kit.ts) y se desarma si volvés a subir.
import { THREE, P, mat, stage, box, edges, lineSet, tree, contactShadow, interact, lerp, easeOut, easeBack, seg, tex, skin, scrub } from "./kit";

/** Letra de eje (A–E) en una textura de canvas. */
function lblTex(t: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const x = c.getContext("2d")!;
  x.font = "700 40px Archivo, Arial";
  x.fillStyle = "#8f8dff";
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillText(t, 32, 34);
  const tx = new THREE.CanvasTexture(c);
  tx.colorSpace = THREE.SRGBColorSpace;
  return tx;
}

export function mount(el: HTMLElement): () => void {
  const { S, run, dispose } = stage(el, 30, [12.6, 9.4, 14.2], [-0.2, 1.7, 0]);
  const { scene, g } = S;
  g.add(box(10.5, 0.1, 8.5, mat.ground(), 0, -0.05, 0));

  // grilla de ejes con sus círculos de referencia
  const xs = [-3.6, -1.8, 0, 1.8, 3.6],
    zs = [-2.2, 0, 2.2];
  const grid: number[][] = [];
  xs.forEach((x) => grid.push([x, -3.2, x, 3.2]));
  zs.forEach((z) => grid.push([-4.6, z, 4.6, z]));
  xs.forEach((x) => {
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2,
        b = ((k + 1) / 12) * Math.PI * 2;
      grid.push([x + Math.cos(a) * 0.22, -3.55 + Math.sin(a) * 0.22, x + Math.cos(b) * 0.22, -3.55 + Math.sin(b) * 0.22]);
    }
  });
  const lines = lineSet(grid);
  const linesM = lines.material as THREE.LineBasicMaterial;
  g.add(lines);

  const W = mat.white(),
    C = mat.conc();
  const colGeo = (r: number, n: number) => new THREE.CylinderGeometry(r, r, 1.2, n).translate(0, 0.6, 0);
  // columnas de planta baja en cada cruce de ejes
  const cols: THREE.Mesh[] = [];
  xs.forEach((x) =>
    zs.forEach((z) => {
      const c = new THREE.Mesh(colGeo(0.09, 16), C);
      c.position.set(x, 0, z);
      c.scale.y = 0.001;
      c.visible = false;
      g.add(c);
      cols.push(c);
    }),
  );
  // losas escalonadas (cada una más corta y corrida)
  const slabs = [0, 1, 2].map((i) => {
    const s = box(7.8 - i * 0.9, 0.12, 4.9 - (i === 2 ? 1 : 0), W, -i * 0.45, 1.2 + i * 1.32, i === 2 ? -0.5 : 0);
    edges(s, 0x000000, 0.1);
    s.visible = false;
    g.add(s);
    return s;
  });
  // columnas de los pisos de arriba (las que entran en cada losa)
  const upCols: THREE.Mesh[] = [];
  [1, 2].forEach((i) =>
    xs
      .filter((x) => Math.abs(x) <= (7.8 - i * 0.9) / 2 - 0.35)
      .forEach((x) =>
        zs.forEach((z) => {
          const c = new THREE.Mesh(colGeo(0.07, 12), C);
          c.position.set(x - i * 0.45, 1.26 + (i - 1) * 1.32, z);
          c.scale.y = 0.001;
          c.visible = false;
          g.add(c);
          upCols.push(c);
        }),
      ),
  );
  // lamas verticales del frente
  const fins: THREE.Mesh[] = [];
  for (let i = 0; i < 22; i++) {
    const f = box(0.05, 2.6, 0.38, W, -3.7 + i * 0.34, 1.26, 2.5, true);
    f.rotation.y = Math.PI / 2;
    f.visible = false;
    g.add(f);
    fins.push(f);
  }
  const glassM = mat.glass();
  const glassBox = box(6.4, 2.5, 3.6, glassM, -0.4, 1.3, -0.1, true);
  glassBox.visible = false;
  g.add(glassBox);
  const people = [
    [2.6, 3],
    [2.9, 3.2],
    [-3.2, 3.1],
  ].map(([x, z]) => {
    const p = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.28, 4, 8), mat.dark());
    p.position.set(x, 0.25, z);
    p.visible = false;
    g.add(p);
    return p;
  });
  // detalles: letras de ejes, núcleo, árboles y luz cálida adentro
  const lbls = xs.map((x, k) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(0.32, 0.32),
      new THREE.MeshBasicMaterial({ map: lblTex("ABCDE"[k]), transparent: true, opacity: 0, depthWrite: false }),
    );
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, 0.03, -3.55);
    g.add(m);
    return m;
  });
  const core = box(1.1, 3.9, 1.3, C, -2.7, 0, -1.5, true);
  core.scale.y = 0.001;
  core.visible = false;
  g.add(core);
  edges(core, 0x000000, 0.12);
  const glow = new THREE.MeshStandardMaterial({ color: 0x221c14, emissive: 0xffdcae, emissiveIntensity: 0 });
  const lightsIn = [1.3, 2.62].map((y) => {
    const o = box(6, 1.05, 0.02, glow, -0.6, y, 1.5, true);
    o.visible = false;
    g.add(o);
    return o;
  });
  const leaf = mat.white();
  const trees = [
    [-4.5, 2.8, 1.1],
    [4.3, 2.6, 1.3],
    [4.6, -2.4, 1],
  ].map(([x, z, sc]) => {
    const t = tree(x, z, sc, leaf);
    t.scale.setScalar(0.001);
    g.add(t);
    return t;
  });
  const sh = contactShadow(11, 9, 0.5);
  sh.position.y = -0.12;
  scene.add(sh);

  // al final la maqueta se materializa: losas y núcleo de hormigón, lamas de madera
  const conc = tex.concrete();
  const toConc = skin([...slabs, core], conc, [3, 0.4]),
    toWood = skin(fins, tex.wood(), [0.2, 1], 0.7);
  const white = new THREE.Color(P.white),
    green = new THREE.Color(0x4d7a52);

  // se arma con el scroll: el segundo número es el final de su línea de tiempo (la obra completa)
  const prog = scrub(el, 6.8);
  const spin = interact(S, 0.2);
  run((dt, t) => {
    const e = prog(dt);
    lines.geometry.setDrawRange(0, Math.floor(lines.userData.n * easeOut(seg(e, 0, 1.5))) & ~1);
    linesM.opacity = lerp(1, 0.3, seg(e, 3.2, 0.8));
    cols.forEach((c, i) => {
      const p = easeBack(seg(e, 1.3 + i * 0.04, 0.5));
      c.visible = p > 0;
      c.scale.y = Math.max(0.001, p);
    });
    slabs.forEach((s, i) => {
      const p = easeOut(seg(e, 2 + i * 0.55, 0.55));
      s.visible = p > 0;
      s.position.y = 1.2 + i * 1.32 + (1 - p) * 1.4;
    });
    upCols.forEach((c, i) => {
      const lvl = c.position.y > 2 ? 2 : 1;
      const p = easeBack(seg(e, 2.3 + (lvl - 1) * 0.55 + i * 0.015, 0.45));
      c.visible = p > 0;
      c.scale.y = Math.max(0.001, p);
    });
    glassBox.visible = e > 3.6;
    glassM.opacity = 0.55 * seg(e, 3.6, 0.6);
    fins.forEach((f, i) => {
      const p = easeOut(seg(e, 3.9 + i * 0.035, 0.6));
      f.visible = p > 0;
      f.rotation.y = (Math.PI / 2) * (1 - p);
      f.scale.y = Math.max(0.001, p);
    });
    lbls.forEach((m, q) => ((m.material as THREE.MeshBasicMaterial).opacity = seg(e, 0.4 + q * 0.1, 0.4) * (1 - 0.6 * seg(e, 3.2, 0.8))));
    const pc = easeBack(seg(e, 1.9, 0.9));
    core.visible = pc > 0;
    core.scale.y = Math.max(0.001, pc);
    const lt = seg(e, 4.9, 1);
    glow.emissiveIntensity = lt * 0.9;
    lightsIn.forEach((o) => (o.visible = lt > 0));
    trees.forEach((tr, q) => tr.scale.setScalar(Math.max(0.001, easeBack(seg(e, 4.6 + q * 0.15, 0.6)))));
    people.forEach((p, i) => (p.visible = e > 4.8 + i * 0.1));
    const mt = easeOut(seg(e, 5.6, 1.2));
    toConc(mt);
    toWood(mt);
    leaf.color.lerpColors(white, green, mt);
    spin(t, prog.p);
  });
  return dispose;
}
