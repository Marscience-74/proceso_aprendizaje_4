const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env"), quiet: true });
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { usuarios, solicitudes } = require("./mockData");

const app = express();
const PORT = process.env.PORT || 4000;
const SECRET_KEY = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const LOG_LEVEL = process.env.LOG_LEVEL || "info";

if (!SECRET_KEY) {
  console.error("Falta la variable JWT_SECRET. Copia .env.example a .env y define un valor.");
  process.exit(1);
}

// Logs básicos. Niveles: error < warn < info < debug
const NIVELES = { error: 0, warn: 1, info: 2, debug: 3 };
function log(nivel, mensaje, extra) {
  if ((NIVELES[nivel] ?? 2) > (NIVELES[LOG_LEVEL] ?? 2)) return;
  const linea = `[${new Date().toISOString()}] ${nivel.toUpperCase()} ${mensaje}`;
  (nivel === "error" ? console.error : console.log)(
    extra ? `${linea} ${JSON.stringify(extra)}` : linea
  );
}

app.use(cors());
app.use(express.json());

// Registro de cada petición. No se guardan cuerpos ni encabezados,
// para no exponer claves ni tokens.
app.use((req, res, next) => {
  const inicio = Date.now();
  res.on("finish", () => {
    const nivel = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
    log(nivel, `${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - inicio}ms`);
  });
  next();
});


app.post("/login", (req, res) => {
  const { usuario, clave } = req.body;

  const userFound = usuarios.find(
    (u) => u.usuario === usuario && u.clave === clave
  );

  if (!userFound) {
    log("warn", "Login fallido", { usuario });
    return res.status(401).json({ mensaje: "Usuario o clave incorrectos" });
  }

  const token = jwt.sign(
    { id: userFound.id, usuario: userFound.usuario },
    SECRET_KEY,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.json({
    mensaje: "Login exitoso",
    token,
    usuario: {
      id: userFound.id,
      usuario: userFound.usuario,
      nombre: userFound.nombre
    }
  });
});


function verificarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado: token no proporcionado" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: "Token inválido o expirado" });
    }
    req.usuario = decoded;
    next();
  });
}


app.get("/solicitudes", verificarToken, (req, res) => {
  res.json(solicitudes);
});

app.get("/solicitudes/:id", verificarToken, (req, res) => {
  const id = Number(req.params.id);
  const solicitud = solicitudes.find((s) => s.id === id);

  if (!solicitud) {
    return res.status(404).json({ mensaje: "Solicitud no encontrada" });
  }

  res.json(solicitud);
});


app.get("/", (req, res) => {
  res.json({ mensaje: "API funcionando correctamente" });
});

// Comprobación de salud para monitoreo (sin autenticación ni datos sensibles)
app.get("/health", (req, res) => {
  res.json({
    estado: "ok",
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Ruta inexistente
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Errores no controlados
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  log(status >= 500 ? "error" : "warn", `Error: ${err.message}`);
  res.status(status).json({
    mensaje: status >= 500 ? "Error interno del servidor" : "Solicitud inválida"
  });
});

//iniciar
app.listen(PORT, () => {
  log("info", `Servidor corriendo en http://localhost:${PORT}`);
});