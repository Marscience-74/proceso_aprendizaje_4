# README — Plataforma de Gestión de Solicitudes Académicas (PA4)

> **Curso:** PROGRAMACION WEB - II  
> **Código:** 30690  
> **Evaluación:** PA4 — Proceso de Aprendizaje 4  
> **Periodo / corte:** 202620 · Sesión 13  
> **Equipo:** Grupo 7  


## 1. Integrantes

| Integrante | Rol | Participación |
|---|---|---|
| Leonardo Alonso Guillén Zúñiga | Backend Node.js (apoyo a la Actividad 1) | API Express con login JWT, ruta `/solicitudes` protegida con token y datos de prueba (`backend/`). **Pendiente:** pruebas del backend con capturas (login y rutas protegidas). |
| Flavio César García Flores | Actividad 1, parte 2: cliente React (consumo de la API y sesión JWT) | Cliente React con login, consumo de la API con manejo de errores y gestión de la sesión con JWT (en curso). |
| Mariano Guerrero Barrueto | Actividad 4: preparación para producción (e integración del repositorio) | Estructura del repositorio, README y documentación; ajustes a la API (ruta `GET /solicitudes/:id`, datos del usuario en el login y puerto 4000). Preparación para producción: variables de entorno, script `start`, logs y `/health` en el backend, build con Webpack documentado en `docs/produccion.md`. |
| Santiago Javier Prado Carrasco | Actividad 2: Next.js (SSR, SSG y ruta dinámica) | Proyecto `frontend-next` con Pages Router: `/` con SSG, `/solicitudes` y `/solicitudes/[id]` con SSR y página 404. Documentación en `docs/actividad-2-nextjs.md`. **Pendiente:** completar los resultados y capturas de ese documento y corregir su nota sobre Webpack. |
| Mariano Ramón Valderrama Shuña | Actividad 3: despliegue del frontend en Vercel | Despliegue del proyecto `frontend-next` en Vercel y verificación de sus rutas. URL: https://proceso-aprendizaje-4.vercel.app/ |

### Reparto de actividades

| # | Actividad | Responsable |
|---|---|---|
| 1 | Backend Node.js: API con login JWT y `/solicitudes` (apoyo a la Actividad 1) | Leonardo Alonso Guillén Zúñiga |
| 2 | Actividad 1 (parte 2): consumo de APIs y sesiones JWT en React | Flavio César García Flores |
| 3 | Actividad 2: Next.js con SSR, SSG y rutas dinámicas | Santiago Javier Prado Carrasco |
| 4 | Actividad 3: despliegue del frontend en Vercel | Mariano Ramón Valderrama Shuña |
| 5 | Actividad 4: preparación para producción | Mariano Guerrero Barrueto |


## 2. Descripción y objetivo

**Descripción:**  
Plataforma de Gestión de Solicitudes Académicas, que viene de la PA3. En esta cuarta etapa se agrega una API en Node.js con autenticación JWT, un frontend con Next.js que usa SSR y SSG, su despliegue en Vercel y la preparación de la solución para producción.

**Objetivo:**  
Integrar el frontend con una API y sesiones JWT, optimizar la entrega con Next.js (SSR/SSG y rutas dinámicas), desplegarlo en Vercel y preparar la solución para producción.

**Alcance:**  
Sesiones 11 a 13. No incluye despliegue del backend en Render/MongoDB Atlas ni seguridad XSS/CSRF (sesiones 14 y 15).


## 3. Desarrollo

### Actividad 1: Consumo de APIs y sesiones JWT en React
**Backend (API Node.js):** servidor Express con `POST /login` (devuelve un JWT y los datos del usuario), `GET /solicitudes` y `GET /solicitudes/:id`, ambas protegidas con el token. Corre en el puerto 4000 por defecto. El contrato completo está en [`docs/api.md`](docs/api.md).

**Cliente React:** [Pendiente: cómo se consume la API (Fetch/Axios), cómo se manejan errores y respuestas, y cómo se gestiona la sesión y el token.]

### Actividad 2: Next.js con SSR, SSG y rutas dinámicas
El proyecto está en `frontend-next` y usa Pages Router.

- `/`: información general con SSG (`getStaticProps`), porque cambia poco y se puede preparar durante la compilación.
- `/solicitudes`: listado con SSR (`getServerSideProps`), porque es información que puede cambiar entre peticiones.
- `/solicitudes/[id]`: detalle con SSR y parámetro dinámico `id`. Si la solicitud no existe, devuelve `notFound` y muestra la página 404.

La demostración usa datos locales compatibles con el backend (`id`, `titulo` y `estado`); no consume la API ni autentica. Detalle y justificación en [`docs/actividad-2-nextjs.md`](docs/actividad-2-nextjs.md).

### Actividad 3: Despliegue en Vercel
**URL desplegada:** https://proceso-aprendizaje-4.vercel.app/

**Proceso:** se creó una cuenta en Vercel con GitHub, se hizo un fork del repositorio del grupo (porque pertenece a otra cuenta de GitHub),  se importó en Vercel y se eligió `frontend-next` como Root Directory, porque el proyecto de Next.js está en esa carpeta. Vercel detectó Next.js y usó `npm run build`. Antes de desplegar se ejecutó el build localmente para verificar que no tuviera errores.

**Variables de entorno:** ninguna, porque la demostración usa datos locales y no consume la API.

**Verificación de rutas:**
- `/`: carga la página de inicio. La hora no cambia al recargar (SSG).
- `/solicitudes`: muestra 2 solicitudes. La hora cambia al recargar (SSR).
- `/solicitudes/101`: muestra el detalle de la solicitud (ruta dinámica).
- `/solicitudes/999`: muestra la página 404.

Capturas en [`docs/evidencias/`](docs/evidencias/).

### Actividad 4: Preparación para producción
Se preparó el proyecto para producción sin cambiar su funcionamiento:

- **Build con Webpack:** `npm run build` en `frontend-next` ejecuta `next build --webpack` y genera código minificado. Next.js compila con SWC, sin configuración de Babel.
- **Variables de entorno:** el backend lee `JWT_SECRET`, `PORT`, `JWT_EXPIRES_IN` y `LOG_LEVEL` desde un `.env` fuera de Git. `.env.example` documenta cada variable sin valores reales.
- **Logs:** cada petición queda registrada con fecha, método, ruta, código y duración; los logins fallidos y los errores se registran aparte. No se guardan cuerpos, claves ni tokens.
- **Monitoreo:** endpoint `GET /health` para comprobar que el servicio está activo.
- **Scripts:** `npm start` y `npm run dev` en el backend.

Detalle, pruebas y limitaciones en [`docs/produccion.md`](docs/produccion.md).

### Decisiones técnicas
- **SSG en la página de inicio y SSR en las solicitudes:** el inicio es contenido estático, por lo que se genera una sola vez en el build; las solicitudes cambian según el dato pedido y se resuelven en cada petición.
- **Webpack forzado con `--webpack`:** Next.js 16 usa Turbopack por defecto. Se fijó Webpack en los scripts `dev` y `build` porque el enunciado lo pide y así el build es el mismo para todo el equipo.
- **Configuración con `dotenv` y `.env` en la raíz:** el secreto JWT ya no está en el código y el servidor no arranca si falta, para evitar un despliegue con una clave por defecto.
- **Logs propios y mínimos:** se evitó una librería nueva. Los logs no incluyen cuerpos ni encabezados, para no filtrar credenciales.


## 4. Solución propuesta

[Arquitectura general: frontend, API, autenticación y despliegue. Puede incluir un diagrama.]

**Herramientas:** [React, Next.js, Node.js, Express, Axios, Vercel, Git y GitHub, etc.]


## 5. Cómo ejecutar o revisar

```bash
git clone https://github.com/Marscience-74/proceso_aprendizaje_4.git
cd proceso_aprendizaje_4

# Variables de entorno (en la raíz del repositorio; define un JWT_SECRET propio)
cp .env.example .env

# API (puerto 4000)
cd backend
npm install
npm start

# Frontend Next.js (en otra terminal, puerto 3000)
cd frontend-next
npm install
npm run dev
```

**Requisitos:** Node.js (probado con la versión 22). Las variables de entorno previstas están en `.env.example`.

**Pasos de revisión:**
1. [Abrir la URL y verificar la página de Inicio.]
2. [Iniciar sesión con un usuario de prueba.]
3. [Ver la lista de solicitudes y una ruta dinámica.]
4. [Probar un caso de error, por ejemplo credenciales inválidas.]
5. [Ejecutar `npm run build` y verificar que termina sin errores.]

> No se publican contraseñas, credenciales, tokens ni accesos de producción.


## 6. Evidencias

| Actividad | Evidencia |
|---|---|
| 1. Consumo de APIs y JWT | [Capturas del login, de la lista y de los errores] |
| 2. Next.js SSR/SSG | [Captura del resumen de `npm run build` y de la ruta dinámica] |
| 3. Vercel | URL: https://proceso-aprendizaje-4.vercel.app/ · Capturas en `docs/evidencias/` (`vercel-*.png` y `build-next.png`) |
| 4. Producción | Build con Webpack, logs del backend y `/health` en `docs/evidencias/` (`build-webpack.png`, `backend-logs.png`, `health.png`); variables y pruebas en [`docs/produccion.md`](docs/produccion.md) |


## 7. Conclusiones

- **API y JWT:** [Qué se aprendió y cómo se aplicó.] *(Sesión 11)*
- **Next.js (SSR/SSG):** [Qué se aprendió y cómo se aplicó.] *(Sesión 12)*
- **Vercel y producción:** [Qué se aprendió y cómo se aplicó.] *(Sesión 13)*
- **Balance del equipo:** [Conclusión general.]


## 8. Video de exposición

**Video público de YouTube:** [PEGAR AQUÍ EL ENLACE]

Todos los integrantes participan con la cámara prendida y explican el problema, el procedimiento, la solución, las decisiones tomadas y su justificación, relacionándolas con las sesiones 11 a 13.


## 9. Matriz de participación

| Integrante | Desarrollo | Pruebas | Documentación | Exposición | Evidencia de participación |
|---|---|---|---|---|---|
| Leonardo Alonso Guillén Zúñiga | API Express con login JWT, `/solicitudes` protegida y datos de prueba | [Qué probó] | [Qué documentó] | [Qué explicó en el video] | Commits "Inicializar proyecto" y "Servidor y mock data" |
| Flavio César García Flores | Cliente React con login y JWT en curso | [Qué probó] | [Qué documentó] | [Qué explicó en el video] | [Commits] |
| Mariano Guerrero Barrueto | Ajustes a la API; variables de entorno, logs y `/health`; documentación de producción | Backend sin `.env` (no arranca), login correcto e incorrecto, rutas con y sin token, 404 y JSON inválido; `npm run build` con Webpack | README, `docs/api.md` y `docs/produccion.md` | [Qué explicó en el video] | Commits "Actualizando la Actividad 1", "Corrigiendo el repositorio" |
| Santiago Javier Prado Carrasco | Proyecto Next.js con SSG, SSR y ruta dinámica | [Qué probó] | `docs/actividad-2-nextjs.md` | [Qué explicó en el video] | Commit "Implementar Next.js con SSR SSG y detalle dinamico" (PR #2) |
| Mariano Ramón Valderrama Shuña | Despliegue de `frontend-next` en Vercel | Build local y verificación de `/`, `/solicitudes`, `/solicitudes/101`, la página 404 y el comportamiento SSG/SSR en producción | Sección Actividad 3 del README y capturas en `docs/evidencias/` | [Qué explicó en el video] | [Commits] |

---

**Última actualización:** [22/11/2026]
