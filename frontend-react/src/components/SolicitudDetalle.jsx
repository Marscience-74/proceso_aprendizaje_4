import { useEffect, useState } from "react";
import { getSolicitud } from "../api.js";

export default function SolicitudDetalle({ id, token, onVolver, onSesionExpirada }) {
  const [solicitud, setSolicitud] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelado = false;
    setSolicitud(null);
    setError("");

    getSolicitud(id, token)
      .then((datos) => {
        if (!cancelado) setSolicitud(datos);
      })
      .catch((e) => {
        if (cancelado) return;
        if (e.status === 401) onSesionExpirada("Tu sesión expiró. Inicia sesión de nuevo.");
        else setError(e.message); // por ejemplo, 404: "Solicitud no encontrada"
      });

    return () => {
      cancelado = true;
    };
  }, [id, token, onSesionExpirada]);

  return (
    <section>
      <button type="button" onClick={onVolver}>← Volver a la lista</button>
      <h2>Detalle de la solicitud {id}</h2>

      {error && <p className="mensaje error" role="alert">{error}</p>}

      {!solicitud && !error && <p>Cargando...</p>}

      {solicitud && (
        <article className="tarjeta">
          <dl>
            <dt>Número</dt>
            <dd>{solicitud.id}</dd>
            <dt>Título</dt>
            <dd>{solicitud.titulo}</dd>
            <dt>Estado</dt>
            <dd>
              <span className={`estado ${solicitud.estado.toLowerCase()}`}>{solicitud.estado}</span>
            </dd>
          </dl>
        </article>
      )}
    </section>
  );
}
