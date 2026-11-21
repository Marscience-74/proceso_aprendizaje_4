const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { usuarios, solicitudes } = require("./mockData");

const app = express();
const PORT = 3000;
const SECRET_KEY = "adasdasfdsfsdfsdfsdf";

app.use(cors());
app.use(express.json());


app.post("/login", (req, res) => {
  const { usuario, clave } = req.body;

  const userFound = usuarios.find(
    (u) => u.usuario === usuario && u.clave === clave
  );

  if (!userFound) {
    return res.status(401).json({ mensaje: "Usuario o clave incorrectos" });
  }

  const token = jwt.sign(
    { id: userFound.id, usuario: userFound.usuario },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({
    mensaje: "Login exitoso",
    token
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


app.get("/", (req, res) => {
  res.json({ mensaje: "API funcionando correctamente" });
});

//iniciar
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});