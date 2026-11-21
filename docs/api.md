# Contrato de la API (backend)

Base URL local: `http://localhost:4000` (configurable con la variable `PORT`).

Para levantarla:

```bash
cd backend
npm install
node index.js
```

## Usuarios de prueba

| usuario | clave | nombre |
|---|---|---|
| `admin` | `123` | Administrador |
| `estudiante` | `123` | Juan Pérez |

Solo para pruebas locales con datos simulados.

## Endpoints

### `GET /`
Comprueba que la API responde.

```json
{ "mensaje": "API funcionando correctamente" }
```

### `POST /login`
Cuerpo (JSON): `{ "usuario": "admin", "clave": "123" }`

Respuesta 200:

```json
{
  "mensaje": "Login exitoso",
  "token": "<JWT>",
  "usuario": { "id": 1, "usuario": "admin", "nombre": "Administrador" }
}
```

Respuesta 401: `{ "mensaje": "Usuario o clave incorrectos" }`

El token vence en 1 hora.

### `GET /solicitudes`  (requiere token)
Encabezado: `Authorization: Bearer <token>`

```json
[
  { "id": 101, "titulo": "Constancia de estudios", "estado": "Pendiente" },
  { "id": 102, "titulo": "Certificado de notas", "estado": "Aprobado" }
]
```

### `GET /solicitudes/:id`  (requiere token)
Devuelve una solicitud, por ejemplo `GET /solicitudes/101`:

```json
{ "id": 101, "titulo": "Constancia de estudios", "estado": "Pendiente" }
```

Respuesta 404: `{ "mensaje": "Solicitud no encontrada" }`

## Errores de autenticación (rutas protegidas)

| Código | Mensaje | Cuándo |
|---|---|---|
| 401 | `Acceso denegado: token no proporcionado` | No se envió el encabezado `Authorization` |
| 401 | `Token inválido o expirado` | El token es incorrecto o ya venció |

Todos los errores usan el formato `{ "mensaje": "..." }`.

## Nota de CORS
La API acepta peticiones desde cualquier origen (`cors()` sin restricciones), suficiente para desarrollo local.
