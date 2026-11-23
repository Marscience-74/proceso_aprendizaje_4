# Preparación para producción (Actividad 4)

Resumen de lo configurado en el backend (`backend/`) y en el frontend Next.js (`frontend-next/`), con lo que se verificó en cada caso.

## 1. Qué se configuró y por qué

| Aspecto | Qué se hizo | Por qué |
|---|---|---|
| Minificación y optimización | `npm run build` ejecuta `next build --webpack`. El código sale minificado: el chunk `framework` pesa unos 214 KB en una sola línea de unos 219 000 caracteres. | Reduce el tamaño de lo que descarga el navegador. |
| Webpack | Se fuerza con `--webpack` en los scripts `dev` y `build` de `frontend-next/package.json`. `next.config.mjs` solo define `reactStrictMode: true`, sin configuración propia de Webpack. | Next.js 16 usa Turbopack por defecto; el enunciado pide documentar Webpack, así que se eligió explícitamente. El build lo confirma: `Next.js 16.4.6 (webpack)`. |
| Babel | No hay configuración de Babel en el proyecto (no existe `.babelrc` ni equivalente). Next.js compila con SWC cuando no se configura Babel. | Evitar configuración que el proyecto no necesita. |
| Variables de entorno | El backend lee `JWT_SECRET`, `PORT`, `JWT_EXPIRES_IN` y `LOG_LEVEL` desde un `.env` en la raíz del repositorio, con `dotenv`. Ya no hay secretos escritos en el código. | Separar configuración y secretos del código. |
| Logs | Cada petición se registra con fecha, método, ruta, código y duración. Los logins fallidos y los errores se registran como advertencia o error. No se guardan cuerpos ni encabezados. | Poder diagnosticar problemas sin exponer claves ni tokens. |
| Monitoreo | Endpoint `GET /health`, sin autenticación y sin datos sensibles. | Comprobar rápido si el servicio está activo. |
| Scripts | `npm start` (producción) y `npm run dev` (con recarga automática) en el backend. | Arranque estándar y repetible. |

## 2. Variables de entorno

El archivo `.env` no se versiona (está en `.gitignore`). Se crea copiando la plantilla:

```bash
cp .env.example .env
```

| Variable | Dónde se usa | ¿Secreta? | Comentario |
|---|---|---|---|
| `JWT_SECRET` | Backend | **Sí** | Obligatoria: sin ella el servidor no arranca y muestra un mensaje claro. |
| `JWT_EXPIRES_IN` | Backend | No | Duración del token. Por defecto `1h`. |
| `PORT` | Backend | No | Por defecto `4000`. |
| `LOG_LEVEL` | Backend | No | `error`, `warn`, `info` o `debug`. Por defecto `info`. |
| `NODE_ENV` | Backend y frontend | No | `development` en local. |
| `NEXT_PUBLIC_API_URL` | Frontend | No (es pública) | Reservada para cuando el frontend consuma la API. Hoy `frontend-next` usa datos locales y no la necesita. |

El despliegue de `frontend-next` en Vercel no requiere variables de entorno.

## 3. Logs y monitoreo

Ejemplo de logs del backend (nivel `info`):

```text
[2026-11-23T03:50:32.398Z] INFO GET /health 200 4ms
[2026-11-23T03:50:32.405Z] INFO GET / 200 1ms
[2026-11-23T03:50:32.423Z] WARN Login fallido {"usuario":"admin"}
[2026-11-23T03:50:32.423Z] WARN POST /login 401 1ms
[2026-11-23T03:50:32.431Z] WARN GET /solicitudes 401 0ms
[2026-11-23T03:50:32.439Z] WARN GET /ruta-inexistente 404 1ms
[2026-11-23T03:50:32.451Z] INFO POST /login 200 3ms
[2026-11-23T03:50:32.477Z] INFO GET /solicitudes 200 2ms
```

Ejemplo de respuesta de `GET /health`:

```json
{ "estado": "ok", "uptime": 42, "timestamp": "2026-11-23T03:51:12.763Z" }
```

Además, las rutas inexistentes responden `404` y los errores no controlados `500` o `400`, siempre en JSON (`{ "mensaje": "..." }`).

## 4. Pruebas realizadas

- Sin `.env`, el backend se detiene con el mensaje "Falta la variable JWT_SECRET".
- Con `.env`: `/`, `/health`, login correcto e incorrecto, `/solicitudes` sin token (401) y con token (200), `/solicitudes/101` (200), `/solicitudes/999` (404), una ruta inexistente (404) y un JSON mal formado (400).
- Se buscó en el log el token, la clave y el encabezado `Authorization`: no aparecen.
- `npm ci` y `npm run build` en `frontend-next` terminan sin errores. Rutas resultantes: `/` en SSG, `/404` estática, y `/solicitudes`, `/solicitudes/[id]` y `/api/hello` dinámicas.

## 5. Lista de verificación

- [x] `npm run build` termina sin errores y usa Webpack.
- [x] `.env` está en `.gitignore` y no hay secretos en el código.
- [x] `.env.example` está actualizado con todas las variables.
- [x] El backend registra peticiones, logins fallidos y errores.
- [x] Existe el endpoint `/health`.
- [x] Capturas de evidencia agregadas en `docs/evidencias/`.
- [ ] Redespliegue final en Vercel con la versión definitiva.

## 6. Evidencias

| Evidencia | Archivo |
|---|---|
| Build con Webpack y tabla de rutas | `docs/evidencias/build-webpack.png` |
| Backend en marcha con logs de peticiones | `docs/evidencias/backend-logs.png` |
| Respuesta de `/health` | `docs/evidencias/health.png` |

## 7. Limitaciones

- Los usuarios y las solicitudes son datos de prueba en memoria, sin base de datos.
- El backend no está desplegado: Render, MongoDB Atlas, HTTPS, Helmet y Lighthouse quedan para la Evaluación Integral (sesiones 14 y 15).
- Los logs se escriben en la consola; no se guardan en archivo.
