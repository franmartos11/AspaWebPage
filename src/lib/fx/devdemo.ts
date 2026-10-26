// Demo de desarrollistas (portada de script5/script8 del diseño): torre 3D con unidades, masterplan,
// tour 360, cotizador de cuotas, tabla de unidades y modelo BIM.
// Todo lo 2D funciona sin WebGL y con movimiento reducido; la torre se carga diferida (lazyScene).
// Accesibilidad (el diseño era solo con mouse): los lotes son botones con flechas (un solo tab
// stop), la tabla tiene un botón por fila, el tour es un slider con flechas, el BIM es un botón
// que separa los pisos y las unidades de la torre se eligen también con una lista (<select>).
import { $, $$, reducedMotion } from "./core";
import { lazyScene } from "./scene-loader";
import type { Tower } from "./scenes/tower";

// ---------- datos de la torre (compartidos con ./scenes/tower) ----------
export const TOWER_FLOORS = 11;
export type TowerUnit = { label: string; floor: number; m2: number; price: number; st: "Disponible" | "Reservada" | "Vendida" };

/** Las 44 unidades de la torre (4 por piso), con el mismo azar fijo que el diseño. */
export function towerUnits(): TowerUnit[] {
  const out: TowerUnit[] = [];
  for (let f = 0; f < TOWER_FLOORS; f++)
    for (let k = 0; k < 4; k++) {
      const m2 = [64, 76, 58, 90][k] + f,
        price = Math.round((m2 * 1650 + f * 2600) / 100) * 100;
      const rnd = Math.abs(((Math.sin((f + 1) * 12.9898 + k * 78.233) * 43758.5453) % 1));
      out.push({ label: `${f + 1}${"ABCD"[k]}`, floor: f + 1, m2, price, st: rnd < 0.22 ? "Vendida" : rnd < 0.34 ? "Reservada" : "Disponible" });
    }
  return out;
}

const usd = (v: number) => "USD " + new Intl.NumberFormat("es-AR").format(Math.round(v));
const ficha = (u: TowerUnit) =>
  `<b>Unidad ${u.label}</b><span>${u.m2} m² · piso ${u.floor}</span><span>${u.st === "Vendida" ? "Vendida" : usd(u.price)}</span><span class="st-${u.st.toLowerCase()}">● ${u.st}</span>`;

const ST = { d: "Disponible", r: "Reservado", v: "Vendido" } as const;
type Lot = { id: string; x: number; y: number; s: keyof typeof ST; m2: number; price: number };

export function initDevDemo(root: HTMLElement): () => void {
  const off: (() => void)[] = [];
  const on = <K extends keyof HTMLElementEventMap>(el: EventTarget, type: K, fn: (e: HTMLElementEventMap[K]) => void, o?: AddEventListenerOptions) => {
    el.addEventListener(type, fn as EventListener, o);
    off.push(() => el.removeEventListener(type, fn as EventListener, o));
  };
  const q = <T extends Element = HTMLElement>(s: string) => $<T>(s, root);

  // ================= masterplan, cotizador y tabla =================
  const pattern = "ddvrdvddrdvdddrvdvdd",
    lots: Lot[] = [];
  for (let i = 0; i < 20; i++) {
    const c = i % 5,
      r = Math.floor(i / 5),
      m2 = Math.round(300 + ((i * 53) % 180));
    lots.push({ id: String(i + 1).padStart(2, "0"), x: 24 + c * 96, y: 24 + r * 76 + (r > 1 ? 18 : 0), s: pattern[i] as Lot["s"], m2, price: Math.round((m2 * 92) / 100) * 100 });
  }
  const mp = q<SVGSVGElement>("#mp"),
    info = q("#mpInfo"),
    ant = q<HTMLInputElement>("#ant"),
    cotUnit = q("#cotUnit"),
    tbody = q("#uni tbody");
  let sel = 6,
    n = 24,
    custom: { price: number } | null = null;

  if (mp) {
    // un solo tab stop (el lote elegido); con las flechas se recorre la grilla de 5 × 4
    mp.innerHTML =
      `<rect x="10" y="176" width="500" height="10" fill="#2E2A26"/>` +
      lots
        .map(
          (l, i) =>
            `<rect class="lot ${l.s}" data-i="${i}" x="${l.x}" y="${l.y}" width="88" height="66" rx="3" tabindex="-1" role="button" aria-pressed="false" aria-label="Lote ${l.id}, ${ST[l.s]}, ${l.m2} m², ${usd(l.price)}"/><text x="${l.x + 8}" y="${l.y + 18}" aria-hidden="true"${l.s === "v" ? ' style="fill:rgba(255,255,255,.5)"' : ""}>${l.id}</text>`,
        )
        .join("");
  }
  const lotEls = mp ? $$<SVGRectElement>(".lot", mp) : [];

  const cot = () => {
    if (!ant) return;
    const price = custom ? custom.price : lots[sel].price,
      a = +ant.value / 100;
    const antV = q("#antV"),
      precio = q("#precioU"),
      cuota = q("#cuota");
    if (antV) antV.textContent = ant.value + " %";
    ant.setAttribute("aria-valuetext", ant.value + " %");
    if (precio) precio.textContent = "Precio " + usd(price);
    if (cuota) cuota.textContent = usd((price * (1 - a)) / n);
  };
  const markLots = (i: number | null) =>
    lotEls.forEach((x) => {
      const me = +x.dataset.i! === i;
      x.classList.toggle("sel", me);
      x.setAttribute("aria-pressed", String(me));
    });
  const markRows = (i: number | null) =>
    tbody &&
    $$("tr", tbody).forEach((tr) => {
      const me = +tr.dataset.i! === i;
      tr.classList.toggle("sel", me);
      $("button", tr)?.setAttribute("aria-pressed", String(me));
    });

  function pick(i: number) {
    sel = i;
    custom = null;
    const l = lots[i];
    markLots(i);
    lotEls.forEach((x) => (x.tabIndex = +x.dataset.i! === i ? 0 : -1));
    if (info)
      info.innerHTML = `<p class="cap" style="font-size:11px">Lote ${l.id}</p><b>${usd(l.price)}</b><span class="st ${l.s}">${ST[l.s]}</span><div style="margin-top:12px"><div class="row"><span>Superficie</span><span>${l.m2} m²</span></div><div class="row"><span>Frente</span><span>${12 + (i % 4) * 2} m</span></div><div class="row"><span>Orientación</span><span>${["Norte", "Noreste", "Este", "Noroeste"][i % 4]}</span></div></div>`;
    if (cotUnit) cotUnit.textContent = "Lote " + l.id;
    markRows(i);
    cot();
  }
  /** la torre manda una unidad al cotizador (en el diseño quedó preparado pero sin usar) */
  const cotSet = (label: string, price: number) => {
    custom = { price };
    if (cotUnit) cotUnit.textContent = label;
    markLots(null);
    markRows(null);
    cot();
  };

  if (mp) {
    on(mp, "click", (e) => {
      const r = (e.target as Element).closest<SVGRectElement>(".lot");
      if (r) pick(+r.dataset.i!);
    });
    on(mp, "keydown", (e) => {
      const r = (e.target as Element).closest<SVGRectElement>(".lot");
      if (!r) return;
      const i = +r.dataset.i!;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        pick(i);
        return;
      }
      const c = i % 5,
        row = Math.floor(i / 5);
      const to =
        e.key === "ArrowRight" ? row * 5 + Math.min(4, c + 1)
        : e.key === "ArrowLeft" ? row * 5 + Math.max(0, c - 1)
        : e.key === "ArrowDown" ? Math.min(3, row + 1) * 5 + c
        : e.key === "ArrowUp" ? Math.max(0, row - 1) * 5 + c
        : e.key === "Home" ? 0
        : e.key === "End" ? lots.length - 1
        : -1;
      if (to < 0) return;
      e.preventDefault();
      lotEls.forEach((x) => (x.tabIndex = -1));
      lotEls[to].tabIndex = 0;
      lotEls[to].focus();
    });
  }

  // tabla: lotes no vendidos (los primeros 7); cada fila tiene un botón para el teclado
  if (tbody) {
    tbody.innerHTML = lots
      .map((l, i) => ({ ...l, i }))
      .filter((l) => l.s !== "v")
      .slice(0, 7)
      .map(
        (l) =>
          `<tr data-i="${l.i}"><td><button type="button" class="uni-pick" aria-pressed="false" aria-label="Lote ${l.id}: elegir para el cotizador">Lote ${l.id}</button></td><td>${l.m2} m²</td><td>${usd(l.price)}</td><td><span class="st ${l.s}">${ST[l.s]}</span></td></tr>`,
      )
      .join("");
    on(tbody, "click", (e) => {
      const tr = (e.target as Element).closest<HTMLElement>("tr[data-i]");
      if (tr) pick(+tr.dataset.i!);
    });
  }
  const uniCount = q("#uniCount");
  if (uniCount) uniCount.textContent = lots.filter((l) => l.s === "d").length + " disponibles";

  if (ant) on(ant, "input", cot);
  const segBtns = $$<HTMLButtonElement>("#seg button", root);
  segBtns.forEach((b) =>
    on(b, "click", () => {
      n = +b.textContent!;
      segBtns.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      cot();
    }),
  );
  // el resultado se anuncia cuando cambia el anticipo o las cuotas
  const res = q(".cot .res");
  res?.setAttribute("aria-live", "polite");
  res?.setAttribute("aria-atomic", "true");
  if (mp) pick(6);
  else cot();

  // ================= tour 360 =================
  const tour = q("#tour"),
    pano = q("#pano"),
    deg = q("#deg");
  if (tour && pano) {
    let o = 0,
      drag = false,
      lx = 0,
      shown = -1,
      paused = false,
      visible = false,
      raf = 0,
      last = 0;
    // sin mouse también: un slider de 0 a 359° que se gira con las flechas
    tour.setAttribute("role", "slider");
    tour.tabIndex = 0;
    tour.setAttribute("aria-valuemin", "0");
    tour.setAttribute("aria-valuemax", "359");
    const set = () => {
      const w = pano.offsetWidth / 3;
      if (!w) return;
      o = ((o % w) + w) % w;
      pano.style.transform = `translateX(${-o}px)`;
      const d = Math.round((o / w) * 360) % 360;
      if (d === shown) return;
      shown = d;
      if (deg) deg.textContent = d + "°";
      tour.setAttribute("aria-valuenow", String(d));
      tour.setAttribute("aria-valuetext", d + "°");
    };
    set();
    on(tour, "pointerdown", (e) => {
      drag = true;
      lx = e.clientX;
      tour.setPointerCapture(e.pointerId);
    });
    on(tour, "pointermove", (e) => {
      if (!drag) return;
      o -= e.clientX - lx;
      lx = e.clientX;
      set();
    });
    const up = () => {
      drag = false;
      wake();
    };
    // con imágenes reales el navegador arrancaba el drag nativo de la <img> y cortaba el arrastre
    on(tour, "dragstart", (e) => e.preventDefault());
    on(tour, "pointerup", up);
    on(tour, "pointercancel", up);
    on(tour, "keydown", (e) => {
      const w = pano.offsetWidth / 3,
        step = e.shiftKey ? 45 : 15;
      const d = e.key === "ArrowRight" || e.key === "ArrowUp" ? step : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -step : e.key === "Home" ? -shown : 0;
      if (!d || !w) return;
      e.preventDefault();
      o += (d / 360) * w;
      set();
    });
    // giro solo: frena con el mouse encima, con foco o arrastrando (y nunca con movimiento reducido)
    const pause = (v: boolean) => () => {
      paused = v;
      wake();
    };
    on(tour, "pointerenter", pause(true));
    on(tour, "pointerleave", pause(false));
    on(tour, "focus", pause(true));
    on(tour, "blur", pause(false));
    const spin = (t: number) => {
      raf = 0;
      if (!visible || paused || drag || reducedMotion()) return;
      if (last) {
        o += Math.min(64, t - last) * 0.02;
        set();
      }
      last = t;
      raf = requestAnimationFrame(spin);
    };
    function wake() {
      if (raf || !visible || paused || drag || reducedMotion()) return;
      last = 0;
      raf = requestAnimationFrame(spin);
    }
    const io = new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
      wake();
    });
    io.observe(tour);
    const ro = new ResizeObserver(set);
    ro.observe(pano);
    off.push(() => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    });
  }

  // ================= BIM: los pisos se separan (hover, toque o teclado) =================
  const bim = q("#bim"),
    bimSvg = q("#bimSvg");
  if (bim && bimSvg) {
    let fl = "";
    const cols = ["#d9d9de", "#6E6CFF", "#d9d9de", "#d9d9de", "#2D2BFF", "#d9d9de"];
    for (let i = 0; i < 6; i++) {
      const y = 180 - i * 24;
      fl += `<g class="fl" style="--i:${i}"><polygon points="180,${y - 40} 300,${y} 180,${y + 40} 60,${y}" fill="${cols[i]}"/><polygon points="60,${y} 180,${y + 40} 180,${y + 52} 60,${y + 12}" fill="#5a5a66"/><polygon points="180,${y + 40} 300,${y} 300,${y + 12} 180,${y + 52}" fill="#55534E"/></g>`;
    }
    bimSvg.innerHTML = fl;
    bimSvg.setAttribute("aria-hidden", "true");
    bim.setAttribute("role", "button");
    bim.tabIndex = 0;
    bim.setAttribute("aria-label", "Modelo BIM del edificio: separar los pisos");
    bim.setAttribute("aria-pressed", "false");
    const toggle = () => bim.setAttribute("aria-pressed", String(bim.classList.toggle("open")));
    on(bim, "click", toggle);
    on(bim, "keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      toggle();
    });
  }

  // ================= torre: ficha, tooltip y lista accesible de unidades =================
  const units = towerUnits();
  const card = q("#unitCard"),
    tip = q("#twTip"),
    tw = q(".tower-3d");
  let tower: Tower | null = null,
    unitSel: number | null = null;
  const showUnit = (i: number, from3d: boolean) => {
    unitSel = i;
    const u = units[i];
    if (card) card.innerHTML = ficha(u) + "<em>Unidad seleccionada</em>";
    if (from3d && list) list.value = String(i);
    else tower?.select(i);
    if (u.st !== "Vendida") cotSet("Unidad " + u.label, u.price);
  };
  // la torre solo se ve con el mouse: esta lista deja elegir cualquier unidad con teclado,
  // lector de pantalla, o sin WebGL (con la imagen de respaldo)
  let list: HTMLSelectElement | null = null;
  const txt = q(".tw-txt");
  if (card && txt) {
    const wrap = document.createElement("div");
    wrap.className = "tw-pick";
    wrap.innerHTML =
      `<label for="twUnit">Ver una unidad</label><select id="twUnit"><option value="">Elegí…</option>` +
      Array.from({ length: TOWER_FLOORS }, (_, f) => TOWER_FLOORS - 1 - f)
        .map(
          (f) =>
            `<optgroup label="Piso ${f + 1}">${units
              .slice(f * 4, f * 4 + 4)
              .map((u, k) => `<option value="${f * 4 + k}">${u.label} · ${u.m2} m² · ${u.st}</option>`)
              .join("")}</optgroup>`,
        )
        .join("") +
      `</select>`;
    card.after(wrap);
    list = $<HTMLSelectElement>("select", wrap);
    on(list!, "change", () => list!.value !== "" && showUnit(+list!.value, false));
    off.push(() => wrap.remove());
  }
  if (tw) {
    off.push(
      lazyScene(tw, () =>
        import("./scenes/tower").then((m) => ({
          mount: (el: HTMLElement) => {
            const t = m.mountTower(el, {
              units,
              onHover(i, x, y, w, h) {
                if (!tip) return;
                if (i === null) {
                  tip.hidden = true;
                  return;
                }
                tip.hidden = false;
                tip.innerHTML = ficha(units[i]);
                tip.style.transform = `translate(${Math.max(0, Math.min(x + 14, w - 170))}px,${Math.max(0, Math.min(y - 70, h - 80))}px)`;
              },
              onPick: (i) => showUnit(i, true),
            });
            tower = t;
            if (unitSel !== null) t.select(unitSel);
            return () => {
              tower = null;
              if (tip) tip.hidden = true;
              t.dispose();
            };
          },
        })),
      ),
    );
  }

  return () => off.forEach((f) => f());
}
