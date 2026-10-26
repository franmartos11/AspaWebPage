import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className="view">
      <section className="section" style={{ minHeight: "80vh", display: "grid", alignItems: "center", paddingTop: 160 }}>
        <div className="wrap">
          <p className="lbl">Error 404</p>
          <h1 className="h2">Esta página no existe (todavía).</h1>
          <p className="lead" style={{ marginTop: 24 }}>
            Puede que el link esté mal o que estemos terminando esta sección.
          </p>
          <div className="btns" style={{ marginTop: 32 }}>
            <Link className="btn btn-glass btn-blue" href="/">
              <span>Volver al inicio</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
