import Link from 'next/link';
import Layout from '@/components/Layout';
import { obtenerSolicitudPorId } from '@/data/solicitudes';

export default function DetalleSolicitud({ solicitud }) {
  return (
    <Layout titulo={`Solicitud ${solicitud.id}`}>
      <h1>{solicitud.titulo}</h1>

      <article>
        <p>Identificador: {solicitud.id}</p>
        <p>Estado: {solicitud.estado}</p>
      </article>

      <Link href="/solicitudes">Volver a solicitudes</Link>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const solicitud = obtenerSolicitudPorId(params.id);

  if (!solicitud) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      solicitud
    }
  };
}