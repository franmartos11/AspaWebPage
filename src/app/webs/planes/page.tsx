import type { Metadata } from "next";
import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { Plans } from "@/components/Plans";
import { breadcrumbs, plansSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/site";
import { PLANS } from "@/lib/webs";
import "@/styles/faq.css";
import "@/styles/plans.css";
import "./planes.css";

const PATH = ROUTES.planes;
const { landing, sitio, maintenanceUsd } = PLANS;
const DESCRIPTION = `Cuánto cuesta una página web: Landing USD ${landing.usd} en ${landing.days} días y Sitio completo USD ${sitio.usd} en ${sitio.days} días, con dominio y hosting. Mantenimiento USD ${maintenanceUsd} por mes. Precio y plazo cerrados.`;

export const metadata: Metadata = pageMeta({ path: PATH, title: "Precios de páginas web: planes y comparación", description: DESCRIPTION });

// qué trae cada plan: [característica, landing, sitio completo]
const ROWS: [string, boolean, boolean][] = [
  ["Página propia por proyecto, con galería", false, true],
  ["Panel para cargar trabajos por tu cuenta", false, true],
  ["Sección de equipo", false, true],
  ["Testimonios de clientes", false, true],
  ["Dos idiomas", false, true],
  ["Dominio y hosting", true, true],
  ["Diseño pensado para el celular", true, true],
  ["Botón de WhatsApp", true, true],
  ["Aparición en Google", true, true],
];

const FAQ: [string, string][] = [
  ["¿Qué les tengo que pasar para empezar?", "Fotos y textos de los trabajos que quieras mostrar. Con eso diseñamos la propuesta y te la mostramos antes de publicar."],
  ["¿Cuánto tardan?", `La Landing queda lista en ${landing.days} días y el Sitio completo en ${sitio.days} días.`],
  [
    "¿Puedo cargar trabajos nuevos yo?",
    "Sí, en el Sitio completo: incluye un panel para cargarlos por tu cuenta. En la Landing, los trabajos nuevos entran con los cambios del mantenimiento.",
  ],
  [
    "¿El dominio y el hosting están incluidos?",
    `Sí, en los dos planes. Con el mantenimiento de USD ${maintenanceUsd} por mes la web sigue online con dominio propio y hosting, y tenés hasta 2 cambios chicos por mes sin pagar aparte.`,
  ],
];

const Mark = ({ yes }: { yes: boolean }) =>
  yes ? (
    <td className="y">
      <span aria-hidden="true">✓</span>
      <span className="sr-only">Sí</span>
    </td>
  ) : (
    <td className="no">
      <span aria-hidden="true">—</span>
      <span className="sr-only">No</span>
    </td>
  );

export default function PlanesPage() {
  return (
    <main id="main" className="view">
      <section className="phero" aria-labelledby="planes-title">
        <div className="wrap">
          <CharTitle id="planes-title" parts={["Planes y ", { em: "precios." }]} />
          <p className="lead r-late">Dos planes, con precio y plazo cerrados desde el principio.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="planes-dos">
        <div className="wrap">
          {/* las tarjetas de los planes son <h3>: el título de la sección solo para lectores de pantalla */}
          <h2 className="sr-only" id="planes-dos">
            Los dos planes
          </h2>
          <Plans />
        </div>
      </section>

      <section className="section" aria-labelledby="planes-trae">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="planes-trae" data-lines>
                Qué trae <em className="grad">cada plan</em>
              </h2>
            </div>
          </div>
          {/* en celular la tabla se desplaza de costado: se puede enfocar para moverla con el teclado */}
          <div className="ctbl-wrap glass glass-light" tabIndex={0} role="region" aria-label="Comparación de planes">
            <table className="ctbl">
              <caption className="sr-only">Comparación de planes</caption>
              <thead>
                <tr>
                  <th scope="col">Qué trae</th>
                  <th scope="col">{landing.name}</th>
                  <th scope="col">{sitio.name}</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([f, l, s]) => (
                  <tr key={f}>
                    <th scope="row">{f}</th>
                    <Mark yes={l} />
                    <Mark yes={s} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="maint glass" style={{ marginTop: "clamp(48px,5vw,72px)" }}>
            <div className="mp">
              <span className="usd">USD</span> {maintenanceUsd}
              <small>/mes</small>
            </div>
            <p>
              <b>Mantenimiento.</b> Tu web online con dominio propio y hosting, y hasta 2 cambios chicos por mes (una foto, un texto, un trabajo nuevo) sin
              pagar aparte.
            </p>
          </div>
          <p className="fine" style={{ marginTop: 28 }}>
            Precios en USD o su equivalente en pesos.
          </p>
          <div className="devnote">
            <p>
              <b>Desarrollistas:</b> cotización a medida, según la cantidad de emprendimientos.
            </p>
            <Link className="more" href={ROUTES.rubro("desarrollistas")}>
              Ver webs para desarrollistas{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Faq
        id="planes-faq"
        title={
          <>
            Antes de <em className="grad">empezar</em>
          </>
        }
        items={FAQ}
      />

      <Cta question="¿Querés ver cómo quedaría tu web? Pasanos 3 trabajos y te mandamos una portada de ejemplo." message="Hola Aspa, quiero mi web" />

      <JsonLd
        data={plansSchema({
          name: "Páginas web: planes",
          path: PATH,
          plans: [
            { name: landing.name, usd: landing.usd, description: `${landing.pages}, lista en ${landing.days} días.` },
            { name: sitio.name, usd: sitio.usd, description: `${sitio.pages} páginas, listo en ${sitio.days} días.` },
          ],
        })}
      />
      <JsonLd
        data={breadcrumbs([
          { name: "Webs", path: ROUTES.webs },
          { name: "Planes y precios", path: PATH },
        ])}
      />
      <PageFx page="planes" />
    </main>
  );
}
