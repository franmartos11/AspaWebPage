# Idiomas (español / inglés)

- **Español** en las URLs de siempre (`/`, `/sistemas`, `/webs/arquitectos`…). **Inglés** bajo `/en` con URLs en inglés (`/en/systems`, `/en/websites/architects`…). La tabla está en `src/i18n/index.ts` (`routes(lang)`, `counterpart`, `RUBRO_SLUGS`).
- Dos layouts raíz: `src/app/(es)/layout.tsx` y `src/app/(en)/layout.tsx` (cada uno con su `<html lang>`). Cambiar de idioma recarga la página. Las URLs que no existen van a `src/app/global-not-found.tsx` (bilingüe).
- `pageMeta({ path, title, description })` deduce el idioma del `path` y agrega la canónica y los `hreflang` (es-AR, en, x-default) solo.

## Cómo está armada cada página

Cada página es una **vista** en `src/views/<página>/` que recibe `lang`; las rutas de `app/` son de una línea:

```tsx
// src/app/(es)/nosotros/page.tsx            // src/app/(en)/en/about/page.tsx
import { NosotrosView, nosotrosMeta } from "@/views/nosotros/NosotrosView";
export const metadata = nosotrosMeta("es");   // …("en")
export default function Page() {
  return <NosotrosView lang="es" />;          // lang="en"
}
```

- Los textos van en un objeto `{ es: {...}, en: {...} }` junto a la vista (o en `src/lib/*` si son datos que comparten varias páginas). La forma de `en` es la misma que la de `es`.
- Links internos: siempre `routes(lang).x` (nunca una ruta escrita a mano).
- El CSS propio de la página vive junto a la vista y lo importa la vista.
- Textos que arma el movimiento (`src/lib/fx/*`): `pageLang()` de `fx/core.ts`.
- Mensajes de WhatsApp prellenados: también traducidos.

## Glosario (para que el inglés sea parejo en todo el sitio)

| Español | English |
| --- | --- |
| Sistemas (a medida) | Systems / custom software |
| sistema de gestión | management system |
| Webs | Websites |
| Planes y precios | Pricing |
| Casos | Work (caso real = case study; diseño de ejemplo = sample design) |
| Nosotros | About |
| Contacto | Contact |
| rubro | industry |
| Hablemos | Let's talk |
| propuesta sin costo | free proposal |
| 24 h hábiles | 1 business day |
| Ver caso / Ver rubro / Ver en vivo | View case / View industry / View live |
| Escribinos por WhatsApp | Message us on WhatsApp |
| Completar formulario | Fill out the form |

Inglés de Estados Unidos, directo y comercial, sin traducción literal. Los títulos, de largo parecido al español (el diseño está medido para esos largos). Los nombres propios (Aspa Rodeo, Aspa Scout, DH Engineering, Córdoba…) no se traducen; los precios siguen en USD.
