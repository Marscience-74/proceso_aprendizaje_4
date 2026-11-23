// Cliente de la API del backend. Usa fetch y no guarda nada: recibe el token como argumento.

export const API_URL = (import.meta.env?.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

// Error con el código HTTP (status) y el mensaje que devuelve la API.
// status 0 significa que no hubo respuesta (API caída o sin red).
export class ApiError extends Error {
  constructor(status, mensaje) {
    super(mensaje);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(ruta, { method = "GET", token, body } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "No se pudo conectar con la API. Verifica que esté en marcha.");
  }

  let datos = null;
  try {
    datos = await respuesta.json();
  } catch {
    // La respuesta no trae JSON; se usa un mensaje genérico más abajo si hubo error.
  }

  if (!respuesta.ok) {
    throw new ApiError(respuesta.status, datos?.mensaje || "Ocurrió un error inesperado.");
  }
  return datos;
}

export function login(usuario, clave) {
  return request("/login", { method: "POST", body: { usuario, clave } });
}

export function getSolicitudes(token) {
  return request("/solicitudes", { token });
}

export function getSolicitud(id, token) {
  return request(`/solicitudes/${encodeURIComponent(id)}`, { token });
}
