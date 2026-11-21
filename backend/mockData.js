const usuarios = [
  { id: 1, usuario: "admin", clave: "123", nombre: "Administrador" },
  { id: 2, usuario: "estudiante", clave: "123", nombre: "Juan Pérez" }
];

const solicitudes = [
  { id: 101, titulo: "Constancia de estudios", estado: "Pendiente" },
  { id: 102, titulo: "Certificado de notas", estado: "Aprobado" }
];

module.exports = { usuarios, solicitudes };