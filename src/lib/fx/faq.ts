// Preguntas frecuentes: el <details> se abre y se cierra animando el alto, así lo de abajo se
// desliza en lugar de saltar. Sin JavaScript (o con movimiento reducido) queda el comportamiento nativo.
import { $$, EXPO, reducedMotion } from "./core";

export function initFaq() {
  if (reducedMotion()) return () => {};
  const off: (() => void)[] = [];
  $$<HTMLDetailsElement>(".faq details").forEach((d) => {
    const summary = d.querySelector("summary")!;
    let anim: Animation | null = null;
    const run = (from: number, to: number, done: () => void) => {
      anim?.cancel();
      anim = d.animate({ height: [`${from}px`, `${to}px`] }, { duration: 560, easing: EXPO });
      anim.onfinish = () => {
        anim = null;
        done();
      };
    };
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      const start = d.offsetHeight;
      if (!d.open || d.classList.contains("closing")) {
        d.classList.remove("closing");
        d.open = true;
        run(start, d.scrollHeight, () => {});
      } else {
        d.classList.add("closing");
        run(start, summary.offsetHeight, () => {
          d.open = false;
          d.classList.remove("closing");
        });
      }
    };
    summary.addEventListener("click", onClick);
    off.push(() => {
      summary.removeEventListener("click", onClick);
      anim?.cancel();
    });
  });
  return () => off.forEach((f) => f());
}
