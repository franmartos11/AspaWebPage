# Fuentes

Inter e Inter Tight (licencia SIL Open Font License), recortadas con [fontTools](https://github.com/fonttools/fonttools).
Inter sale de la [versión oficial 4.1](https://github.com/rsms/inter/releases/tag/v4.1) (`InterVariable.ttf`, misma
versión 4.001 que Google Fonts) porque la de Google no trae las flechas (→ ↗ ←) que usa el sitio: sin ellas el navegador
las dibujaba con otra fuente, más anchas. Inter Tight sale de Google Fonts (subset `latin`, variable).

- Caracteres: `U+0020-007E, U+00A0-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2013-2014, U+2018-201A, U+201C-201E, U+2022, U+2026, U+20AC, U+2122, U+2190-2199, U+2713` (las flechas y ✓ solo en Inter)
- Eje de peso: Inter 400–700, Inter Tight 600–700 (los pesos que usa el diseño).

```py
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

f = TTFont("InterVariable.ttf")
opts = subset.Options(); opts.name_IDs = ["*"]; opts.notdef_outline = True
# solo las funciones que usa el sitio (con "*" pesa 15 KB más)
opts.layout_features = ["calt", "dnom", "frac", "kern", "locl", "numr", "pnum", "tnum"]
s = subset.Subsetter(opts); s.populate(unicodes=subset.parse_unicodes(UNICODES)); s.subset(f)
f = instancer.instantiateVariableFont(f, {"opsz": 14, "wght": (400, 700)})
f.flavor = "woff2"; f.save("inter-400-700.woff2")
```

Si el sitio pasa a usar otro peso o un idioma con otros caracteres, hay que regenerarlas.
