import Link from "next/link";
import { ROUTES, waLink } from "@/lib/site";

type Props = { question: string; message: string; extra?: React.ReactNode };

/** Bloque "Hablemos": pregunta + tres pasos + WhatsApp y formulario. */
export function Cta({ question, message, extra }: Props) {
  return (
    <section className="cta" id="contacto" aria-labelledby="cta-q">
      <div className="wrap">
        <div className="cta-p glass glass-big rv">
          <div className="cta-a">
            <p className="lbl">Hablemos</p>
            <h2 className="cta-q" id="cta-q">
              {question}
            </h2>
          </div>
          <div className="cta-b">
            <ol className="cta-steps">
              <li>
                <b>1</b>Nos escribís
              </li>
              <li>
                <b>2</b>Te llamamos en 24 h hábiles
              </li>
              <li>
                <b>3</b>Te mandamos una propuesta sin costo
              </li>
            </ol>
            <div className="btns">
              <a className="btn btn-glass btn-blue" href={waLink(message)} target="_blank" rel="noopener">
                <span>Escribinos por WhatsApp</span>
              </a>
              <Link className="btn btn-glass" href={ROUTES.contacto}>
                <span>Completar formulario</span>
              </Link>
            </div>
            {extra}
          </div>
        </div>
      </div>
    </section>
  );
}
