import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SolicitudesList from "./components/SolicitudesList.jsx";
import SolicitudDetalle from "./components/SolicitudDetalle.jsx";

function LoginView() {
  const { isAuthenticated, login, aviso } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/solicitudes" replace />;
  }

  return (
    <main className="contenedor">
      <h1>Solicitudes académicas</h1>
      <LoginForm onLogin={login} aviso={aviso} />
    </main>
  );
}

function SolicitudesView() {
  const { usuario, token, logout } = useAuth();
  const [seleccion, setSeleccion] = useState(null);

  return (
    <main className="contenedor">
      <header className="barra">
        <h1>Solicitudes académicas</h1>
        <div className="usuario">
          <span>
            Sesión de <strong>{usuario?.nombre ?? usuario?.usuario}</strong>
          </span>
          <button type="button" onClick={() => logout()}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {seleccion === null ? (
        <SolicitudesList
          token={token}
          onAbrir={setSeleccion}
          onSesionExpirada={logout}
        />
      ) : (
        <SolicitudDetalle
          id={seleccion}
          token={token}
          onVolver={() => setSeleccion(null)}
          onSesionExpirada={logout}
        />
      )}
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route
            path="/solicitudes"
            element={
              <ProtectedRoute>
                <SolicitudesView />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/solicitudes" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}