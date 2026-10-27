import Link from "next/link";
import { Logo } from "./Logo";
import { routes, type Lang } from "@/i18n";
import { SITE } from "@/lib/site";

const YEAR = new Date().getFullYear();

const T = {
  es: {
    pages: "Páginas",
    home: "Inicio",
    sistemas: "Sistemas",
    webs: "Webs",
    planes: "Planes",
    nosotros: "Nosotros",
    contacto: "Contacto",
    social: "Redes",
    contact: "Contacto",
    privacy: "Política de privacidad",
  },
  en: {
    pages: "Pages",
    home: "Home",
    sistemas: "Systems",
    webs: "Websites",
    planes: "Pricing",
    nosotros: "About",
    contacto: "Contact",
    social: "Social",
    contact: "Contact",
    privacy: "Privacy policy",
  },
} as const;

export function Footer({ lang }: { lang: Lang }) {
  const t = T[lang],
    ROUTES = routes(lang);
  return (
    <footer className="ftr" id="footer">
      <div className="wrap">
        <svg className="ftr-line" viewBox="0 0 100 1" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1=".5" x2="100" y2=".5" pathLength="1" />
        </svg>
        <div className="ftr-logo" aria-hidden="true">
          <Logo />
        </div>
        <div className="grid ftr-grid">
          <div className="ftr-brand">
            <p className="mut" style={{ margin: 0, maxWidth: "32ch" }}>
              {SITE.tagline[lang]}
            </p>
          </div>
          <nav className="ftr-col" aria-label={t.pages}>
            <p className="lbl">{t.pages}</p>
            <ul>
              <li>
                <Link className="ul" href={ROUTES.home}>
                  {t.home}
                </Link>
              </li>
              <li>
                <Link className="ul" href={ROUTES.sistemas}>
                  {t.sistemas}
                </Link>
              </li>
              <li>
                <Link className="ul" href={ROUTES.webs}>
                  {t.webs}
                </Link>
              </li>
              <li>
                <Link className="ul" href={ROUTES.planes}>
                  {t.planes}
                </Link>
              </li>
              <li>
                <Link className="ul" href={ROUTES.nosotros}>
                  {t.nosotros}
                </Link>
              </li>
              <li>
                <Link className="ul" href={ROUTES.contacto}>
                  {t.contacto}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="ftr-col">
            <p className="lbl">{t.social}</p>
            <ul>
              <li>
                <a className="ul" href={SITE.social.linkedin} target="_blank" rel="noopener">
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="ul" href={SITE.social.instagram} target="_blank" rel="noopener">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="ftr-col">
            <p className="lbl">{t.contact}</p>
            <ul>
              <li>
                <a className="ul" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a className="ul" href={SITE.address.maps} target="_blank" rel="noopener">
                  {SITE.address.street}, {SITE.address.city}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ftr-bot">
          <p>© {YEAR} Aspa Software</p>
          <p>
            <Link className="ul" href={ROUTES.privacidad}>
              {t.privacy}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
