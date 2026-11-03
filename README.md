# Gómez Perforaciones — sitio web

Sitio institucional en React 19 + Vite 8 + TypeScript + Tailwind CSS 4, con prerenderizado estático y formulario de contacto vía Resend (función serverless de Vercel).

## Comandos

```bash
pnpm install
pnpm dev          # desarrollo en http://localhost:5173 (el formulario necesita `vercel dev` para la API)
pnpm typecheck
pnpm lint
pnpm test         # tests de validación del formulario (Vitest)
pnpm build        # build cliente + SSR + prerender → dist/
pnpm preview
```

Para probar la API localmente: `pnpm dlx vercel dev` con un `.env.local` basado en `.env.example`.

## Estructura

```
api/contact.ts          Función serverless: validación, honeypot, límite por IP, envío por Resend
scripts/prerender.mjs   Inserta el HTML renderizado en dist/index.html
src/data/site.ts        Todos los textos y datos de la empresa (editar acá)
src/data/trabajos.ts    Fotos de la galería de trabajos
src/lib/validation.ts   Validación compartida cliente/servidor (+ tests)
src/components/         Header, Hero, WellDiagram, About, Services, Equipment, Works, Contact, ContactForm, Footer, Logo, ui/
public/                 favicon, robots.txt, sitemap.xml, brand/, images/trabajos/
```

## Despliegue en Vercel (requiere autorización)

1. Subir el repositorio a GitHub e importarlo en Vercel (detecta `vercel.json`).
2. Variables de entorno (Production y Preview): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (remitente de un dominio verificado en Resend) y opcionalmente `ALLOWED_ORIGIN`.
3. Desplegar primero un Preview, revisar, y recién después promover a Production.
4. Con el dominio definitivo: activar `<link rel="canonical">` y `og:url` en `index.html` y actualizar `robots.txt` y `sitemap.xml`.

## Agregar fotos de trabajos

Copiar las fotos reales a `public/images/trabajos/` (WebP, ~1600 px) y agregarlas en `src/data/trabajos.ts`. La galería con ampliación accesible se activa sola; mientras no haya fotos se muestra el enlace a TikTok.
