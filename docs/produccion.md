# Preparación para producción (Actividad 4)

> Documento de apoyo para la sección de producción del README. Completar con evidencias cuando las Actividades 1 a 3 estén terminadas.

## 1. Qué se configuró y por qué

| Aspecto | Qué se hizo | Por qué | Evidencia |
|---|---|---|---|
| Minificación y optimización | [Descripción del build] | [Reduce el tamaño y mejora la carga] | [Captura del resumen de `npm run build`] |
| Babel | [Configuración propia o la que usa Next.js por defecto] | [Compatibilidad del código con los navegadores] | [Captura o archivo de configuración] |
| Webpack | [Configuración propia o la que usa Next.js por defecto] | [Empaquetado y optimización de recursos] | [Captura o archivo de configuración] |
| Variables de entorno | [Lista de variables y dónde se definen] | [Separar configuración y secretos del código] | `.env.example` |
| Logs | [Qué se registra: peticiones, errores] | [Poder diagnosticar problemas] | [Captura de logs] |
| Monitoreo | [Endpoint `/health`, logs de Vercel] | [Saber si el servicio está activo] | [Captura] |

## 2. Variables de entorno

| Variable | Dónde se usa | ¿Secreta? | Valor en producción |
|---|---|---|---|
| `NODE_ENV` | Backend y frontend | No | `production` |
| `PORT` | Backend | No | [Valor] |
| `JWT_SECRET` | Backend | **Sí** | [Definido en el panel del servicio, no en el repositorio] |
| `JWT_EXPIRES_IN` | Backend | No | [Valor] |
| `LOG_LEVEL` | Backend | No | [Valor] |
| `NEXT_PUBLIC_API_URL` | Frontend | No (es pública) | [URL de la API] |

## 3. Lista de verificación

- [ ] `npm run build` termina sin errores.
- [ ] `.env` está en `.gitignore` y no hay secretos en el repositorio.
- [ ] `.env.example` está actualizado con todas las variables.
- [ ] Las variables de producción están cargadas en Vercel.
- [ ] El backend registra peticiones y errores.
- [ ] Existe un endpoint de salud (`/health`) o se revisaron los logs de Vercel.
- [ ] Hay capturas de cada punto anterior.

## 4. Conclusión

[Qué quedó configurado, qué limitaciones hay y qué faltaría para un entorno real, sin incluir contenidos de las sesiones 14 y 15.]
