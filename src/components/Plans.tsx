import { waLink } from "@/lib/site";
import { PLANS } from "@/lib/webs";

/** Los dos planes de Webs (Landing y Sitio completo) con su botón de WhatsApp. */
export function Plans() {
  const { landing, sitio, maintenanceUsd } = PLANS;
  return (
    <>
      <div className="plans">
        <article className="plan glass rv">
          <h3>{landing.name}</h3>
          <div className="price">
            <small>USD</small>
            {landing.usd}
          </div>
          <ul className="specs">
            <li>
              <b>{landing.days} días</b>hasta estar lista
            </li>
            <li>
              <b>{landing.pages}</b>con todo
            </li>
            <li>
              <b>{landing.works}</b>trabajos
            </li>
          </ul>
          <p className="ideal mut">Ideal para quien recién arranca o quiere su trabajo en un solo link.</p>
          <a className="btn btn-glass" href={waLink("Hola Aspa, me interesa la Landing")} target="_blank" rel="noopener">
            <span>Quiero la landing</span>
          </a>
        </article>
        <article className="plan rec glass rv">
          <span className="badge">Recomendado</span>
          <h3>{sitio.name}</h3>
          <div className="price">
            <small>USD</small>
            {sitio.usd}
          </div>
          <ul className="specs">
            <li>
              <b>{sitio.days} días</b>hasta estar listo
            </li>
            <li>
              <b>{sitio.pages}</b>páginas
            </li>
            <li>
              <b>{sitio.works}</b>trabajos + los que cargues
            </li>
          </ul>
          <p className="ideal mut">Ideal para empresas con equipo, varias líneas de trabajo y mucho para mostrar.</p>
          <a className="btn btn-glass btn-blue" href={waLink("Hola Aspa, me interesa el Sitio completo")} target="_blank" rel="noopener">
            <span>Quiero el sitio completo</span>
          </a>
        </article>
      </div>
      <p className="fine" style={{ marginTop: 20 }}>
        Mantenimiento USD {maintenanceUsd} por mes.
      </p>
    </>
  );
}
