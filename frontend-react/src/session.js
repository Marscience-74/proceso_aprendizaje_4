// Sesión del usuario. Se guarda en sessionStorage: se pierde al cerrar la pestaña.
// El acceso va en try/catch porque el almacenamiento puede no estar disponible.

const CLAVE = "sesion";

export function guardarSesion(sesion) {
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify(sesion));
  } catch {
    // Sin almacenamiento: la sesión vive solo en memoria mientras la página esté abierta.
  }
}

export function leerSesion() {
  try {
    const bruto = sessionStorage.getItem(CLAVE);
    const sesion = bruto ? JSON.parse(bruto) : null;
    return sesion && typeof sesion.token === "string" ? sesion : null;
  } catch {
    return null;
  }
}

export function borrarSesion() {
  try {
    sessionStorage.removeItem(CLAVE);
  } catch {
    // Nada que borrar.
  }
}
