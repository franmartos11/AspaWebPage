// Sistemas · "flujo vivo + iPhone": el diagrama de tareas que el sistema hace solo después de
// un disparador, con un pulso que recorre las conexiones, el resumen final y las
// notificaciones que se van apilando en el celular. El control segmentado cambia el flujo.
import { $, $$, clamp, fontsReady, onTick, pageLang, reducedMotion } from "./core";
import { initSeg } from "./ui";

/* ---------- íconos de los nodos (trazos con pathLength=1 para dibujarlos) ---------- */
const FI: Record<string, string> = {
  chat: '<path d="M4 5h16v11H9l-5 4z" pathLength="1"/>',
  globe: '<circle cx="12" cy="12" r="8" pathLength="1"/><path d="M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16" pathLength="1"/>',
  sys: '<path d="M12 3l8 16H4z" pathLength="1"/><path d="M9 14h6" pathLength="1"/>',
  box: '<path d="M4 8l8-4 8 4v8l-8 4-8-4z" pathLength="1"/><path d="M4 8l8 4 8-4M12 12v8" pathLength="1"/>',
  doc: '<path d="M6 3h9l3 3v15H6z" pathLength="1"/><path d="M9 10h6M9 14h6M9 18h4" pathLength="1"/>',
  user: '<circle cx="12" cy="8" r="4" pathLength="1"/><path d="M4 20c1-4 4-6 8-6s7 2 8 6" pathLength="1"/>',
  cal: '<rect x="4" y="5" width="16" height="15" rx="2" pathLength="1"/><path d="M4 10h16M9 3v4M15 3v4" pathLength="1"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" pathLength="1"/><path d="M10 20h4" pathLength="1"/>',
  check: '<circle cx="12" cy="12" r="8" pathLength="1"/><path d="M8 12l3 3 5-6" pathLength="1"/>',
  team: '<circle cx="9" cy="9" r="3" pathLength="1"/><circle cx="17" cy="10" r="2.5" pathLength="1"/><path d="M3 19c1-3 3-5 6-5s5 2 6 5M14 19c.5-2 2-3.5 4-3.5s3 1 3.5 3.5" pathLength="1"/>',
  link: '<path d="M10 14l4-4M8 12l-2 2a3 3 0 0 0 4 4l2-2M16 12l2-2a3 3 0 0 0-4-4l-2 2" pathLength="1"/>',
  card: '<rect x="3" y="6" width="18" height="12" rx="2" pathLength="1"/><path d="M3 10h18M7 15h4" pathLength="1"/>',
  chart: '<path d="M4 20h16" pathLength="1"/><path d="M7 16v-4M12 16V8M17 16v-7" pathLength="1"/>',
  mail: '<rect x="3" y="6" width="18" height="12" rx="2" pathLength="1"/><path d="M3 7l9 6 9-6" pathLength="1"/>',
};

// nodo: [ícono, título, detalle, segundos, explicación]; notificación: [app, título, detalle]
type Node = [string, string, string, number, string];
type Ntf = [string, string, string];
const FLOWS_ES: { n: Node[]; m: Ntf[] }[] = [
  {
    n: [
      ["chat", "WhatsApp", "Pedido de Lucía: 2 × Yerba 1 kg", 0.2, "Recibe el pedido que llega por WhatsApp."],
      ["sys", "Sistema", "Pedido #1048 creado", 0.6, "Crea el pedido con el cliente y los productos."],
      ["box", "Stock", "Yerba 1 kg: 12 → 10 u.", 0.4, "Descuenta el stock y avisa si queda poco."],
      ["doc", "Facturación", "Factura B emitida", 1.2, "Emite la factura electrónica."],
      ["user", "Cliente", "Le avisamos por WhatsApp que su pedido está listo", 0.8, "Le avisa al cliente sin que nadie escriba."],
    ],
    m: [
      ["Aspa", "Nuevo pedido #1048", "Lucía, 2 productos"],
      ["Stock", "Stock bajo", "Yerba 1 kg (10 u.)"],
      ["Facturación", "Factura B 0003-00001048", "Emitida"],
      ["Aspa", "Pedido listo", "Avisamos a Lucía"],
    ],
  },
  {
    n: [
      ["globe", "Web", "Turno pedido para el jueves 10:30", 0.3, "Toma el turno que el cliente pide en la web."],
      ["cal", "Agenda", "Asignado a Martín", 0.5, "Lo asigna a quien tiene lugar en la agenda."],
      ["bell", "Recordatorio", "WhatsApp 24 h antes", 0.4, "Programa el recordatorio para el día anterior."],
      ["check", "Confirmación", "Confirmado por el cliente", 1.1, "Registra la confirmación del cliente."],
      ["team", "Equipo", "Martín recibe la orden de trabajo en su celular", 0.9, "Le manda la orden de trabajo al técnico."],
    ],
    m: [
      ["Aspa", "Turno nuevo", "Jueves 10:30"],
      ["Agenda", "Asignado a Martín", "Jueves 10:30"],
      ["WhatsApp", "Recordatorio enviado", "24 h antes"],
      ["Aspa", "Turno confirmado ✓", "Por el cliente"],
    ],
  },
  {
    n: [
      ["cal", "Calendario", "Vence la cuota de Kardu", 0.2, "Detecta las cuotas que están por vencer."],
      ["link", "Cobranzas", "Link de pago generado", 0.7, "Genera el link de pago del monto exacto."],
      ["mail", "Aviso", "Mail y WhatsApp enviados", 1, "Le avisa al cliente por mail y WhatsApp."],
      ["card", "Pago", "Pago recibido", 0.8, "Registra el pago cuando entra."],
      ["chart", "Tablero", "Cobrado este mes actualizado", 0.5, "Actualiza los números del mes."],
    ],
    m: [
      ["Cobranzas", "Cuota por vencer", "Kardu"],
      ["Cobranzas", "Link de pago enviado", "Kardu"],
      ["Aspa", "Pago recibido", "USD 20"],
      ["Tablero", "Tablero actualizado", "Cobrado este mes"],
    ],
  },
];

const FLOWS_EN: typeof FLOWS_ES = [
  {
    n: [
      ["chat", "WhatsApp", "Order from Lucía: 2 × Yerba 1 kg", 0.2, "Picks up the order that comes in on WhatsApp."],
      ["sys", "System", "Order #1048 created", 0.6, "Creates the order with the customer and the products."],
      ["box", "Inventory", "Yerba 1 kg: 12 → 10 units", 0.4, "Updates stock and warns you when it runs low."],
      ["doc", "Invoicing", "Invoice issued", 1.2, "Issues the electronic invoice."],
      ["user", "Customer", "We let her know on WhatsApp that her order is ready", 0.8, "Notifies the customer without anyone typing a word."],
    ],
    m: [
      ["Aspa", "New order #1048", "Lucía, 2 items"],
      ["Inventory", "Low stock", "Yerba 1 kg (10 units)"],
      ["Invoicing", "Invoice 0003-00001048", "Issued"],
      ["Aspa", "Order ready", "Lucía notified"],
    ],
  },
  {
    n: [
      ["globe", "Website", "Booking requested for Thursday 10:30", 0.3, "Takes the booking the customer requests on your website."],
      ["cal", "Schedule", "Assigned to Martín", 0.5, "Assigns it to whoever has an open slot."],
      ["bell", "Reminder", "WhatsApp 24 h before", 0.4, "Schedules the reminder for the day before."],
      ["check", "Confirmation", "Confirmed by the customer", 1.1, "Logs the customer's confirmation."],
      ["team", "Team", "Martín gets the work order on his phone", 0.9, "Sends the work order to the technician."],
    ],
    m: [
      ["Aspa", "New booking", "Thursday 10:30"],
      ["Schedule", "Assigned to Martín", "Thursday 10:30"],
      ["WhatsApp", "Reminder sent", "24 h before"],
      ["Aspa", "Booking confirmed ✓", "By the customer"],
    ],
  },
  {
    n: [
      ["cal", "Calendar", "Kardu's payment is coming due", 0.2, "Spots the payments that are about to come due."],
      ["link", "Collections", "Payment link created", 0.7, "Creates a payment link for the exact amount."],
      ["mail", "Reminder", "Email and WhatsApp sent", 1, "Notifies the customer by email and WhatsApp."],
      ["card", "Payment", "Payment received", 0.8, "Records the payment as soon as it lands."],
      ["chart", "Dashboard", "Collected this month updated", 0.5, "Updates the month's numbers."],
    ],
    m: [
      ["Collections", "Payment coming due", "Kardu"],
      ["Collections", "Payment link sent", "Kardu"],
      ["Aspa", "Payment received", "USD 20"],
      ["Dashboard", "Dashboard updated", "Collected this month"],
    ],
  },
];

// textos que arma el flujo, por idioma
const TXT = {
  es: { tasks: "tareas", people: "personas", now: "ahora", dec: "," },
  en: { tasks: "tasks", people: "people", now: "now", dec: "." },
};

// línea de tiempo (ms): el nodo k se prende en 300 + k·1000, su conexión se dibuja 150 ms
// después durante 600 ms, el resumen aparece en 4700 y el ciclo vuelve a empezar en 7800
const ON0 = 300,
  STEP = 1000,
  LN_DELAY = 150,
  LN_DUR = 600,
  SUM_AT = 4700,
  LOOP = 7800;

const fmtSec = (s: number, dec = ",") => String(Math.round(s * 10) / 10).replace(".", dec) + " s";

const NODE_HTML =
  '<span class="ftime"></span><svg class="ficon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"></svg><b></b><small></small><i class="fcheck" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 8.5l2.5 2.5L12 5.5"/></svg></i><span class="ftip glass" role="tooltip"></span>';

/** Arma y anima el bloque del flujo (blk = .flow-blk). Devuelve la limpieza. */
export function initFlow(blk: HTMLElement): () => void {
  const d = $("#flowDia", blk) || $(".flow-dia", blk);
  const svg = $<SVGSVGElement>("#flowSvg", blk);
  const pu = $("#flowPulse", blk);
  const sum = $("#flowSum", blk);
  const st = $("#iphStack", blk);
  const sg = $('.seg[data-seg="flow"]', blk);
  if (!d || !svg || !pu) return () => {};
  const RM = reducedMotion();
  const L = TXT[pageLang()];
  const FLOWS = pageLang() === "en" ? FLOWS_EN : FLOWS_ES;
  const off: (() => void)[] = [];
  const timers = new Set<number>();
  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
  };

  let f = 0, // flujo elegido
    t = 0, // tiempo transcurrido del ciclo (ms)
    last = 0,
    vis = false,
    hov = false,
    swapping = false;
  let paths: SVGPathElement[] = [];

  /* ---------- nodos: se crean una vez y se rellenan según el flujo ---------- */
  // si ya estaban (remontaje en desarrollo), se reemplazan
  $$(".fnode", d).forEach((n) => n.remove());
  const nodes: HTMLElement[] = [];
  const enter = () => (hov = true);
  const leave = () => {
    hov = false;
    resume();
  };
  for (let i = 0; i < 5; i++) {
    const n = document.createElement("div");
    n.className = "fnode glass";
    n.tabIndex = 0;
    n.dataset.i = String(i);
    n.innerHTML = NODE_HTML;
    // con el mouse o el foco encima, el ciclo se pausa para poder leer el tooltip
    n.addEventListener("mouseenter", enter);
    n.addEventListener("mouseleave", leave);
    n.addEventListener("focus", enter);
    n.addEventListener("blur", leave);
    d.appendChild(n);
    nodes.push(n);
  }
  off.push(() => nodes.forEach((n) => n.remove()));

  const fill = () => {
    const F = FLOWS[f];
    nodes.forEach((n, i) => {
      const x = F.n[i];
      $(".ficon", n)!.innerHTML = FI[x[0]];
      $("b", n)!.textContent = x[1];
      $("small", n)!.textContent = x[2];
      $(".ftime", n)!.textContent = fmtSec(x[3], L.dec);
      $(".ftip", n)!.textContent = x[4];
      n.setAttribute("aria-label", `${x[1]}: ${x[2]}. ${x[4]}`);
    });
    // el resumen solo se reescribe si cambia (es aria-live; hoy los tres flujos suman 3,2 s)
    if (sum) {
      const txt = `5 ${L.tasks} · ${fmtSec(
        F.n.reduce((a, x) => a + x[3], 0),
        L.dec,
      )} · 0 ${L.people}`;
      if (sum.textContent!.trim() !== txt) sum.textContent = txt;
    }
  };

  /* ---------- ubicación de los nodos y curvas que los unen ---------- */
  const layout = () => {
    if (!d.offsetParent) return;
    const W = d.clientWidth,
      vert = innerWidth <= 980;
    if (!vert) {
      // escalera en zigzag sobre el alto del diagrama
      const H = d.clientHeight,
        xs = [0, 0.85, 0.12, 0.62, 1],
        ys = [0, 0.24, 0.48, 0.7, 0.94];
      nodes.forEach((n, i) => {
        n.style.left = xs[i] * (W - n.offsetWidth) + "px";
        n.style.top = ys[i] * (H - n.offsetHeight - 60) + "px";
      });
    } else
      nodes.forEach((n) => {
        n.style.left = "";
        n.style.top = "";
      });
    const r0 = d.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${W} ${d.clientHeight}`);
    svg.innerHTML = nodes
      .slice(0, 4)
      .map((n, i) => {
        const a = n.getBoundingClientRect(),
          b = nodes[i + 1].getBoundingClientRect();
        const sx = a.left + a.width / 2 - r0.left,
          sy = a.bottom - r0.top,
          ex = b.left + b.width / 2 - r0.left,
          ey = b.top - r0.top - 14,
          dy = Math.max(30, ey - sy);
        const p = `M${sx} ${sy} C${sx} ${sy + dy * 0.6},${ex} ${ey - dy * 0.6},${ex} ${ey}`;
        return `<path class="fl-bg" d="${p}"/><path class="fl-ln" pathLength="1" d="${p}"/>`;
      })
      .join("");
    paths = $$<SVGPathElement>(".fl-ln", svg);
    apply();
  };

  /* ---------- estado visual para el tiempo t ---------- */
  let sumOn = false;
  const apply = () => {
    const T = t;
    nodes.forEach((n, k) => n.classList.toggle("on", T >= ON0 + k * STEP));
    let shown = false;
    paths.forEach((p, k) => {
      const u = (T - (ON0 + k * STEP + LN_DELAY)) / LN_DUR;
      p.style.strokeDashoffset = (1 - clamp(u, 0, 1)).toFixed(3);
      // el pulso viaja por la conexión que se está dibujando
      if (u > 0 && u < 1) {
        const pt = p.getPointAtLength(p.getTotalLength() * u);
        pu.style.transform = `translate3d(${pt.x}px,${pt.y}px,0)`;
        shown = true;
      }
    });
    pu.classList.toggle("on", shown);
    const on = T >= SUM_AT;
    if (sum && on !== sumOn) {
      sumOn = on;
      sum.classList.toggle("on", on);
    }
  };

  /* ---------- notificaciones del celular ---------- */
  const stack = () => {
    if (!st) return;
    const items = $$(".ntf:not(.out)", st);
    const h = (items[0] ? items[0].offsetHeight : 70) + 8;
    // las dos primeras enteras; las de atrás se achican y se desvanecen
    items.forEach((n, j) => {
      const y = j < 2 ? j * h : 2 * h + (j - 2) * 10,
        s = j < 2 ? 1 : 1 - (j - 1) * 0.05,
        o = j < 2 ? 1 : Math.max(0, 1 - (j - 1) * 0.3);
      n.style.transform = `translate3d(0,${y}px,0) scale(${s})`;
      n.style.opacity = String(o);
      n.style.zIndex = String(10 - j);
    });
  };
  const notify = (k: number) => {
    if (!st) return;
    const x = FLOWS[f].m[k];
    const n = document.createElement("div");
    n.className = "ntf glass";
    const ic = document.createElement("i");
    ic.className = "ntf-ic";
    ic.textContent = x[0] === "Aspa" ? "A" : x[0][0];
    const body = document.createElement("div");
    body.innerHTML = `<p><b></b><span>${L.now}</span></p><strong></strong><small></small>`;
    $("b", body)!.textContent = x[0];
    $("strong", body)!.textContent = x[1];
    $("small", body)!.textContent = x[2];
    n.append(ic, body);
    st.prepend(n);
    stack();
  };

  const reset = (first = false) => {
    t = 0;
    if (st) {
      if (first) st.innerHTML = "";
      else
        // las anteriores salen hacia la derecha y después se quitan
        $$(".ntf", st).forEach((x) => {
          x.classList.add("out");
          later(() => x.remove(), 600);
        });
    }
    apply();
  };

  // movimiento reducido: todo dibujado y las cuatro notificaciones ya en el celular
  const staticAll = () => {
    t = 99999;
    apply();
    if (!st) return;
    st.innerHTML = "";
    for (let k = 0; k < 4; k++) notify(k);
  };

  /* ---------- reloj: avanza solo si se ve, no hay hover y la pestaña está activa ---------- */
  const running = () => vis && !hov && !swapping && !document.hidden && !RM;
  const tick = (now: number) => {
    if (!running()) {
      last = 0; // al volver, el primer paso cuenta como un cuadro normal
      return false;
    }
    const dt = last ? Math.min(100, now - last) : 16;
    last = now;
    const prev = t;
    t += dt;
    // al prenderse cada nodo (desde el segundo) llega una notificación
    for (let k = 1; k < 5; k++) {
      const at = ON0 + k * STEP;
      if (prev < at && t >= at) notify(k - 1);
    }
    if (t >= LOOP) reset();
    apply();
    return true;
  };
  let unTick: (() => void) | null = null;
  const resume = () => {
    if (!running()) return;
    unTick?.();
    unTick = onTick(tick);
  };
  off.push(() => unTick?.());

  const io = new IntersectionObserver(
    (es) => {
      vis = es[0].isIntersecting;
      if (vis) {
        layout();
        resume();
      }
    },
    { threshold: 0.25 },
  );
  io.observe(d);
  off.push(() => io.disconnect());

  const onVis = () => !document.hidden && resume();
  document.addEventListener("visibilitychange", onVis);
  off.push(() => document.removeEventListener("visibilitychange", onVis));

  // cambia el ancho (resize, rotación, fuentes): se reubican nodos y curvas
  let rq = 0;
  const ro = new ResizeObserver(() => {
    cancelAnimationFrame(rq);
    rq = requestAnimationFrame(layout);
  });
  ro.observe(d);
  off.push(() => {
    ro.disconnect();
    cancelAnimationFrame(rq);
  });
  let alive = true;
  off.push(() => (alive = false));
  fontsReady().then(() => alive && layout());

  /* ---------- cambio de flujo desde el control segmentado ---------- */
  const set = (i: number) => {
    if (i === f) return;
    const swap = () => {
      f = i;
      fill();
      if (RM) {
        layout();
        staticAll();
        return;
      }
      reset();
      layout();
      swapping = false;
      d.classList.remove("swap");
      resume();
    };
    if (RM) return swap();
    swapping = true;
    d.classList.add("swap");
    later(swap, 320);
  };
  if (sg) off.push(initSeg(sg, set));

  fill();
  reset(true);
  requestAnimationFrame(() => {
    if (!alive) return;
    layout();
    if (RM) staticAll();
  });

  return () => {
    off.forEach((fn) => fn());
    timers.forEach((id) => clearTimeout(id));
    timers.clear();
    d.classList.remove("swap");
    svg.innerHTML = "";
    pu.classList.remove("on");
    sum?.classList.remove("on");
    if (st) st.innerHTML = "";
  };
}
