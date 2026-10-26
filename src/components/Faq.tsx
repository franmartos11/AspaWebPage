/** Preguntas frecuentes con <details>: se abren sin JavaScript y se leen bien con lector de pantalla. */
export function Faq({ id, title, items }: { id: string; title: React.ReactNode; items: [string, string][] }) {
  return (
    <section className="section" aria-labelledby={id}>
      <div className="wrap">
        <div className="grid faq-grid">
          <div>
            <h2 className="h2" id={id} data-lines>
              {title}
            </h2>
          </div>
          <div className="faq">
            {items.map(([q, a]) => (
              <details className="glass" key={q}>
                <summary>
                  {q}
                  <i aria-hidden="true"></i>
                </summary>
                <div className="ans">
                  <p>{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
