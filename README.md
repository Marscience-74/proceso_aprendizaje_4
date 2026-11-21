# README — Plataforma de Gestión de Solicitudes Académicas (PA4)

> **Curso:** PROGRAMACION WEB - II  
> **Código:** 30690  
> **Evaluación:** PA4 — Proceso de Aprendizaje 4  
> **Periodo / corte:** 202620 · Sesión 13  
> **Equipo:** Grupo 7  


## 1. Integrantes

| Integrante | Rol | Participación |
|---|---|---|
| Leonardo Alonso Guillén Zúñiga | Backend Node.js (apoyo a la Actividad 1) | API Express con login JWT, ruta `/solicitudes` protegida con token y datos de prueba (`backend/`). |
| Flavio César García Flores | [Rol] | [Qué desarrolló] |
| Mariano Guerrero Barrueto | Actividad 4: preparación para producción (e integración del repositorio) | Estructura del repositorio, README y documentación; ajustes a la API (ruta `GET /solicitudes/:id`, datos del usuario en el login y puerto 4000). Preparación para producción en curso. |
| Santiago Javier Prado Carrasco | Actividad 2: Next.js (SSR, SSG y ruta dinámica) | Proyecto `frontend-next` con Pages Router: `/` con SSG, `/solicitudes` y `/solicitudes/[id]` con SSR y página 404. Documentación en `docs/actividad-2-nextjs.md`. |
| Mariano Ramón Valderrama Shuña | [Rol] | [Qué desarrolló] |

### Reparto de actividades

| # | Actividad | Responsable |
|---|---|---|
| 1 | Backend Node.js: API con login JWT y `/solicitudes` (apoyo a la Actividad 1) | Leonardo Alonso Guillén Zúñiga |
| 2 | Actividad 1: consumo de APIs y sesiones JWT en React | [Nombre] |
| 3 | Actividad 2: Next.js con SSR, SSG y rutas dinámicas | Santiago Javier Prado Carrasco |
| 4 | Actividad 3: despliegue del frontend en Vercel | [Nombre] |
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
[Proceso de despliegue, variables configuradas y verificación de rutas.]  
**URL desplegada:** [URL de Vercel]

### Actividad 4: Preparación para producción
[Resumen de lo configurado. Detalle en [`docs/produccion.md`](docs/produccion.md).]

### Decisiones técnicas
- **[Decisión 1]:** [Qué se decidió y por qué.]
- **[Decisión 2]:** [Qué se decidió y por qué.]


## 4. Solución propuesta

[Arquitectura general: frontend, API, autenticación y despliegue. Puede incluir un diagrama.]

**Herramientas:** [React, Next.js, Node.js, Express, Axios, Vercel, Git y GitHub, etc.]


## 5. Cómo ejecutar o revisar

```bash
git clone https://github.com/Marscience-74/proceso_aprendizaje_4.git
cd proceso_aprendizaje_4

# API (puerto 4000)
cd backend
npm install
node index.js

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
| 3. Vercel | [URL funcional y capturas de las rutas desplegadas] |
| 4. Producción | [Capturas de build, variables (sin valores secretos) y logs] |


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
| Flavio César García Flores | [Qué desarrolló] | [Qué probó] | [Qué documentó] | [Qué explicó en el video] | [Commits] |
| Mariano Guerrero Barrueto | Ajustes a la API; preparación para producción en curso | [Qué probó] | README, `docs/api.md` y `docs/produccion.md` | [Qué explicó en el video] | Commits "Actualizando la Actividad 1", "Corrigiendo el repositorio" |
| Santiago Javier Prado Carrasco | Proyecto Next.js con SSG, SSR y ruta dinámica | [Qué probó] | `docs/actividad-2-nextjs.md` | [Qué explicó en el video] | Commit "Implementar Next.js con SSR SSG y detalle dinamico" (PR #2) |
| Mariano Ramón Valderrama Shuña | [Qué desarrolló] | [Qué probó] | [Qué documentó] | [Qué explicó en el video] | [Commits] |

---

**Última actualización:** [21/11/2026]