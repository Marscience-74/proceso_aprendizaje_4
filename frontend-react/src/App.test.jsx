import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App.jsx";

// fetch simulado: responde según el método y la ruta, y guarda cada llamada.
function simularApi(rutas) {
  const llamadas = [];
  const fetchSimulado = vi.fn(async (url, opciones = {}) => {
    const ruta = new URL(url).pathname;
    const clave = `${opciones.method ?? "GET"} ${ruta}`;
    llamadas.push({ clave, opciones });
    const manejador = rutas[clave];
    if (!manejador) return { ok: false, status: 404, json: async () => ({ mensaje: "Ruta no encontrada" }) };
    return typeof manejador === "function" ? manejador(opciones) : manejador;
  });
  vi.stubGlobal("fetch", fetchSimulado);
  return llamadas;
}

const ok = (datos) => ({ ok: true, status: 200, json: async () => datos });
const fallo = (status, mensaje) => ({ ok: false, status, json: async () => ({ mensaje }) });

const LOGIN_OK = ok({
  mensaje: "Login exitoso",
  token: "token-de-prueba",
  usuario: { id: 1, usuario: "admin", nombre: "Administrador" },
});
const LISTA = ok([
  { id: 101, titulo: "Constancia de estudios", estado: "Pendiente" },
  { id: 102, titulo: "Certificado de notas", estado: "Aprobado" },
]);

function iniciarSesion(usuario = "admin", clave = "123") {
  fireEvent.change(screen.getByLabelText("Usuario"), { target: { value: usuario } });
  fireEvent.change(screen.getByLabelText("Clave"), { target: { value: clave } });
  fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));
}

describe("Cliente React", () => {
  it("muestra el formulario de login al inicio", () => {
    simularApi({});
    render(<App />);
    expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeTruthy();
  });

  it("con credenciales correctas guarda la sesión y muestra la lista enviando el token", async () => {
    const llamadas = simularApi({ "POST /login": LOGIN_OK, "GET /solicitudes": LISTA });
    render(<App />);
    iniciarSesion();

    expect(await screen.findByText("Constancia de estudios")).toBeTruthy();
    expect(screen.getByText("Certificado de notas")).toBeTruthy();
    expect(screen.getByText("Administrador")).toBeTruthy();

    expect(JSON.parse(sessionStorage.getItem("sesion")).token).toBe("token-de-prueba");

    const peticionLista = llamadas.find((l) => l.clave === "GET /solicitudes");
    expect(peticionLista.opciones.headers.Authorization).toBe("Bearer token-de-prueba");
  });

  it("con credenciales incorrectas muestra el error de la API y no guarda sesión", async () => {
    simularApi({ "POST /login": fallo(401, "Usuario o clave incorrectos") });
    render(<App />);
    iniciarSesion("admin", "mala");

    expect((await screen.findByRole("alert")).textContent).toBe("Usuario o clave incorrectos");
    expect(sessionStorage.getItem("sesion")).toBeNull();
  });

  it("si la API no responde avisa que no se pudo conectar", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new TypeError("Failed to fetch"); }));
    render(<App />);
    iniciarSesion();

    expect((await screen.findByRole("alert")).textContent).toContain("No se pudo conectar con la API");
  });

  it("abre el detalle de una solicitud", async () => {
    simularApi({
      "POST /login": LOGIN_OK,
      "GET /solicitudes": LISTA,
      "GET /solicitudes/101": ok({ id: 101, titulo: "Constancia de estudios", estado: "Pendiente" }),
    });
    render(<App />);
    iniciarSesion();

    fireEvent.click((await screen.findAllByRole("button", { name: "Ver detalle" }))[0]);
    expect(await screen.findByRole("heading", { name: "Detalle de la solicitud 101" })).toBeTruthy();
    expect(screen.getByText("Pendiente")).toBeTruthy();
  });

  it("muestra el 404 de la API cuando la solicitud no existe", async () => {
    simularApi({
      "POST /login": LOGIN_OK,
      "GET /solicitudes": LISTA,
      "GET /solicitudes/999": fallo(404, "Solicitud no encontrada"),
    });
    render(<App />);
    iniciarSesion();

    await screen.findByText("Constancia de estudios");
    fireEvent.change(screen.getByLabelText("Buscar por número"), { target: { value: "999" } });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect((await screen.findByRole("alert")).textContent).toBe("Solicitud no encontrada");
  });

  it("si el token venció (401) vuelve al login con un aviso y borra la sesión", async () => {
    simularApi({
      "POST /login": LOGIN_OK,
      "GET /solicitudes": fallo(401, "Token inválido o expirado"),
    });
    render(<App />);
    iniciarSesion();

    expect((await screen.findByRole("status")).textContent).toContain("Tu sesión expiró");
    expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeTruthy();
    expect(sessionStorage.getItem("sesion")).toBeNull();
  });

  it("recupera la sesión guardada al recargar la página", async () => {
    sessionStorage.setItem(
      "sesion",
      JSON.stringify({ token: "guardado", usuario: { id: 2, usuario: "estudiante", nombre: "Juan Pérez" } })
    );
    const llamadas = simularApi({ "GET /solicitudes": LISTA });
    render(<App />);

    expect(await screen.findByText("Constancia de estudios")).toBeTruthy();
    expect(screen.getByText("Juan Pérez")).toBeTruthy();
    expect(llamadas.some((l) => l.clave === "POST /login")).toBe(false);
  });

  it("cerrar sesión borra la sesión y vuelve al login", async () => {
    simularApi({ "POST /login": LOGIN_OK, "GET /solicitudes": LISTA });
    render(<App />);
    iniciarSesion();

    await screen.findByText("Constancia de estudios");
    fireEvent.click(screen.getByRole("button", { name: "Cerrar sesión" }));

    await waitFor(() => expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeTruthy());
    expect(sessionStorage.getItem("sesion")).toBeNull();
  });
});
