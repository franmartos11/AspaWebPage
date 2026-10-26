import Link from "next/link";
import { Logo } from "./Logo";
import { ROUTES, SITE } from "@/lib/site";

const YEAR = new Date().getFullYear();

export function Footer() {
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
              {SITE.tagline}
            </p>
          </div>
          <nav className="ftr-col" aria-label="Páginas">
            <p className="lbl">Páginas</p>
            <ul>
              <li>
                <Link className="ul" href={ROUTES.home}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link className="ul" href={ROUTES.sistemas}>
                  Sistemas
                </Link>
              </li>
              <li>
                <Link className="ul" href={ROUTES.webs}>
                  Webs
                </Link>
              </li>
              <li>
                <Link className="ul" href={ROUTES.planes}>
                  Planes
                </Link>
              </li>
              <li>
                <Link className="ul" href={ROUTES.nosotros}>
                  Nosotros
                </Link>
              </li>
              <li>
                <Link className="ul" href={ROUTES.contacto}>
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
          <div className="ftr-col">
            <p className="lbl">Redes</p>
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
            <p className="lbl">Contacto</p>
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
              Política de privacidad
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
