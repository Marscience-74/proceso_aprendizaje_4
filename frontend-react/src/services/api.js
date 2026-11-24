import axios from "axios";
import { leerSesion } from "../session.js";

export const API_URL = (import.meta.env?.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(status, mensaje) {
    super(mensaje);
    this.name = "ApiError";
    this.status = status;
  }
}

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: adjunta automáticamente el token JWT en Authorization en cada petición
apiClient.interceptors.request.use(
  (config) => {
    const sesion = leerSesion();
    if (sesion?.token) {
      config.headers.Authorization = `Bearer ${sesion.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Normaliza los errores de Axios al formato ApiError que ya usan los componentes
function manejarError(err) {
  if (!err.response) {
    throw new ApiError(0, "No se pudo conectar con la API. Verifica que esté en marcha.");
  }
  const status = err.response.status;
  const mensaje =
    err.response.data?.mensaje ||
    (status === 401
      ? "No autorizado o sesión expirada (401)."
      : status >= 500
      ? "Error interno del servidor (500)."
      : "Ocurrió un error inesperado.");
  throw new ApiError(status, mensaje);
}

export async function login(usuario, clave) {
  try {
    const { data } = await apiClient.post("/login", { usuario, clave });
    return data;
  } catch (err) {
    manejarError(err);
  }
}

export async function getSolicitudes() {
  try {
    const { data } = await apiClient.get("/solicitudes");
    return data;
  } catch (err) {
    manejarError(err);
  }
}

export async function getSolicitud(id) {
  try {
    const { data } = await apiClient.get(`/solicitudes/${encodeURIComponent(id)}`);
    return data;
  } catch (err) {
    manejarError(err);
  }
}

export default apiClient;