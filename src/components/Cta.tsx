import Link from "next/link";
import { routes, type Lang } from "@/i18n";
import { waLink } from "@/lib/site";

type Props = {
  lang: Lang;
  question: string;
  message: string;
  extra?: React.ReactNode;
};

const T = {
  es: {
    lbl: "Hablemos",
    steps: ["Nos escribís", "Te llamamos en 24 h hábiles", "Te mandamos una propuesta sin costo"],
    wa: "Escribinos por WhatsApp",
    form: "Completar formulario",
  },
  en: {
    lbl: "Let's talk",
    steps: ["You write to us", "We call you within 1 business day", "We send you a free proposal"],
    wa: "Message us on WhatsApp",
    form: "Fill out the form",
  },
} as const;

/** Bloque "Hablemos": pregunta + tres pasos + WhatsApp y formulario. */
export function Cta({ lang, question, message, extra }: Props) {
  const t = T[lang];
  return (
    <section className="cta" id="contacto" aria-labelledby="cta-q">
      <div className="wrap">
        <div className="cta-p glass glass-big rv">
          <div className="cta-a">
            <p className="lbl">{t.lbl}</p>
            <h2 className="cta-q" id="cta-q">
              {question}
            </h2>
          </div>
          <div className="cta-b">
            <ol className="cta-steps">
              {t.steps.map((s, i) => (
                <li key={s}>
                  <b>{i + 1}</b>
                  {s}
                </li>
              ))}
            </ol>
            <div className="btns">
              <a className="btn btn-glass btn-blue" href={waLink(message)} target="_blank" rel="noopener">
                <span>{t.wa}</span>
              </a>
              <Link className="btn btn-glass" href={routes(lang).contacto}>
                <span>{t.form}</span>
              </Link>
            </div>
            {extra}
          </div>
        </div>
      </div>
    </section>
  );
}
