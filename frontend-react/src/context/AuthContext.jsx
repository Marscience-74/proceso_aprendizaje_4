import { createContext, useCallback, useContext, useState } from "react";
import { login as loginApi } from "../services/api.js";
import { borrarSesion, guardarSesion, leerSesion } from "../session.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => leerSesion());
  const [aviso, setAviso] = useState("");

  const login = async (usuario, clave) => {
    const datos = await loginApi(usuario, clave);
    const nueva = { token: datos.token, usuario: datos.usuario };
    guardarSesion(nueva);
    setAviso("");
    setSesion(nueva);
  };

  const logout = useCallback((mensaje = "") => {
    borrarSesion();
    setSesion(null);
    setAviso(mensaje);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        sesion,
        usuario: sesion?.usuario || null,
        token: sesion?.token || null,
        isAuthenticated: !!sesion?.token,
        aviso,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}