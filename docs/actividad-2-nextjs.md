# Actividad 2: Next.js con SSR, SSG y rutas dinámicas

Responsable: Santiago Javier Prado Carrasco.

## Implementación

El proyecto se encuentra en frontend-next y utiliza Pages Router.

- /: información general con getStaticProps.
- /solicitudes: listado con getServerSideProps.
- /solicitudes/[id]: detalle con getServerSideProps y parámetro id.
- Una solicitud inexistente devuelve notFound y muestra la página 404.

## Justificación

Se utiliza SSG para la información general porque cambia poco y puede
prepararse durante la compilación.

Se utiliza SSR para el listado y el detalle porque representan información
que podría cambiar entre peticiones.

La demostración utiliza datos ficticios compatibles con el backend:
id, titulo y estado. No incorpora autenticación ni consume la API;
esas funciones corresponden a la Actividad 1.

## Ejecución

Desde frontend-next:

npm ci
npm run dev

Para verificar producción:

npm run build
npm run start

## Resultados

Se verificó con `npm run build` y `npm run start` en local, y sobre la aplicación
desplegada en Vercel (capturas de la Actividad 3). Las capturas están en
[`docs/evidencias/`](evidencias/).

| Prueba | Resultado | Evidencia |
|---|---|---|
| Clasificación de rutas del build | `/` es SSG (●), `/404` es estática (○), y `/solicitudes`, `/solicitudes/[id]` y `/api/hello` son dinámicas (ƒ). | `build-next.png`, `build-webpack.png` |
| Fecha SSG conservada al recargar | `/` muestra siempre la misma fecha, la del build. En local se pidió dos veces con 2 s de diferencia y la fecha fue idéntica. | `vercel-inicio.png` |
| Fecha SSR actualizada al recargar | `/solicitudes` cambia en cada petición: en dos recargas la fecha pasó de `03:02:05.564Z` a `03:02:22.145Z`. | `vercel-ssr-1.png`, `vercel-ssr-2.png` |
| Detalle de los ids 101 y 102 | `/solicitudes/101` muestra "Constancia de estudios" (Pendiente). `/solicitudes/102` respondió 200 con "Certificado de notas" en la prueba local; no tiene captura. | `vercel-detalle.png` |
| Página 404 para un id inexistente | `/solicitudes/999` responde 404 y muestra "Página o solicitud no encontrada". | `vercel-404.png` |

## Entrega para despliegue

Directorio raíz en Vercel: frontend-next.
Comando de build: npm run build.
No requiere variables de entorno para esta demostración local.
Webpack se fija en los scripts `dev` y `build` de `frontend-next/package.json`
con la opción `--webpack`, porque Next.js 16 usa Turbopack por defecto. El build
lo confirma con `Next.js 16.4.6 (webpack)`. Más detalle en
[`produccion.md`](produccion.md).