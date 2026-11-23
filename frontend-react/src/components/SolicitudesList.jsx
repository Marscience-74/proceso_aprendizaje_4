import { useEffect, useState } from "react";
import { getSolicitudes } from "../api.js";

export default function SolicitudesList({ token, onAbrir, onSesionExpirada }) {
  const [solicitudes, setSolicitudes] = useState(null); // null = cargando
  const [error, setError] = useState("");
  const [intento, setIntento] = useState(0);
  const [buscado, setBuscado] = useState("");

  useEffect(() => {
    let cancelado = false;
    setSolicitudes(null);
    setError("");

    getSolicitudes(token)
      .then((datos) => {
        if (!cancelado) setSolicitudes(datos);
      })
      .catch((e) => {
        if (cancelado) return;
        if (e.status === 401) onSesionExpirada("Tu sesión expiró. Inicia sesión de nuevo.");
        else setError(e.message);
      });

    return () => {
      cancelado = true;
    };
  }, [token, intento, onSesionExpirada]);

  function buscar(evento) {
    evento.preventDefault();
    if (buscado.trim() !== "") onAbrir(buscado.trim());
  }

  return (
    <section>
      <h2>Mis solicitudes</h2>

      {error && (
        <p className="mensaje error" role="alert">
          {error}{" "}
          <button type="button" onClick={() => setIntento((n) => n + 1)}>Reintentar</button>
        </p>
      )}

      {solicitudes === null && !error && <p>Cargando solicitudes...</p>}

      {solicitudes && solicitudes.length === 0 && <p>No hay solicitudes.</p>}

      {solicitudes && solicitudes.length > 0 && (
        <ul className="lista">
          {solicitudes.map((s) => (
            <li key={s.id} className="tarjeta fila">
              <div>
                <strong>{s.titulo}</strong>
                <span className={`estado ${s.estado.toLowerCase()}`}>{s.estado}</span>
              </div>
              <button type="button" onClick={() => onAbrir(s.id)}>Ver detalle</button>
            </li>
          ))}
        </ul>
      )}

      <form className="busqueda" onSubmit={buscar}>
        <label>
          Buscar por número
          <input
            type="number"
            min="1"
            value={buscado}
            onChange={(e) => setBuscado(e.target.value)}
            placeholder="Ej.: 101"
          />
        </label>
        <button type="submit">Buscar</button>
      </form>
    </section>
  );
}
