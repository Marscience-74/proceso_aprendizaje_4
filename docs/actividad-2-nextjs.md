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

Completar después de ejecutar las pruebas:
- Clasificación de rutas mostrada por el build.
- Fecha SSG conservada después de recargar.
- Fecha SSR actualizada después de recargar.
- Detalle correcto para los ids 101 y 102.
- Página 404 para un id inexistente.

## Entrega para despliegue

Directorio raíz en Vercel: frontend-next.
Comando de build: npm run build.
No requiere variables de entorno para esta demostración local.
Webpack se seleccionó explícitamente al crear el proyecto.