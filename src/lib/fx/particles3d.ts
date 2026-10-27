// SISTEMAS · «De la planilla al sistema»: un tablero de fichas que muestra una planilla de
// Excel y, ficha por ficha, se da vuelta hasta mostrar el sistema (Aspa Rodeo).
// Portado de la escena "particles" del diseño (Three.js r160). Se carga en diferido:
// nunca forma parte del JS inicial de la página.
import * as THREE from "three";
import rodeo from "@/assets/work/aspa-rodeo.jpg";
import { pageLang } from "./core";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ez = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// textos de la planilla, por idioma (mismo contenido desprolijo que el comparador de la página)
const SHEET = {
  es: {
    title: "Hacienda_2026_FINAL_v3 (2).xlsx  ·  Guardado hace 3 días",
    tabs: ["Archivo", "Inicio", "Insertar", "Disposición", "Fórmulas", "Datos", "Revisar", "Vista"],
    paste: "Pegar",
    bold: "N   K   S",
    cond: "Formato condicional",
    sort: "Ordenar y filtrar",
    formula: "=SUMA(D2:D6)/CONTAR(C2:C6)",
    rows: [
      "LOTE,CATEG,CAB,KG TOTAL,POTRERO,PROM,OBS",
      "L1,novillos,186,76632,la loma,412,ver con Juan",
      "L-4,Vaq.,132??,51612,EL BAJO,391,",
      "lote 7,terneros,248,46128,aguada,#¡DIV/0!,pesar de nuevo",
      "L9,vacas,310,145080,monte,468,",
      "L11,TOROS,18,13356,casco,#¡REF!,vacunar??",
      ".,,=SUMA?,,,#¡VALOR!,",
      ".,,,,,,",
      "vacunas aftosa lote 7 fines oct (?),,,,,,",
      ".,,,,,,",
    ],
    sheets: ["Hoja1", "Hoja1 (2)", "pesadas viejo", "NO TOCAR"],
    ready: "Listo",
    status: "Promedio: #¡DIV/0!    Recuento: 47    Suma: 332508",
  },
  en: {
    title: "Cattle_2026_FINAL_v3 (2).xlsx  ·  Saved 3 days ago",
    tabs: ["File", "Home", "Insert", "Page Layout", "Formulas", "Data", "Review", "View"],
    paste: "Paste",
    bold: "B   I   U",
    cond: "Conditional Formatting",
    sort: "Sort & Filter",
    formula: "=SUM(D2:D6)/COUNT(C2:C6)",
    rows: [
      "LOT,CLASS,HEAD,TOTAL KG,PASTURE,AVG,NOTES",
      "L1,steers,186,76632,the hill,412,check w/ Juan",
      "L-4,Heif.,132??,51612,LOW FIELD,391,",
      "lot 7,calves,248,46128,creek,#DIV/0!,weigh again",
      "L9,cows,310,145080,woods,468,",
      "L11,BULLS,18,13356,home lot,#REF!,vaccinate??",
      ".,,=SUM?,,,#VALUE!,",
      ".,,,,,,",
      "vaccines FMD lot 7 late Oct (?),,,,,,",
      ".,,,,,,",
    ],
    sheets: ["Sheet1", "Sheet1 (2)", "old weighings", "DO NOT TOUCH"],
    ready: "Ready",
    status: "Average: #DIV/0!    Count: 47    Sum: 332508",
  },
};

/** Planilla dibujada como un Excel real (cinta, barra de fórmulas, grilla fina y hojas). */
function drawSheet() {
  const S = SHEET[pageLang()];
  const W = 1875,
    H = 1000,
    cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const x = cv.getContext("2d")!;
  const F = 'Calibri, Carlito, "Segoe UI", Arial';
  x.fillStyle = "#fff";
  x.fillRect(0, 0, W, H);
  // barra de título
  x.fillStyle = "#107c41";
  x.fillRect(0, 0, W, 46);
  x.fillStyle = "#fff";
  x.font = `600 22px ${F}`;
  x.fillText("Excel", 58, 31);
  x.fillRect(18, 11, 26, 24);
  x.fillStyle = "#107c41";
  x.font = `700 18px ${F}`;
  x.fillText("X", 24, 30);
  x.fillStyle = "#fff";
  x.font = `22px ${F}`;
  x.textAlign = "center";
  x.fillText(S.title, W / 2, 31);
  x.textAlign = "left";
  // pestañas de la cinta
  x.fillStyle = "#f3f3f3";
  x.fillRect(0, 46, W, 40);
  x.font = `20px ${F}`;
  S.tabs.forEach((t, k) => {
    x.fillStyle = k === 1 ? "#107c41" : "#333";
    x.fillText(t, 24 + k * 120, 73);
  });
  x.fillStyle = "#107c41";
  x.fillRect(144, 82, 58, 3);
  // herramientas
  x.fillStyle = "#fafafa";
  x.fillRect(0, 86, W, 70);
  const tools: [number, string][] = [
    [24, S.paste],
    [130, "Calibri  ·  11"],
    [340, S.bold],
    [500, "≡  ≡  ≡"],
    [660, "$  %  ,"],
    [820, S.cond],
    [1080, S.sort],
  ];
  tools.forEach(([X, t]) => {
    x.fillStyle = "#444";
    x.font = `19px ${F}`;
    x.fillText(t, X, 128);
  });
  // barra de fórmulas
  x.fillStyle = "#fff";
  x.fillRect(0, 156, W, 44);
  x.strokeStyle = "#d4d4d4";
  x.lineWidth = 1;
  x.beginPath();
  x.moveTo(0, 200);
  x.lineTo(W, 200);
  x.stroke();
  x.fillStyle = "#333";
  x.font = `20px ${F}`;
  x.fillText("F7", 22, 185);
  x.fillStyle = "#888";
  x.fillText("fx", 110, 185);
  x.fillStyle = "#222";
  x.font = `20px Consolas, monospace`;
  x.fillText(S.formula, 150, 185);
  // grilla con los datos (desprolijos a propósito)
  const cols = [56, 170, 230, 150, 210, 220, 190, 330, 320],
    rows = S.rows;
  const top = 200,
    hh = 34,
    rh = 56;
  let cx = 0;
  const colX = cols.map((w) => {
    const v = cx;
    cx += w;
    return v;
  });
  x.fillStyle = "#f5f5f5";
  x.fillRect(0, top, W, hh);
  x.fillStyle = "#555";
  x.font = `19px ${F}`;
  x.textAlign = "center";
  ["", "A", "B", "C", "D", "E", "F", "G", "H"].forEach((t, k) => x.fillText(t, colX[k] + cols[k] / 2, top + 24));
  x.textAlign = "left";
  rows.forEach((r, ri) => {
    const y = top + hh + ri * rh;
    x.fillStyle = "#f5f5f5";
    x.fillRect(0, y, cols[0], rh);
    x.fillStyle = "#555";
    x.font = `19px ${F}`;
    x.textAlign = "center";
    x.fillText(String(ri + 1), 28, y + 36);
    x.textAlign = "left";
    r.split(",").forEach((t, ci) => {
      const X = colX[ci + 1],
        w = cols[ci + 1];
      if (!w) return;
      if (t.startsWith("#")) {
        x.fillStyle = "#fde2e1";
        x.fillRect(X, y, w, rh);
      } else if (t.includes("?") && ri > 0 && ci < 6) {
        x.fillStyle = "#fff4c2";
        x.fillRect(X, y, w, rh);
      }
      x.fillStyle = t.startsWith("#") ? "#c00000" : ri === 0 ? "#000" : ci === 6 || ri === 8 ? "#7f7f7f" : "#000";
      x.font = (ri === 0 ? "700 " : "") + (ci === 6 || ri === 8 ? "italic " : "") + `22px ${F}`;
      const num = /^[0-9.,]+$/.test(t);
      if (t !== ".") {
        if (num && ri > 0) {
          x.textAlign = "right";
          x.fillText(t, X + w - 12, y + 36);
          x.textAlign = "left";
        } else x.fillText(t, X + 10, y + 36);
      }
    });
  });
  x.strokeStyle = "#e1e1e1";
  x.lineWidth = 1;
  const gridB = top + hh + rows.length * rh;
  for (let k = 0; k <= rows.length; k++) {
    const y = top + hh + k * rh + 0.5;
    x.beginPath();
    x.moveTo(0, y);
    x.lineTo(W, y);
    x.stroke();
  }
  colX.concat([cx]).forEach((v) => {
    x.beginPath();
    x.moveTo(v + 0.5, top);
    x.lineTo(v + 0.5, gridB);
    x.stroke();
  });
  // celda activa (la del #¡DIV/0!)
  x.strokeStyle = "#107c41";
  x.lineWidth = 3;
  x.strokeRect(colX[6] + 1, top + hh + 3 * rh + 1, cols[6] - 2, rh - 2);
  x.fillStyle = "#107c41";
  x.fillRect(colX[6] + cols[6] - 6, top + hh + 4 * rh - 6, 8, 8);
  // hojas
  x.fillStyle = "#f3f3f3";
  x.fillRect(0, H - 74, W, 40);
  const sheets: [string, number, boolean][] = [
    [S.sheets[0], 24, true],
    [S.sheets[1], 150, false],
    [S.sheets[2], 300, false],
    [S.sheets[3], 480, false],
    ["+", 640, false],
  ];
  sheets.forEach(([t, X, on]) => {
    if (on) {
      x.fillStyle = "#fff";
      x.fillRect(X - 12, H - 74, 110, 40);
      x.fillStyle = "#107c41";
      x.fillRect(X - 12, H - 38, 110, 3);
    }
    x.fillStyle = on ? "#107c41" : "#444";
    x.font = `${on ? "600 " : ""}19px ${F}`;
    x.fillText(t, X, H - 47);
  });
  // barra de estado
  x.fillStyle = "#107c41";
  x.fillRect(0, H - 34, W, 34);
  x.fillStyle = "#fff";
  x.font = `18px ${F}`;
  x.fillText(S.ready, 20, H - 11);
  x.textAlign = "right";
  x.fillText(S.status, W - 24, H - 11);
  x.textAlign = "left";
  return cv;
}

/**
 * Monta la escena en el contenedor `.parts-3d`. getProgress devuelve el progreso (ya suavizado)
 * de la sección sticky, de 0 a 1. Devuelve la función que la desarma.
 */
export function mountParticles(el: HTMLElement, getProgress: () => number, isMobile: boolean) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.5 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = "m3d-canvas";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 100);
  const fitDist = (h: number) => h / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));

  /* ---------- texturas: la planilla (frente) y el sistema (dorso) ---------- */
  const texA = new THREE.CanvasTexture(drawSheet());
  texA.colorSpace = THREE.SRGBColorSpace;
  texA.anisotropy = 8;
  const texB = new THREE.TextureLoader().load(rodeo.src);
  texB.colorSpace = THREE.SRGBColorSpace;
  texB.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const mA = new THREE.MeshBasicMaterial({ map: texA, toneMapped: false }),
    mB = new THREE.MeshBasicMaterial({ map: texB, toneMapped: false });

  /* ---------- tablero de fichas: cada una muestra un pedazo de la planilla y, al darse vuelta, el mismo pedazo del sistema ---------- */
  const C = 24,
    R = 13,
    BW = 8,
    BH = 8 / 1.875,
    tw = BW / C,
    th = BH / R,
    board = new THREE.Group();
  scene.add(board);
  const tiles: THREE.Group[] = [];
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++) {
      const t = new THREE.Group();
      t.position.set(-BW / 2 + tw * (c + 0.5), BH / 2 - th * (r + 0.5), 0);
      const mk = (m: THREE.Material, back: boolean) => {
        const g = new THREE.PlaneGeometry(tw * 1.002, th * 1.002);
        const uv = g.attributes.uv;
        for (let i = 0; i < uv.count; i++) uv.setXY(i, (c + uv.getX(i)) / C, 1 - (r + 1 - uv.getY(i)) / R);
        const p = new THREE.Mesh(g, m);
        if (back) p.rotation.x = Math.PI;
        p.position.z = back ? -0.002 : 0.002;
        return p;
      };
      t.add(mk(mA, false), mk(mB, true));
      // demora de cada ficha: la ola avanza en diagonal desde arriba a la izquierda
      t.userData.d = (c / C) * 0.6 + (r / R) * 0.4;
      board.add(t);
      tiles.push(t);
    }
  const frame = new THREE.Mesh(new THREE.PlaneGeometry(BW + 0.18, BH + 0.18), new THREE.MeshBasicMaterial({ color: 0x1d1d22 }));
  frame.position.z = -0.06;
  board.add(frame);

  // al terminar, la pantalla final se muestra como imagen nítida exactamente encima del tablero
  const crisp = document.createElement("img");
  crisp.className = "parts-crisp";
  crisp.alt = "";
  crisp.decoding = "async";
  crisp.src = rodeo.src;
  el.appendChild(crisp);

  /* ---------- mouse ---------- */
  const mouse = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = (e.clientY / innerHeight) * 2 - 1;
  };
  addEventListener("pointermove", onMove, { passive: true });

  /* ---------- cuadro a cuadro ---------- */
  let rx = 0,
    ry = 0;
  const v = new THREE.Vector3();
  function update() {
    const p = clamp((getProgress() - 0.3) / 0.58, 0, 1);
    tiles.forEach((tl) => {
      const f = ez(clamp((p * 1.7 - tl.userData.d) / 0.55, 0, 1)),
        m = Math.sin(Math.PI * f);
      tl.rotation.x = Math.PI * f;
      tl.rotation.y = m * 0.18;
      tl.position.z = m * 0.45;
      tl.scale.setScalar(1 - m * 0.12);
    });
    // el tablero arranca inclinado (y sigue al mouse) y termina de frente
    const flat = ez(clamp((p - 0.55) / 0.45, 0, 1));
    rx = lerp(rx, mouse.y * 0.04 * (1 - flat), 0.05);
    ry = lerp(ry, mouse.x * 0.08 * (1 - flat), 0.05);
    board.rotation.set(lerp(-0.06, 0, flat) + rx, lerp(-0.22, 0, flat) + ry, 0);
    const op = clamp((p - 0.97) / 0.03, 0, 1);
    crisp.style.opacity = String(op);
    if (op > 0) {
      board.updateMatrixWorld();
      const w = el.clientWidth,
        h = el.clientHeight;
      const pts = [
        [-BW / 2, BH / 2],
        [BW / 2, -BH / 2],
      ].map(([a, b]) => {
        v.set(a, b, 0);
        board.localToWorld(v);
        v.project(camera);
        return [((v.x + 1) / 2) * w, ((1 - v.y) / 2) * h];
      });
      crisp.style.left = pts[0][0] + "px";
      crisp.style.top = pts[0][1] + "px";
      crisp.style.width = pts[1][0] - pts[0][0] + "px";
      crisp.style.height = pts[1][1] - pts[0][1] + "px";
    }
  }

  /* ---------- tamaño, visibilidad y bucle ---------- */
  function resize() {
    const w = el.clientWidth,
      h = el.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (w / h < 1.1) {
      // angosto: el tablero ocupa el ancho y queda abajo del texto
      camera.position.set(0, 1.6, fitDist((BW * 1.15) / camera.aspect));
      camera.lookAt(0, 1.6, 0);
      board.position.set(0, 0, 0);
      board.scale.setScalar(1);
    } else {
      // ancho: el texto a la izquierda y el tablero corrido a la derecha
      camera.position.set(-1.7, 0, fitDist(BH * 1.75));
      camera.lookAt(-1.7, 0, 0);
      board.position.set(0.15, 0, 0);
      board.scale.setScalar(0.9);
    }
  }
  el.appendChild(canvas);
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  let visible = true;
  const io = new IntersectionObserver((es) => (visible = es[0].isIntersecting));
  io.observe(el);

  let raf = 0;
  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    update();
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
    crisp.remove();
    el.classList.remove("live");
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
    });
    texA.dispose();
    texB.dispose();
    mA.dispose();
    mB.dispose();
    frame.material.dispose();
    renderer.dispose();
  };
}
