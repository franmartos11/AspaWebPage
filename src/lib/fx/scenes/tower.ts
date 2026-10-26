// Escena "tower" (desarrollistas), portada de script8 del diseño: la torre se arma piso por piso
// y cada unidad es tocable (cálida = disponible, ámbar = reservada, oscura = vendida).
// Los datos de las unidades y lo que se muestra (tooltip, ficha, cotizador) viven en ../devdemo:
// acá solo se dibuja, se detecta el puntero y se avisa con onHover / onPick.
import { THREE, P, mat, box, edges, tree, contactShadow, stage, interact, want, seg, clamp, lerp, easeOut, easeBack } from "./kit";
import { towerUnits, TOWER_FLOORS, type TowerUnit } from "../devdemo";

export type TowerOpts = {
  units: TowerUnit[];
  /** unidad bajo el puntero (null = ninguna) con la posición local dentro del contenedor */
  onHover?: (i: number | null, x: number, y: number, w: number, h: number) => void;
  /** unidad tocada */
  onPick?: (i: number) => void;
};
export type Tower = {
  /** marca una unidad como seleccionada (desde la lista accesible o el cotizador) */
  select: (i: number | null) => void;
  dispose: () => void;
};

const ST_COL = { Disponible: 0xfff1d6, Reservada: 0xf5b84a, Vendida: 0x3a3a40 } as const;

export function mountTower(el: HTMLElement, opts: TowerOpts): Tower {
  const { S, run, dispose } = stage(el, 28, [12.8, 9.2, 14.8], [0, 3.5, 0]);
  const { scene, camera, g } = S;
  g.add(box(7, 0.12, 6, mat.ground(), 0, -0.06, 0));
  const podium = box(4.6, 0.5, 3.6, mat.conc(), 0, 0, 0, true);
  g.add(podium);
  edges(podium, 0xffffff, 0.12);
  g.add(box(3.8, 0.42, 2.8, mat.glass(), 0, 0.5, 0, true));

  const FL = TOWER_FLOORS,
    H = 0.56;
  const floors: THREE.Group[] = [];
  // un mesh por unidad, en el mismo orden que opts.units (piso * 4 + k)
  const units: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] = [];
  const slabM = mat.white(),
    hiSlab = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: P.blueL, emissiveIntensity: 0.6 }),
    coreM = mat.conc();
  const POS = [
    [-0.82, -0.6],
    [0.82, -0.6],
    [-0.82, 0.6],
    [0.82, 0.6],
  ];
  for (let f = 0; f < FL; f++) {
    const fg = new THREE.Group();
    fg.position.y = 0.92 + f * H;
    fg.userData.y = fg.position.y;
    fg.add(box(3.3, 0.07, 2.5, slabM, 0, H - 0.04, 0)); // losa: children[0]
    fg.add(box(0.6, H - 0.07, 0.6, coreM, 0, 0, 0, true));
    POS.forEach(([x, z], k) => {
      const i = f * 4 + k;
      const u = box(1.5, H - 0.1, 1.08, mat.lit(), x, 0, z, true) as THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;
      // algunas disponibles con la luz prendida (como en el diseño, al azar)
      u.userData = { i, lit: Math.random() < 0.35, floor: fg };
      fg.add(u);
      units[i] = u;
      // parasoles verticales
      for (let q = 0; q < 4; q++) fg.add(box(0.035, H - 0.1, 0.14, slabM, x - 0.6 + q * 0.4, 0, z + (z > 0 ? 0.6 : -0.6), true));
    });
    fg.scale.y = 0.001;
    fg.visible = false;
    g.add(fg);
    floors.push(fg);
  }
  const crown = box(2, 0.3, 1.6, mat.dark(), 0, 0.92 + FL * H, 0, true);
  crown.visible = false;
  g.add(crown);
  const trees = [
    [-2.8, 2],
    [2.9, -1.9],
    [2.6, 2.2],
    [-2.7, -2.1],
  ].map(([x, z]) => {
    const t = tree(x, z, 1.1, mat.white());
    t.scale.setScalar(0.001);
    g.add(t);
    return t;
  });
  // terraza: pileta, deck y reposeras
  const roofY = 0.92 + FL * H + 0.3;
  const pool = box(1.1, 0.05, 0.6, new THREE.MeshPhysicalMaterial({ color: P.blueL, roughness: 0.02, clearcoat: 1, transparent: true, opacity: 0.9 }), -0.35, roofY, 0.15, true);
  const deck = box(1.9, 0.03, 1.4, mat.wood(), 0, roofY - 0.01, 0, true);
  pool.visible = deck.visible = false;
  g.add(pool, deck);
  const loungers = [0.45, 0.75].map((x) => {
    const l = box(0.18, 0.05, 0.42, mat.white(), x, roofY + 0.02, 0.15, true);
    l.visible = false;
    g.add(l);
    return l;
  });
  const plaza = [
    [-2.4, 1.9],
    [2.4, 1.9],
    [-2.4, -1.9],
    [2.4, -1.9],
  ].map(([x, z]) => {
    const p = box(1.4, 0.03, 1, new THREE.MeshStandardMaterial({ color: 0x2a3a2e, roughness: 1 }), x, 0, z, true);
    p.scale.setScalar(0.001);
    g.add(p);
    return p;
  });
  const canopy = box(1.6, 0.05, 0.6, mat.dark(), 0, 0.62, 1.95);
  canopy.visible = false;
  g.add(canopy);
  const sh = contactShadow(9, 7.5, 0.55);
  sh.position.y = -0.13;
  scene.add(sh);

  // ---------- puntero: hover (tooltip) y click (ficha) ----------
  const ray = new THREE.Raycaster(),
    ndc = new THREE.Vector2();
  let hover: (typeof units)[number] | null = null,
    sel: (typeof units)[number] | null = null;
  const aim = (e: PointerEvent | MouseEvent) => {
    const r = el.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, (-(e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(
      units.filter((u) => u.parent!.visible),
      false,
    )[0];
    const u = hit ? (hit.object as (typeof units)[number]) : null;
    if (u !== hover) {
      hover = u;
      el.style.cursor = u ? "pointer" : "";
    }
    opts.onHover?.(u ? u.userData.i : null, e.clientX - r.left, e.clientY - r.top, r.width, r.height);
  };
  const onLeave = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    hover = null;
    el.style.cursor = "";
    opts.onHover?.(null, 0, 0, 0, 0);
  };
  const onClick = (e: MouseEvent) => {
    aim(e);
    if (!hover) return;
    sel = hover;
    opts.onPick?.(sel.userData.i);
  };
  el.addEventListener("pointermove", aim);
  el.addEventListener("pointerleave", onLeave);
  el.addEventListener("click", onClick);

  // ---------- armado por tiempo (se arma al entrar, se desarma si volvés a subir) ----------
  const spin = interact(S, -0.35);
  let t0 = -0.2;
  run((dt, t) => {
    const wv = want(el);
    t0 = clamp(t0 + dt * (wv > 0 ? 1 : wv < 0 ? -2 : 0), -0.2, 8);
    const e = t0;
    floors.forEach((f, i) => {
      const p = seg(e, 0.25 + i * 0.14, 0.55);
      f.visible = p > 0;
      f.scale.y = Math.max(0.001, Math.min(1.05, easeBack(p)));
      f.position.y = f.userData.y + (1 - easeOut(p)) * 0.7;
    });
    crown.visible = e > 0.25 + FL * 0.14;
    trees.forEach((tr, i) => tr.scale.setScalar(Math.max(0.001, easeBack(seg(e, 1.1 + i * 0.12, 0.6)))));
    const lightOn = seg(e, 0.4 + FL * 0.14, 1.2);
    const done = seg(e, 0.4 + FL * 0.14, 0.8);
    pool.visible = deck.visible = done > 0;
    loungers.forEach((l) => (l.visible = done > 0.5));
    canopy.visible = e > 0.6;
    plaza.forEach((p, q) => p.scale.setScalar(Math.max(0.001, easeOut(seg(e, 0.2 + q * 0.1, 0.6)))));
    units.forEach((u) => {
      const st = opts.units[u.userData.i].st;
      const act = u === hover || u === sel;
      const tgt = act ? 1.3 : st === "Vendida" ? 0 : st === "Reservada" ? 0.45 * lightOn : u.userData.lit ? 0.55 * lightOn : 0.08 * lightOn;
      u.material.emissiveIntensity = lerp(u.material.emissiveIntensity, tgt, 0.12);
      u.material.emissive.setHex(act ? P.blueL : ST_COL[st]);
      u.material.color.setHex(st === "Vendida" ? 0x15151a : 0x1a2633);
    });
    floors.forEach((f) => {
      (f.children[0] as THREE.Mesh).material = hover && hover.userData.floor === f ? hiSlab : slabM;
    });
    spin(t);
  });

  return {
    select(i) {
      sel = i === null ? null : (units[i] ?? null);
    },
    dispose() {
      el.removeEventListener("pointermove", aim);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("click", onClick);
      el.style.cursor = "";
      floors.forEach((f) => ((f.children[0] as THREE.Mesh).material = slabM));
      hiSlab.dispose();
      dispose();
    },
  };
}

/** Contrato de ./kit (SceneModule): sin la demo alrededor, la torre sola con sus unidades. */
export function mount(el: HTMLElement): () => void {
  return mountTower(el, { units: towerUnits() }).dispose;
}
