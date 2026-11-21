const solicitudes = [
  {
    id: 101,
    titulo: 'Constancia de estudios',
    estado: 'Pendiente'
  },
  {
    id: 102,
    titulo: 'Certificado de notas',
    estado: 'Aprobado'
  }
];

export function obtenerSolicitudes() {
  return solicitudes.map(solicitud => ({ ...solicitud }));
}

export function obtenerSolicitudPorId(id) {
  return solicitudes.find(
    solicitud => String(solicitud.id) === String(id)
  ) ?? null;
}