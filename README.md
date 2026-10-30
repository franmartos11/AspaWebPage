# Aspa Software · sitio web

Next.js 16 (App Router, TypeScript), generado estático. Hechas todas las páginas del diseño: **Home**, **Sistemas**, **Webs**, **Planes**, las **7 páginas por rubro**, **Casos** (listado + Aspa Rodeo y Aspa Scout), **Nosotros** y **Contacto** (con formulario que envía mails), más la **política de privacidad**. **Todo el sitio está en español y en inglés** (ver «Idiomas»).

## Idiomas

- Español en las URLs de siempre; inglés bajo `/en` con URLs en inglés (`/en/systems`, `/en/websites/architects`, `/en/work`, `/en/about`, `/en/contact`…). Cada página tiene su par: el botón ES/EN del header (y «English/Español» en el menú del celular) lleva a la misma página en el otro idioma.
- SEO por idioma: `<html lang>`, canónica, `hreflang` (es-AR, en, x-default), `og:locale`, imagen para redes y sitemap con las dos versiones de cada página. No se redirige según el idioma del navegador: elige la persona (y Google indexa las dos).
- El formulario contesta, valida y confirma en el idioma de la página; el mail que llega a Aspa dice en qué idioma escribió la persona.
- Cómo agregar o cambiar textos, convenciones y glosario: `src/i18n/README.md`. `tests/i18n.spec.ts` revisa cada página en inglés (idioma, hreflang, botón, accesibilidad y que no quede texto en español).

## Formulario de contacto

`/api/contacto` manda cada consulta por mail con nodemailer y Gmail, igual que el sitio anterior. En producción hay que cargar estas variables de entorno (ver `.env.example`):

| Variable | Qué es |
| --- | --- |
| `EMAIL_USER` | La cuenta de Gmail que envía. |
| `EMAIL_PASS` | Una **contraseña de aplicación** de esa cuenta (Google › Seguridad › Verificación en dos pasos › Contraseñas de aplicaciones), no la contraseña normal. |
| `CONTACT_TO` | Opcional: quién recibe. Por defecto `aspasoftwaredevelopment@gmail.com`, la del sitio anterior. |

Los datos de contacto (email aspasoftwaredevelopment@gmail.com, WhatsApp +54 9 3517 87-8609, dirección) y el envío son los del sitio anterior ([AspaWebPage](https://github.com/franmartos11/AspaWebPage)); el diseño traía otro email. Sin `EMAIL_USER`/`EMAIL_PASS` el formulario avisa que no pudo enviar y sugiere WhatsApp o email (no se pierde en silencio). El mail llega con «Responder a» apuntando al visitante. Contra el spam: campo trampa, envío en menos de 3 s, más de 3 links en el mensaje y hasta 5 envíos cada 10 minutos por IP; a los bots se les contesta «ok» sin enviar. Sin JavaScript el formulario también funciona (lleva a `/contacto/enviado` o `/contacto/error`). Los tests corren con `CONTACT_DRY_RUN=1`: validan todo sin mandar mails.

## Comandos

```bash
npm run dev            # desarrollo en http://localhost:3000
npm run build          # build de producción
npm start              # sirve el build
npm run check          # lint + tipos + tests de Playwright
npm run test:e2e       # SEO, accesibilidad (axe), layout y regresión visual en 375/768/1280/1440 px
npm run test:e2e:update   # regenera las capturas base (solo si el cambio visual es intencional)
npm run test:e2e:engines  # el tramo por pasos también en WebKit (Safari) y Firefox
npm run lhci           # Lighthouse CI: 3 corridas con umbrales (lighthouserc.json)
```

Los tests usan el Chrome instalado (`channel: "chrome"`), no hace falta descargar navegadores. Solo `test:e2e:engines` necesita una vez `npx playwright install webkit firefox`.

## Estructura

```
src/i18n/                  idiomas: tabla de rutas ES/EN (routes, counterpart, RUBRO_SLUGS), convenciones y glosario
src/app/(es)/              rutas en español (las de siempre) + su layout raíz; cada page.tsx es una línea
src/app/(en)/en/           rutas en inglés + su layout raíz
src/app/global-not-found.tsx  404 bilingüe de las URLs que no existen
src/app/api/contacto/      endpoint del formulario (validación en src/lib/contact.ts)
src/app/globals.css        tokens y componentes compartidos (header, vidrio, botones, CTA, footer)
src/views/                 cada página como vista con lang: home, sistemas, webs, planes, rubro (los 7 rubros),
                           casos, caso (Aspa Rodeo y Aspa Scout), nosotros, contacto, privacidad; con su CSS propio
src/components/SiteShell.tsx  lo común de los dos layouts raíz: fuentes, metadata base, header, footer, intro
src/styles/                CSS compartido entre páginas: pains, hgal, plans, faq, seg (control segmentado), prodname, proof (números y marquee de clientes)
src/components/            Header, NavLinks (menú + botón ES/EN), Footer, Cta, Proof, Plans, Rubros, Logo, CharTitle, PainArt, Fx
src/lib/seo.ts             metadata de cada página (título, canónica, hreflang, redes)
src/lib/site.ts            datos de la empresa y rutas (una sola fuente)
src/lib/schema.ts          datos estructurados schema.org
src/lib/inline-scripts.ts  scripts en línea: flags antes del primer pintado + intro de marca
src/lib/fx/                movimiento (vanilla TS): core, site, reveal, home, notebook3d (Three.js, diferido),
                           phone-orbit (recorrido del celular, matemática pura y testeada),
                           steps (los trabajos del hero de a uno por gesto), ui (control segmentado y comparador),
                           sistemas, parts + particles3d, flow, story, webs + devices/devices3d (visor de rubros),
                           devices-model (MacBook e iPhone compartidos), rubro, scene-loader + scenes/ (escenas de
                           los rubros sobre kit.ts), trama (steel framing), devdemo (sala de ventas de desarrollistas)
src/fonts/                 Inter e Inter Tight recortadas (ver README ahí)
public/3d/                 texturas WebP de la notebook 3D e imágenes fijas del hero
tests/                     Playwright + axe; pages.spec.ts (páginas en español, paridad con el diseño), i18n.spec.ts (inglés)
scripts/og-images.mjs      regenera las imágenes para redes de los dos idiomas (captura del hero de cada página)
```

## Cómo se tradujo el diseño

- El diseño era un único HTML de 11,5 MB con router por `#hash`. Acá cada página es una URL real (`/`, `/sistemas`, `/webs`…), indexable.
- El CSS del original se recortó a lo que usa el Home (123 KB → ~40 KB; ~10 KB comprimido) respetando el orden de cascada. Va en línea en el `<head>`.
- El JS del original corría un `requestAnimationFrame` permanente; acá el tick se pide solo cuando hay scroll o una animación activa.
- La notebook 3D (Three.js r160, misma escena) se descarga en diferido: en escritorio cuando la página queda ociosa, en celulares con la primera interacción. Mientras tanto se ve una imagen fija generada desde la misma escena (3–24 KB).
- Sin WebGL, con movimiento reducido o en celulares de gama baja se muestra la versión fija (imagen + carrusel), igual que en el diseño.
- La intro del logo corre con un script en línea (no espera a React) y tiene respaldo: si algo falla se va sola a los 6 s.
- Sin JavaScript se ve todo el contenido.

### Diferencias deliberadas con el diseño

| Qué | Por qué |
| --- | --- |
| Acordeón de «Cuatro formas…»: botón dentro de `<h3>` y el link afuera | El original tenía un link dentro de un `<button>` (HTML inválido, falla de accesibilidad). Se ve igual. |
| Galería en celular: la primera tarjeta respeta el margen de 24 px | En el original quedaba pegada al borde izquierdo. |
| Galería de trabajos (Home y Webs) guiada por el scroll también en celular, con tarjetas al 84 % del ancho y barra de avance visible | En el diseño, en celular era un carrusel sin indicio de que se podía deslizar y casi nadie veía más que el primer trabajo. Con movimiento reducido sigue el carrusel. |
| Hero del Home en celular: la cámara encuadra por el ancho (notebook ~60 % de la pantalla) y los dos botones van lado a lado desde 360 px | En el diseño la notebook ocupaba un tercio del ancho y los botones quedaban uno debajo del otro. |
| Sistemas en celular: hero al alto de su contenido con la pila de capturas debajo del texto y botones del mismo ancho; paso de planilla a sistema en 200 vh; el celular del circuito arriba de los pasos (no fijo); comparador casi cuadrado sin las columnas E y G; proceso centrado como un bloque; «Un sistema que es tuyo» en una columna; botón «Ver caso» debajo del texto; lista de rubros a todo el ancho | En el diseño el hero dejaba media pantalla vacía, el celular tapaba los pasos, la planilla se cortaba, el dibujo del proceso flotaba lejos de su texto, los títulos de las tarjetas no entraban en dos columnas y el texto de cada sistema quedaba angosto. |
| Llamada final en celular: los dos botones uno por fila y del mismo ancho | Quedaban de anchos distintos y alineados a la izquierda. |
| Nosotros en celular y tablet: hero al alto de su contenido, alineado con el resto de la página, con «Conocé al equipo» (las iniciales del equipo) debajo del texto | En el diseño el texto quedaba abajo de media pantalla vacía y, en tablet, corrido 60 px hacia adentro. |
| «Saltar» de la intro al 50 % de opacidad (era 45 %) | Llega al contraste AA. |
| Título del hero con movimiento reducido | En el original quedaba invisible con `prefers-reduced-motion`. |
| Botón EN deshabilitado | Todavía no hay versión en inglés. |
| Título del hero entra por palabra (enfoque + subida, ~1,7 s) | Por letra tardaba 3,5 s, perdía el kerning y animaba 34 capas con blur (tirones en celulares). |
| Subtítulo y botones entran al final del título | Antes aparecían cuando el título iba por la primera línea. |
| Hero de la notebook: más recorrido (640 vh / 460 vh en celular), progreso con inercia y límite de velocidad en el tramo de los trabajos | Pasaba muy rápido, en táctiles seguía los tirones del dedo y con un scroll rápido se pasaban todos los trabajos de una. Ahora avanza como máximo un trabajo cada 2 s y después alcanza al scroll. |
| Celular del hero: rodea la notebook por detrás (entra desde atrás de la tapa, para a la derecha y a la izquierda en cada trabajo y cambia su pantalla mientras la tapa lo tapa) | En el diseño saltaba de un costado al otro. Nunca pasa por delante ni la toca: lo comprueba `tests/orbit.spec.ts` (distancia mínima, encuadre en 4 anchos y cambios de pantalla ocultos). |
| Trabajos del hero de a uno por gesto: cada toque de trackpad, giro de rueda, pasada de dedo o tecla avanza o retrocede exactamente un trabajo (~1,8 s de animación); la apertura de la tapa y la entrada a la pantalla siguen libres | Con un scroll rápido se veían varios trabajos seguidos. Se separan los gestos reales (la inercia no cuenta) y no hay trampa: antes del primero y después del último el scroll es libre, y con movimiento reducido no hay pasos. Lo prueba `tests/steps.spec.ts`. |
| Leyenda del trabajo en el hero: editorial, sin caja (contador, nombre, descripción y línea de progreso que se llena con el scroll); el texto cambia con una máscara | Reemplaza la tarjeta de vidrio y los indicadores sueltos del diseño. |
| Notebook y celular del hero: MacBook Pro 14" y iPhone 15 Pro modelados con las medidas oficiales en mm (teclado real con leyendas, notch, bisagra, puertos, parlantes; titanio, Dynamic Island, módulo de cámaras y botones), iluminación de estudio y tonalidad AgX | El modelo del diseño tenía proporciones inventadas (base 1,69:1; la real es 1,41:1). Sin logo de Apple: la tapa lleva el de Aspa. Las medidas están en `phone-orbit.ts` y las usan la escena y los tests. |
| Pantalla de la Mac compuesta como en una Mac real (barra del notch + barra del navegador + la página) | Las capturas son 16:9 y la pantalla es casi 16:10: así no se estiran (se recortan ~3 % por lado). |
| Revelados con curva más suave y tarjetas de números escalonadas; Lenis `lerp` 0,085 | Sensación más pareja en todo el Home. |

### Webs, planes y rubros: diferencias deliberadas

| Qué | Por qué |
| --- | --- |
| El visor de rubros usa la MacBook y el iPhone del sitio, con la pantalla compuesta como en una Mac | Un solo modelo en todo el sitio. |
| En el visor de rubros el celular va al costado de la notebook, con aire (x = 2,55; el conjunto se recentró) | En el diseño (x = 1,85) el celular, agrandado un 30 %, se metía en la base de la notebook. |
| La línea de tiempo es un `div` con la línea y la lista adentro | En el diseño había un `<i>` dentro del `<ol>` (HTML inválido). |
| Tabla de planes con encabezados de fila (`th scope="row"`) y desplazable con teclado en celular | Accesibilidad. |
| El ✓ de la tabla usa el de Inter | El diseño lo dibujaba con la fuente del sistema. |
| Tour 360° de desarrollistas con imagen real | En el diseño la imagen no cargaba (la clave no tenía archivo). |
| Demo de desarrollistas usable con teclado: lotes, unidades (con un selector), tour y BIM | El diseño era solo con mouse. |
| Títulos de los rubros en 3 líneas donde el diseño usaba 4 (celular) | El diseño partía el título por letra y perdía el kerning. |
| Inter oficial 4.1 (misma versión) con las flechas → ↗ | La de Google no las trae; se dibujaban con otra fuente, más anchas. |

`tests/pages.spec.ts` comprueba la paridad: cada sección mide lo mismo que en el diseño (1440 y 390 px, ±2 px o 0,5 %).

### Sistemas: diferencias deliberadas

| Qué | Por qué |
| --- | --- |
| Control segmentado del flujo: en celular los botones se reparten el ancho | En 390 px no entraban y la página se movía de costado. |
| Tooltips de «Herramientas» se corren para no salirse de la pantalla | Ídem. |
| Etapas pendientes de la historia al 58 % de blanco (era 40 %) | Llega a contraste AA. |
| El paso activo de la historia tiene `aria-current="step"` | Accesibilidad. |
| La imagen de rubros va centrada con la lista (escritorio) y se pega arriba en celular | En el diseño el vidrio le ganaba al sticky y la imagen quedaba corrida 110 px hacia abajo. |

### Casos: diferencias deliberadas

| Qué | Por qué |
| --- | --- |
| Títulos de los módulos se cortan con guion en celular («Movimientos», «Conversaciones») | En el diseño se salían de la tarjeta. Rodeo en celular: +21 px en esa sección. |
| El visor de capturas es un `<dialog>` modal: foco atrapado, Escape, flechas del teclado y el foco vuelve a la captura | Accesibilidad (en el diseño era un div). Carga la captura grande, no la miniatura. |
| El listado es una lista (`ul > li`) dentro del panel del filtro | Lectores de pantalla. |
| El menú marca «Sistemas» como sección actual (`aria-current="true"`) en los casos; `"page"` solo en la página misma | Lo mismo para Planes y los rubros dentro de Webs. |

### Contacto: diferencias deliberadas

| Qué | Por qué |
| --- | --- |
| El formulario envía el mail desde el servidor | En el diseño abría el programa de correo del visitante (mailto). |
| Aviso «Al enviar aceptás la política de privacidad» debajo de «Enviar» (+19 px) | Se piden datos personales (Ley 25.326). |
| «¿Qué necesitás?» son radios con el aspecto del control segmentado; en celular entran en una fila | Funciona sin JavaScript y se anuncia como grupo de opciones. En el diseño se partía en dos filas. |
| El pie dice «Política de privacidad» donde decía «aspasoftware.com» | Link a la política; con los dos no entraba en una línea en celular. |

### Arreglos generales del cierre

| Qué | Por qué |
| --- | --- |
| Herramientas de Sistemas con el logo de cada una (Simple Icons, CC0) | Pedido de Aspa: sin logos se veía pobre. Siguen entrando en una línea en 1440 px. |
| LinkedIn de la empresa: `company/85621550` | `company/aspa-software` (diseño y sitio anterior) da 404. Haik y Francisco linkean a su perfil personal (del sitio anterior). |
| Título de la web de ejemplo Nogal (interiorismo) con su estilo del diseño, como párrafo | El estilo se había perdido al generar el CSS (la lista de etiquetas no tenía `h4`); se revisaron todas las páginas y era la única regla faltante. |
| `--serif` definida | Las webs de ejemplo la usan; el diseño cae en Times New Roman y ahora el sitio también. |

### Nosotros: diferencias deliberadas

| Qué | Por qué |
| --- | --- |
| «Nuestra historia» es un párrafo común | El diseño lo partía por palabras para iluminarlo al leer, pero no tenía estilos para eso: se veía igual que un párrafo. |
| Sin el reflector que sigue al mouse en las tarjetas (`data-spot`) | Se dejó afuera en todo el sitio. |
| El equipo y los números son listas; «Nuestra historia» y «Empresas que confían» son títulos (h2) | Lectores de pantalla. |

### Revisión con capturas (octubre): diferencias deliberadas

| Qué | Por qué |
| --- | --- |
| «Cuatro formas…» sin autoplay ni barras de arriba: cambia solo al elegir una pestaña | Pasaba sola cada 6,5 s y no dejaba leer. |
| Galería de trabajos: un solo componente (`WorkGallery`) en el Home y en Webs; cada web abre su sitio en vivo y Aspa Rodeo, su caso | Estaba copiada en dos vistas con estilos distintos, y en el Home llevaba a la página del rubro. |
| Marquee de clientes: la caja de cada nombre se agranda `0,08em` a la derecha | Con el tracking negativo la última letra quedaba sin el relleno del degradado. |
| Menú con «Inicio» y paneles a todo el ancho en Sistemas (Aspa Rodeo y Aspa Scout) y en Webs: los rubros por familia (con una línea cada uno) a la izquierda y, a la derecha, una ilustración 2D del rubro con el mouse o el foco (`NavArt`); en celular, desplegado debajo de Webs | Los rubros solo se encontraban desde la página de Webs. Las ilustraciones son SVG con CSS: no suman descargas ni JavaScript aparte. |
| Hero común en los 7 rubros: título, bajada, WhatsApp (con el mensaje del rubro), «Ver ejemplos» y visual de la misma caja | Con foto medía 886 px y con captura 568; en 1366×768 la bajada quedaba bajo la pantalla y no había ningún botón. |
| Webs: «De tus fotos a tu web online» después de «Lo que pasa hoy», con cada paso que entra al llegar la línea; sin «¿Otro rubro?» | Estaba casi al final; el link solo bajaba a la llamada de la misma página. |
| Tarjetas de «Lo que pasa hoy»: el texto arriba y el dibujo abajo | Se lee primero el problema. |
| Comparador boceto → web y planilla → sistema: un solo rebote (50 → 82 → 50) en 1,2 s | Iba y volvía dos veces en 3 s. |
| Hero del Home: la imagen fija de la notebook (antes de que arranque el 3D) copia el encuadre de la cámara (`.nb-poster` en `home.css`) | En celulares con la barra del navegador visible la notebook aparecía ~20 % más chica y «crecía» al arrancar el 3D (con el primer toque o scroll). |
| Sistemas: «De la primera charla a la versión 1.0» va justo debajo del hero | Pedido de Aspa: el proceso es lo primero que hay que contar. |
| Sistemas: «Seis cosas que hacemos todos los días» no se muestra (`SHOW_SEIS = false` en `SistemasView.tsx`) | Pedido de Aspa; el código queda para volver a usarla. |
| Escenas 3D de los rubros y torre de desarrollistas: se arman con el scroll (`scrub` en `scenes/kit.ts`). La sección es un tramo de 400 % de la pantalla (320 % la torre) con la escena fija; al subir se desarma. La cámara arranca cerca y casi cenital (el plano) y gira y se aleja hasta la obra terminada, y al costado una línea de tiempo de etapas (`STEP_AT` en `RubroView.tsx`, sacadas de la línea de tiempo de cada escena): números en círculos unidos por conectores que se pintan al completar cada etapa, contador «Etapa 03 / 05» y la descripción de lo que se está armando; en celular, solo la etapa activa con una barra. Sin 3D, la imagen fija con su alto normal y las etapas como lista | Antes se reproducían solas y había que esperar ~5,5 s; ahora la obra avanza al ritmo de quien scrollea. |
| Escenas 3D: en reposo (sin scroll que mueva la obra ni mouse) dibujan a 30 cuadros por segundo; los 16 parasoles de cada piso de la torre y el andamio de la obra van en una sola geometría | La torre pasó de ~270 a ~110 llamadas de dibujo por cuadro. `tests/scenes.spec.ts` comprueba que cada escena quede fija en su tramo y no pase de 150 llamadas ni 50 mil triángulos. |
| Arquitectos: la casa suma baranda de vidrio en la terraza, acceso con un auto que entra y prende las luces, y cercos verdes | El modelo se veía pobre al lado de la foto del hero. |
| Arquitectos y estudios: al terminar de armarse, la maqueta se materializa (hormigón visto con encofrado, madera, árboles verdes) con `skin()` y `tex` de `scenes/kit.ts` | La maqueta blanca sola no mostraba cómo queda la obra. Las texturas se dibujan en canvas: no suman descargas. La imagen fija (sin 3D) sigue siendo la maqueta. |
| «Cómo se vería» de interiorismo (Nogal) y steel framing (Trama): imagen o escena a la izquierda y miniaturas apiladas a la derecha, con alto atado a la pantalla | Medían 915 y 1160 px en 1366×768 y había que scrollear dentro de la maqueta; ahora entran enteras desde 1366×768. |
| «Inversión» de cada rubro en una frase corta («Un solo cliente nuevo y ya la pagaste.») | El texto anterior era largo y raro. |
| Contacto: título en una línea y formulario más compacto en escritorio | El formulario y los datos entran enteros en 1366×768 (antes se cortaban 300 px). |
| Nosotros: hero alineado con el logo, a la altura de la pantalla y con el link al equipo; mapa real (OpenStreetMap con los colores del sitio) centrado en Av. Colón 730 y `geo` en los datos estructurados | El título quedaba corrido 70 px hacia adentro; el «mapa» era una grilla con un punto. La imagen se generó una vez desde los tiles de OSM (z17); la coordenada está en `SITE.address.geo`. |

Se mantuvieron a propósito dos rarezas del diseño porque son parte de cómo se ve: la sangría de 40 px de los títulos del acordeón (venía de una colisión de la clase `.tl`) y la posición del fénix durante la intro.

## Mediciones (build de producción, local)

| | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
| --- | --- | --- | --- | --- |
| Lighthouse mobile (simulado), Home | 91–94 | 100 | 100 | 100 |
| Sistemas | 95–96 | 100 | 100 | 100 |
| Webs | 92–95 | 100 | 100 | 100 |
| Planes | 96 | 100 | 100 | 100 |
| Rubros (arquitectos / desarrollistas) | 93–94 | 100 | 100 | 100 |
| Casos / Aspa Rodeo | 91–92 / 96–97 | 100 | 100 | 100 |
| Nosotros | 96–97 | 100 | 100 | 100 |
| En inglés: /en, /en/systems, /en/contact, /en/websites/real-estate-developers | 91–96 | 100 | 100 | 100 |

- Chrome real con CPU 4x y 4G lento, primera visita (con intro): FCP 0,66–0,74 s, LCP 0,67–0,74 s, CLS 0, TBT ≈ 0.
- Escena 3D: ~25 mil triángulos y 64 llamadas de dibujo por cuadro (tope del test: 150 mil y 120).
- El LCP «simulado» de Lighthouse mobile (~2,8 s) es una estimación que penaliza los ~120 KB del runtime de Next; la medición real está arriba.

La verificación definitiva es el dato de campo: Core Web Vitals en Search Console / CrUX unas semanas después de publicar.

## Plan

| Fase | Qué | Estado |
| --- | --- | --- |
| 0 | Base compartida: metadata por página, migas de pan, imagen para redes, menú activo, tests por ruta | Hecha |
| 1 | /sistemas | Hecha |
| 2 | /webs, /webs/planes y las 7 páginas por rubro (/webs/arquitectos, …) | Hecha |
| 3 | /casos, /casos/aspa-rodeo, /casos/aspa-scout | Hecha |
| 4 | /nosotros | Hecha |
| 5 | /contacto con formulario que funcione y política de privacidad | Hecha |
| 6 | Cierre: sitemap completo, Lighthouse CI en todas las rutas, links rotos | Hecha |

## Pendientes

- [ ] Precios de Planes (USD 200 / 600 / 20 por mes, del diseño): confirmar que son los vigentes y si incluyen IVA (`src/lib/webs.ts`).
- [ ] Permiso de los clientes que aparecen en Casos (DH Engineering y los diseños de ejemplo con nombre).
- [ ] **Variables del formulario** en el hosting: `EMAIL_USER` y `EMAIL_PASS` (contraseña de aplicación de Gmail). Ver «Formulario de contacto».
- [ ] Fotos del equipo para Nosotros (hoy van las iniciales, como en el diseño: `TEAM` en `src/app/nosotros/page.tsx`) y el LinkedIn personal de Agustín y Joaquín (hoy van al de la empresa).
- [ ] Revisión legal de la política de privacidad (`src/app/privacidad/page.tsx`).
- [ ] Versión en inglés (si se hace: rutas `/en`, `hreflang` y activar el botón EN).
- [ ] Confirmar que los clientes del marquee y los números («+5 años», «8 empresas»…) son definitivos.
- [ ] Al publicar: verificar el dominio en Google Search Console, enviar el sitemap y revisar la URL con la herramienta de inspección y el [Rich Results Test](https://search.google.com/test/rich-results).
