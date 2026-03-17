# Firys Landing Page

Landing page estatica hecha con HTML5 + Tailwind CDN + JavaScript ligero.

## Archivos

- `index.html`: estructura principal y SEO base.
- `styles.css`: estilos extra (fondo, animaciones, efectos).
- `script.js`: menu movil, animaciones reveal y validacion simple de formulario.
- `robots.txt` y `sitemap.xml`: indexacion basica para buscadores.
- `site.webmanifest` y `favicon.svg`: identidad basica del sitio.

## Antes de publicar

1. Cambia `https://firys.com/` por tu dominio real en:
   - `index.html` (`canonical`, `og:url`, `og:image`)
   - `robots.txt`
   - `sitemap.xml`
2. Si quieres que el formulario envie correos reales, conecta `script.js` a un backend o servicio tipo Formspree/Getform.

## Publicar rapido

Puedes subir estos archivos directamente a:

- Netlify (drag and drop)
- Vercel (importando repo)
- GitHub Pages (branch con archivos estaticos)
- Cualquier hosting con soporte para sitios estaticos

No requiere build ni Node.js para funcionar.