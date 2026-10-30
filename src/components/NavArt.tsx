import type { CSSProperties } from "react";
import type { RubroSlug } from "@/lib/webs";

// Ilustraciones 2D del menú (Webs y Sistemas): una por rubro o sistema, se arman al pasar el mouse (o con el foco) por
// su opción. Clases (globals.css, «menú de Webs»): d = trazo que se dibuja, p = pieza que crece desde
// abajo, r = sube y aparece, f = aparece, gl = luz que queda latiendo. `--d` es la demora.
// Mismo lenguaje que las escenas 3D de los rubros: primero el plano, después la obra.

const D = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function Arquitectos() {
  return (
    <>
      <path className="s d" pathLength={1} style={D(0)} d="M20 200H340" />
      {/* plano de la planta baja y el ala */}
      <path className="s a d" pathLength={1} style={D(0.1)} d="M70 200V112H210V200M210 200V142H300V200" />
      {/* volumen alto que vuela */}
      <path className="s d" pathLength={1} style={D(0.5)} d="M120 112V70H268V112" />
      <path className="s d" pathLength={1} style={D(0.75)} d="M58 112H222M108 70H280" />
      <rect className="fa f" style={D(1)} x="88" y="132" width="98" height="56" rx="2" />
      <rect className="fa f" style={D(1.1)} x="226" y="156" width="58" height="32" rx="2" />
      <rect className="warm gl" style={D(1.2)} x="136" y="80" width="116" height="22" rx="2" />
      <rect className="fw p" style={D(1.25)} x="24" y="194" width="56" height="6" rx="1" />
      <path className="s p" style={D(1.35)} d="M322 200v-18" />
      <circle className="tree p" style={D(1.35)} cx="322" cy="172" r="13" />
    </>
  );
}

function Estudios() {
  const xs = [70, 130, 190, 250, 310];
  return (
    <>
      {xs.map((x, i) => (
        <g key={x}>
          <path className="s a dash d" pathLength={1} style={D(i * 0.06)} d={`M${x} 46V214`} />
          <circle className="s a f" style={D(0.3 + i * 0.05)} cx={x} cy="34" r="7" />
        </g>
      ))}
      <path className="s d" pathLength={1} style={D(0.2)} d="M40 206H340" />
      {/* columnas y losas escalonadas */}
      {[70, 130, 190, 250, 310].map((x, i) => (
        <rect className="fw p" key={x} style={D(0.5 + i * 0.04)} x={x - 2} y="166" width="4" height="40" />
      ))}
      <rect className="fw r" style={D(0.8)} x="50" y="158" width="280" height="8" rx="1" />
      {[70, 130, 190, 250].map((x, i) => (
        <rect className="fw p" key={x} style={D(0.95 + i * 0.04)} x={x - 2} y="122" width="4" height="36" />
      ))}
      <rect className="fw r" style={D(1.1)} x="62" y="114" width="214" height="8" rx="1" />
      <rect className="fw r" style={D(1.3)} x="74" y="72" width="170" height="8" rx="1" />
      {/* lamas */}
      {Array.from({ length: 9 }, (_, i) => (
        <path className="s wood d" key={i} pathLength={1} style={D(1.45 + i * 0.04)} d={`M${92 + i * 18} 80V158`} />
      ))}
    </>
  );
}

function Interiorismo() {
  return (
    <>
      <path className="s d" pathLength={1} style={D(0)} d="M64 40H296V168H64Z" />
      <path className="s d" pathLength={1} style={D(0.25)} d="M64 168L24 214M296 168L336 214" />
      {/* ventana */}
      <path className="s a d" pathLength={1} style={D(0.45)} d="M198 62H272V128H198ZM235 62V128M198 95H272" />
      <ellipse className="fa f" style={D(0.8)} cx="168" cy="198" rx="98" ry="12" />
      {/* sillón */}
      <path className="fw p" style={D(0.9)} d="M96 186v-34a10 10 0 0 1 10-10h96a10 10 0 0 1 10 10v34Z" />
      <rect className="fw2 p" style={D(1)} x="104" y="160" width="100" height="18" rx="5" />
      {/* lámpara y su luz */}
      <path className="s d" pathLength={1} style={D(1.05)} d="M252 190V96" />
      <path className="s d" pathLength={1} style={D(1.15)} d="M238 96H266L258 80H246Z" />
      <path className="warm gl" style={D(1.3)} d="M240 96H264L296 190H208Z" />
      {/* planta */}
      <rect className="fw p" style={D(1.2)} x="76" y="174" width="14" height="16" rx="2" />
      <path className="s leaf d" pathLength={1} style={D(1.3)} d="M83 174C70 160 72 146 80 138M83 174C96 160 96 150 90 140M83 174V140" />
    </>
  );
}

function Constructoras() {
  return (
    <>
      <path className="s d" pathLength={1} style={D(0)} d="M20 206H340" />
      {/* edificio en obra, piso por piso */}
      {[0, 1, 2, 3].map((k) => (
        <g key={k} className="r" style={D(0.15 + k * 0.18)}>
          <rect className="fw" x="52" y={176 - k * 32} width="132" height="30" rx="1" />
          {[66, 98, 130, 162].map((x) => (
            <rect className="fa" key={x} x={x - 8} y={184 - k * 32} width="16" height="14" rx="1" />
          ))}
        </g>
      ))}
      {/* grúa */}
      <path
        className="s d"
        pathLength={1}
        style={D(0.5)}
        d="M262 206V44M254 206V44M254 64L262 76M262 92L254 104M254 120L262 132M262 148L254 160M254 176L262 188"
      />
      <path className="s a d" pathLength={1} style={D(0.85)} d="M160 46H336M300 46L258 24L216 46M258 24V44" />
      <rect className="fw r" style={D(1)} x="318" y="46" width="16" height="14" />
      {/* carga colgando, se balancea */}
      <g className="sway" style={D(1.2)}>
        <path className="s d" pathLength={1} style={D(1.1)} d="M200 46V96" />
        <rect className="fw2 r" style={D(1.3)} x="184" y="96" width="32" height="18" rx="1" />
      </g>
    </>
  );
}

function Viviendas() {
  const houses = [
    [44, 0.15],
    [140, 0.35],
    [236, 0.55],
  ] as const;
  return (
    <>
      <path className="s d" pathLength={1} style={D(0)} d="M20 200H340" />
      {houses.map(([x, d]) => (
        <g key={x} className="p" style={D(d)}>
          <rect className="fw" x={x} y="140" width="80" height="60" rx="1" />
          <path className="fw2" d={`M${x - 8} 142L${x + 40} 104L${x + 88} 142Z`} />
          <rect className="dark" x={x + 30} y="168" width="20" height="32" rx="1" />
        </g>
      ))}
      {houses.map(([x], i) => (
        <rect className="warm gl" key={x} style={D(1 + i * 0.12)} x={x + 8} y="152" width="16" height="14" rx="1" />
      ))}
      {[30, 132, 228, 330].map((x, i) => (
        <g key={x} className="p" style={D(1.3 + i * 0.08)}>
          <path className="s" d={`M${x} 200v-14`} />
          <circle className="tree" cx={x} cy="178" r="10" />
        </g>
      ))}
    </>
  );
}

function Steel() {
  const studs = Array.from({ length: 9 }, (_, i) => 70 + i * 28);
  return (
    <>
      <path className="s d" pathLength={1} style={D(0)} d="M20 204H340" />
      <path className="s a d" pathLength={1} style={D(0.1)} d="M62 198H302M62 104H302" />
      {studs.map((x, i) => (
        <path className="s a d" key={x} pathLength={1} style={D(0.25 + i * 0.05)} d={`M${x} 198V104`} />
      ))}
      {/* cabriadas */}
      <path className="s a d" pathLength={1} style={D(0.8)} d="M54 106L182 40L310 106M118 106L182 40L246 106M182 40V106" />
      {/* capas: aislación, placa y terminación, de izquierda a derecha */}
      <rect className="ins f" style={D(1.2)} x="62" y="104" width="80" height="94" />
      <rect className="osb f" style={D(1.4)} x="142" y="104" width="80" height="94" />
      <rect className="fw f" style={D(1.6)} x="222" y="104" width="80" height="94" />
    </>
  );
}

function Desarrollistas() {
  // 8 pisos de 3 unidades: disponibles (azul), reservadas (ámbar) y vendidas (oscuras)
  const st = "avsavvsrvasvvsavrsvvasva";
  return (
    <>
      <path className="s d" pathLength={1} style={D(0)} d="M20 210H340" />
      <rect className="fw r" style={D(0.1)} x="96" y="196" width="168" height="14" rx="1" />
      {Array.from({ length: 8 }, (_, k) => (
        <g key={k} className="r" style={D(0.2 + k * 0.1)}>
          <rect className="fw" x="116" y={172 - k * 20} width="128" height="18" rx="1" />
          {[0, 1, 2].map((u) => {
            const c = st[k * 3 + u];
            return <rect key={u} className={c === "a" ? "fa" : c === "r" ? "res" : "dark"} x={121 + u * 41} y={175 - k * 20} width="36" height="12" rx="1" />;
          })}
        </g>
      ))}
      <rect className="fw2 r" style={D(1)} x="132" y="18" width="96" height="10" rx="1" />
      {/* ficha de la unidad elegida */}
      <g className="r" style={D(1.3)}>
        <rect className="card" x="262" y="74" width="80" height="58" rx="6" />
        <rect className="fa" x="272" y="84" width="34" height="6" rx="2" />
        <rect className="fw" x="272" y="98" width="58" height="10" rx="2" />
        <rect className="fw2" x="272" y="114" width="44" height="6" rx="2" />
      </g>
      <path className="s a dash d" pathLength={1} style={D(1.25)} d="M244 102H262" />
    </>
  );
}

function Rodeo() {
  // panel de Aspa Rodeo: kg promedio por mes, la curva de ganancia y la alerta de vacuna
  const bars = [62, 70, 78, 86, 96, 110];
  return (
    <>
      <rect className="card f" style={D(0)} x="24" y="22" width="312" height="190" rx="12" />
      <path className="s d" pathLength={1} style={D(0.1)} d="M84 22V212" />
      {[52, 78, 104, 130].map((y, i) => (
        <rect className="fw2 r" key={y} style={D(0.15 + i * 0.06)} x="38" y={y} width="34" height="6" rx="2" />
      ))}
      {/* tarjetas de números */}
      {[0, 1, 2].map((i) => (
        <g key={i} className="r" style={D(0.3 + i * 0.1)}>
          <rect className="dark" x={98 + i * 78} y="36" width="68" height="40" rx="6" />
          <rect className="fw" x={106 + i * 78} y="46" width="34" height="9" rx="2" />
          <rect className={i === 2 ? "res" : "fa"} x={106 + i * 78} y="61" width="22" height="5" rx="2" />
        </g>
      ))}
      {bars.map((h, i) => (
        <rect className={i === bars.length - 1 ? "fw p" : "fa p"} key={i} style={D(0.6 + i * 0.07)} x={104 + i * 36} y={198 - h} width="24" height={h} rx="3" />
      ))}
      <path className="s a d" pathLength={1} style={D(1.1)} d="M116 150L152 140L188 136L224 120L260 112L296 92" />
      <circle className="warm gl" style={D(1.4)} cx="320" cy="44" r="5" />
    </>
  );
}

function Scout() {
  // Aspa Scout: la búsqueda de prospectos y el embudo comercial que se va llenando
  return (
    <>
      <rect className="card f" style={D(0)} x="24" y="22" width="312" height="190" rx="12" />
      <rect className="dark r" style={D(0.1)} x="40" y="38" width="200" height="26" rx="13" />
      <circle className="s a d" pathLength={1} style={D(0.25)} cx="56" cy="51" r="6" />
      <path className="s a d" pathLength={1} style={D(0.35)} d="M61 56L66 61" />
      <path className="s d" pathLength={1} style={D(0.4)} d="M76 51H180" />
      <rect className="fa r" style={D(0.5)} x="250" y="38" width="70" height="26" rx="13" />
      {/* columnas del embudo: prospecto, conversación, propuesta, cliente */}
      {[0, 1, 2, 3].map((c) => (
        <g key={c}>
          <rect className="fw2 f" style={D(0.55 + c * 0.05)} x={40 + c * 72} y="80" width="40" height="5" rx="2" />
          {Array.from({ length: 4 - c }, (_, k) => (
            <g key={k} className="r" style={D(0.75 + c * 0.15 + k * 0.08)}>
              <rect className={c === 3 ? "fa" : "dark"} x={40 + c * 72} y={94 + k * 28} width="64" height="22" rx="5" />
              <circle className={c === 3 ? "fw" : "fw2"} cx={51 + c * 72} cy={105 + k * 28} r="5" />
              <rect className="fw2" x={60 + c * 72} y={102 + k * 28} width="34" height="5" rx="2" />
            </g>
          ))}
        </g>
      ))}
      <path className="s a dash d" pathLength={1} style={D(1.5)} d="M104 105H112M176 105H184M248 105H256" />
    </>
  );
}

/** Todo lo que el menú puede ilustrar: los rubros de Webs y los sistemas propios. */
export type ArtKey = RubroSlug | "aspa-rodeo" | "aspa-scout";

const ARTS: Record<ArtKey, () => React.JSX.Element> = {
  "aspa-rodeo": Rodeo,
  "aspa-scout": Scout,
  arquitectos: Arquitectos,
  "estudios-de-arquitectura": Estudios,
  interiorismo: Interiorismo,
  constructoras: Constructoras,
  "constructoras-de-vivienda": Viviendas,
  "steel-framing": Steel,
  desarrollistas: Desarrollistas,
};

/** La ilustración de un rubro o sistema (decorativa). Cambiar `slug` (y la `key`) la vuelve a armar. */
export function NavArt({ slug }: { slug: ArtKey }) {
  const Art = ARTS[slug];
  return (
    <svg className="nav-art" viewBox="0 0 360 230" aria-hidden="true">
      <Art />
    </svg>
  );
}
