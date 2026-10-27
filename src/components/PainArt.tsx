import { useId } from "react";
import type { Lang } from "@/i18n";

// Ilustraciones animadas de las tarjetas de "lo que pasa hoy" (portadas del diseño): el
// dibujo se elige por palabras del texto y se anima con CSS cuando la tarjeta entra.

type Kind = "sheet" | "repeat" | "report" | "ig" | "chat" | "pdf" | "price" | "team" | "search" | "web" | "list";

// palabras clave en español (sin cambios) y en inglés: cada texto en inglés elige el mismo dibujo que su par en español
function kindOfEs(T: string): Kind {
  return T.includes("planilla")
    ? "sheet"
    : T.includes("a mano")
      ? "repeat"
      : T.includes("reporte")
        ? "report"
        : T.includes("instagram")
          ? "ig"
          : T.includes("whatsapp")
            ? "chat"
            : T.includes("pdf") || T.includes("render")
              ? "pdf"
              : T.includes("precio") || T.includes("cuota") || T.includes("presupuesto") || T.includes("m²")
                ? "price"
                : T.includes("consulta") || T.includes("pregunta") || T.includes("pide")
                  ? "chat"
                  : T.includes("equipo") || T.includes("persona")
                    ? "team"
                    : T.includes("busca") || T.includes("googlea") || T.includes("compara") || T.includes("revisan")
                      ? "search"
                      : T.includes("web")
                        ? "web"
                        : "list";
}

const EN: [RegExp, Kind][] = [
  [/spreadsheet|excel/, "sheet"],
  [/by hand|manual/, "repeat"],
  [/\breport/, "report"],
  [/instagram/, "ig"],
  [/whatsapp/, "chat"],
  [/pdf|render/, "pdf"],
  [/\bpric|\bcost|budget|quote|estimate|installment|payment|m²|sq\.? ?ft/, "price"],
  [/inquir|question|\bask/, "chat"],
  [/\bteam|\bperson\b|one-person|staff/, "team"],
  [/search|google|compar|look(s|ing)? (you |them |it )?up|\bcheck|review|research|shop(s|ping)? around/, "search"],
  [/web/, "web"],
];
const kindOfEn = (T: string): Kind => EN.find(([re]) => re.test(T))?.[1] ?? "list";

// sin `lang`, el idioma se deduce del texto (acentos, ¿¡ o palabras muy comunes del español)
const looksEs = (T: string) => /[áéíóúñ¿¡]|\b(el|la|los|las|de|del|que|y|un|una|se|por|con|sin|tu)\b/.test(T);

/** Dibujo e idioma de los textos del dibujo. */
function pick(text: string, lang?: Lang): { k: Kind; lang: Lang } {
  const T = text.toLowerCase();
  const l = lang ?? (looksEs(T) ? "es" : "en");
  return { k: l === "es" ? kindOfEs(T) : kindOfEn(T), lang: l };
}

// textos de las ilustraciones (son decorativas: aria-hidden)
const TX = {
  es: {
    q: "estudio arquitectura córdoba",
    r1: "Estudio Norte · Portfolio",
    r2: "Arq. Ramos · Obras y proyectos",
    r3: "Tu estudio · sin web",
    r3n: "resultado 14",
    best: "Tu mejor obra",
    ago: "hace 2 semanas",
    lost: "↓ se pierde en el feed",
    b1: "¿Tienen disponibilidad?",
    b2: "¿Me pasan planos?",
    b3: "¿Y el precio?",
    seen: "visto · sin respuesta",
    unopened: "8 meses sin abrir",
    monthly: "Cuota mensual",
    plan: "anticipo · cuotas",
    later1: "“Te paso el",
    later2: "precio después”",
    never: "…y nunca llega",
    studio: "el estudio",
    who: "¿quién más trabaja?",
    updated: "© 2017 · última actualización",
    file: "Ventas_FINAL_v4 (2).xlsx",
    ref: "#¡REF!",
    juan: "solo Juan sabe",
    again: "la misma carga, otra vez",
    rep1: "Armando",
    rep2: "el reporte…",
    hours: "2 h por semana",
    list: ["Plazo de obra", "Qué incluye", "Cómo trabajan"],
  },
  en: {
    q: "architecture firm córdoba",
    r1: "Studio Norte · Portfolio",
    r2: "Ramos Architects · Built work",
    r3: "Your studio · no site",
    r3n: "result #14",
    best: "Your best work",
    ago: "2 weeks ago",
    lost: "↓ lost in the feed",
    b1: "Any units available?",
    b2: "Can I see plans?",
    b3: "And pricing?",
    seen: "seen · no reply",
    unopened: "8 months unopened",
    monthly: "Monthly payment",
    plan: "deposit · monthly",
    later1: "“I’ll send you",
    later2: "the price later”",
    never: "…and it never does",
    studio: "the studio",
    who: "who else is there?",
    updated: "© 2017 · last updated",
    file: "Sales_FINAL_v4 (2).xlsx",
    ref: "#REF!",
    juan: "only Juan knows",
    again: "same data entry, again",
    rep1: "Building",
    rep2: "the report…",
    hours: "2 hours a week",
    list: ["Build timeline", "What’s included", "How they work"],
  },
} satisfies Record<Lang, Record<string, string | string[]>>;

function art(k: Kind, UID: string, lang: Lang): string {
  const t = TX[lang];
  const S: Record<Kind, string> = {
    search: `<rect x="4" y="6" width="212" height="26" rx="13" class="s fill"/><circle cx="20" cy="19" r="5" class="s"/><path d="M24 23l4 4" class="s"/>
    <text x="34" y="23" class="tx">${t.q}</text><rect x="33" y="10" width="178" height="18" class="bg a-type"/><rect x="34" y="12" width="1.4" height="14" class="acc a-car"/>
    <g class="a-r1"><circle cx="12" cy="48" r="4" class="f o"/><text x="22" y="51" class="t2">${t.r1}</text><text x="164" y="51" class="t3">★★★★★</text></g>
    <g class="a-r2"><circle cx="12" cy="66" r="4" class="f o"/><text x="22" y="69" class="t2">${t.r2}</text><text x="168" y="69" class="t3">★★★★</text></g>
    <g class="a-r3"><circle cx="12" cy="84" r="4" class="acc"/><text x="22" y="87" class="t2 acct">${t.r3}</text><text x="160" y="87" class="t3">${t.r3n}</text></g>`,
    ig: `<rect x="6" y="2" width="70" height="104" rx="10" class="s fill"/><clipPath id="clipig${UID}"><rect x="10" y="12" width="62" height="90" rx="4"/></clipPath>
    <g clip-path="url(#clipig${UID})"><g class="a-feed">${[0, 1, 2, 3, 4, 5, 6].map((r) => [0, 1, 2].map((c) => `<rect x="${11 + c * 20.5}" y="${13 + r * 20.5}" width="19" height="19" rx="2" class="${r === 1 && c === 1 ? "acc" : "f o"}"/>`).join("")).join("")}</g></g>
    <text x="90" y="30" class="t2">${t.best}</text><text x="90" y="44" class="t3 a-ago">${t.ago}</text><path d="M90 60h110" class="s dash a-dash"/><text x="90" y="80" class="t3">${t.lost}</text>`,
    chat: `<g class="a-b1"><rect x="4" y="4" width="128" height="22" rx="11" class="f o"/><text x="14" y="18" class="t2">${t.b1}</text></g>
    <g class="a-b2"><rect x="4" y="32" width="112" height="22" rx="11" class="f o"/><text x="14" y="46" class="t2">${t.b2}</text></g>
    <g class="a-b3"><rect x="4" y="60" width="96" height="22" rx="11" class="f o"/><text x="14" y="74" class="t2">${t.b3}</text></g>
    <g class="a-wait"><rect x="150" y="60" width="48" height="22" rx="11" class="acc"/><circle cx="164" cy="71" r="2.6" class="dotw d1"/><circle cx="174" cy="71" r="2.6" class="dotw d2"/><circle cx="184" cy="71" r="2.6" class="dotw d3"/></g>
    <text x="104" y="98" class="t3 a-seen">${t.seen}</text>`,
    pdf: `<g class="a-file"><path d="M10 6h52l16 16v78H10z" class="s fill"/><path d="M62 6v16h16" class="s"/><rect x="18" y="34" width="52" height="30" rx="3" class="f o2"/><path d="M22 60l12-14 10 10 8-6 14 10" class="s"/><text x="18" y="84" class="lbl">PDF</text></g>
    <text x="94" y="30" class="t2">renders_final_v3.pdf</text><text x="94" y="46" class="t3">142 MB</text>
    <circle cx="104" cy="74" r="10" class="s"/><path d="M104 74v-6" class="s a-hand"/><text x="120" y="78" class="t3">${t.unopened}</text>`,
    price: `<rect x="6" y="6" width="120" height="96" rx="10" class="s fill"/><text x="16" y="24" class="t3">${t.monthly}</text><text x="16" y="48" class="num a-num">USD ?</text>
    <rect x="16" y="64" width="100" height="4" rx="2" class="f o"/><circle cx="40" cy="66" r="6" class="acc a-knob"/><text x="16" y="88" class="t3">${t.plan}</text>
    <text x="140" y="44" class="t2">${t.later1}</text><text x="140" y="58" class="t2">${t.later2}</text><text x="140" y="80" class="t3 a-seen">${t.never}</text>`,
    team: `<circle cx="30" cy="34" r="16" class="acc"/><path d="M8 82c3-14 12-20 22-20s19 6 22 20" class="s"/><text x="6" y="100" class="t3">${t.studio}</text>
    ${[
      [86, 1],
      [130, 2],
      [174, 3],
    ]
      .map(
        ([x, i]) =>
          `<g class="a-ghost g${i}"><circle cx="${x}" cy="34" r="14" class="s dashl"/><text x="${x - 4}" y="39" class="q">?</text><path d="M${x - 19} 80c3-11 10-16 19-16s16 5 19 16" class="s dashl"/></g>`,
      )
      .join("")}<text x="80" y="100" class="t3">${t.who}</text>`,
    web: `<rect x="4" y="4" width="212" height="100" rx="8" class="s fill"/><path d="M4 18h212" class="s"/><circle cx="14" cy="11" r="2.2" class="f"/><circle cx="22" cy="11" r="2.2" class="f"/><circle cx="30" cy="11" r="2.2" class="f"/>
    <g class="a-glitch"><rect x="14" y="28" width="96" height="12" rx="2" class="f o"/></g><rect x="14" y="46" width="70" height="6" rx="3" class="f o2"/><rect x="14" y="58" width="84" height="6" rx="3" class="f o2 a-glitch2"/>
    <g class="a-glitch3"><rect x="130" y="28" width="74" height="48" rx="3" class="s"/><path d="M140 66l12-14 10 10 6-5 14 9" class="s o"/><path d="M134 32l66 40M200 32l-66 40" class="s o"/></g>
    <text x="14" y="92" class="t3">${t.updated}</text>`,
    sheet: `<rect x="4" y="4" width="212" height="100" rx="8" class="s fill"/><rect x="4" y="4" width="212" height="18" rx="8" class="f o2"/><text x="14" y="17" class="t3">${t.file}</text>${[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${12 + c * 50}" y="${30 + r * 17}" width="46" height="13" rx="2" class="${r === 1 && c === 2 ? "err" : "f o"}"/>`).join("")).join("")}<text x="113" y="57" class="t3 errt a-num">${t.ref}</text><g class="a-who"><circle cx="196" cy="88" r="9" class="acc"/><text x="140" y="92" class="t3">${t.juan}</text></g>`,
    repeat: `<circle cx="44" cy="54" r="34" class="s"/><path d="M44 30v24l16 10" class="s a-hand2"/><g class="a-rep"><rect x="96" y="20" width="110" height="16" rx="4" class="f o"/><rect x="96" y="44" width="110" height="16" rx="4" class="f o"/><rect x="96" y="68" width="110" height="16" rx="4" class="f o"/></g><text x="96" y="100" class="t3">${t.again}</text>`,
    report: `<rect x="4" y="4" width="130" height="100" rx="8" class="s fill"/>${[0, 1, 2, 3, 4].map((k) => `<rect x="${18 + k * 22}" y="${84 - [20, 34, 26, 48, 40][k]}" width="14" height="${[20, 34, 26, 48, 40][k]}" rx="2" class="f o a-bar b${k}"/>`).join("")}<path d="M18 92h104" class="s"/><text x="148" y="36" class="t2">${t.rep1}</text><text x="148" y="50" class="t2">${t.rep2}</text><text x="148" y="80" class="t3 a-seen">${t.hours}</text>`,
    list: `${t.list.map((x, i) => `<g class="a-row r${i}"><rect x="6" y="${8 + i * 30}" width="20" height="20" rx="5" class="s"/><text x="12" y="${23 + i * 30}" class="q">?</text><text x="36" y="${22 + i * 30}" class="t2">${x}</text><rect x="${130}" y="${15 + i * 30}" width="${70 - i * 14}" height="6" rx="3" class="f o2"/></g>`).join("")}`,
  };
  return S[k];
}

/** `lang`: idioma del texto (conviene pasarlo; sin él se deduce de las palabras clave). */
export function PainArt({ text, lang }: { text: string; lang?: Lang }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const p = pick(text, lang);
  return <svg className={`pa pa-${p.k}`} viewBox="0 0 220 108" aria-hidden="true" dangerouslySetInnerHTML={{ __html: art(p.k, uid, p.lang) }} />;
}

/** Tarjeta numerada con su ilustración. */
export function PainCard({ text, n, lang }: { text: string; n: number; lang?: Lang }) {
  return (
    <article className="pcard glass rv">
      <PainArt text={text} lang={lang} />
      <span className="n">0{n}</span>
      <p>{text}</p>
    </article>
  );
}
