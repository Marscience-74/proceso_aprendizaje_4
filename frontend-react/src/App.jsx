import { useCallback, useState } from "react";
import { login } from "./api.js";
import { borrarSesion, guardarSesion, leerSesion } from "./session.js";
import LoginForm from "./components/LoginForm.jsx";
import SolicitudesList from "./components/SolicitudesList.jsx";
import SolicitudDetalle from "./components/SolicitudDetalle.jsx";

export default function App() {
  const [sesion, setSesion] = useState(() => leerSesion());
  const [seleccion, setSeleccion] = useState(null); // id de la solicitud abierta
  const [aviso, setAviso] = useState("");

  // Cierra la sesión. Si viene un mensaje (por ejemplo, token vencido) se muestra en el login.
  const cerrarSesion = useCallback((mensaje = "") => {
    borrarSesion();
    setSesion(null);
    setSeleccion(null);
    setAviso(mensaje);
  }, []);

  // Lanza ApiError si las credenciales son incorrectas o la API no responde;
  // el formulario muestra ese mensaje.
  async function iniciarSesion(usuario, clave) {
    const datos = await login(usuario, clave);
    const nueva = { token: datos.token, usuario: datos.usuario };
    guardarSesion(nueva);
    setAviso("");
    setSesion(nueva);
  }

  if (!sesion) {
    return (
      <main className="contenedor">
        <h1>Solicitudes académicas</h1>
        <LoginForm onLogin={iniciarSesion} aviso={aviso} />
      </main>
    );
  }

  return (
    <main className="contenedor">
      <header className="barra">
        <h1>Solicitudes académicas</h1>
        <div className="usuario">
          <span>
            Sesión de <strong>{sesion.usuario?.nombre ?? sesion.usuario?.usuario}</strong>
          </span>
          <button type="button" onClick={() => cerrarSesion()}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {seleccion === null ? (
        <SolicitudesList
          token={sesion.token}
          onAbrir={setSeleccion}
          onSesionExpirada={cerrarSesion}
        />
      ) : (
        <SolicitudDetalle
          id={seleccion}
          token={sesion.token}
          onVolver={() => setSeleccion(null)}
          onSesionExpirada={cerrarSesion}
        />
      )}
    </main>
  );
}
