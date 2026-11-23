import { useState } from "react";

export default function LoginForm({ onLogin, aviso }) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento) {
    evento.preventDefault();
    setError("");
    setEnviando(true);
    try {
      await onLogin(usuario.trim(), clave);
    } catch (e) {
      setError(e.message);
      setEnviando(false);
    }
  }

  return (
    <form className="tarjeta" onSubmit={enviar}>
      <h2>Iniciar sesión</h2>

      {aviso && <p className="mensaje aviso" role="status">{aviso}</p>}

      <label>
        Usuario
        <input
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          autoComplete="username"
          required
        />
      </label>

      <label>
        Clave
        <input
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>

      {error && <p className="mensaje error" role="alert">{error}</p>}

      <button type="submit" disabled={enviando}>
        {enviando ? "Ingresando..." : "Ingresar"}
      </button>

      <p className="ayuda">Datos de prueba locales: usuario <code>admin</code>, clave <code>123</code>.</p>
    </form>
  );
}
