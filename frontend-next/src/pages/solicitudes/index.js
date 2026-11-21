import Link from 'next/link';
import Layout from '@/components/Layout';
import { obtenerSolicitudes } from '@/data/solicitudes';

export default function Solicitudes({ solicitudes, generadoEn }) {
  return (
    <Layout titulo="Solicitudes">
      <h1>Solicitudes académicas</h1>

      <p>
        Esta página utiliza SSR. El servidor prepara su contenido
        para cada petición.
      </p>

      <p>
        Generada en: <time dateTime={generadoEn}>{generadoEn}</time>
      </p>

      {solicitudes.length === 0 ? (
        <p>No hay solicitudes disponibles.</p>
      ) : (
        solicitudes.map(solicitud => (
          <article key={solicitud.id}>
            <h2>{solicitud.titulo}</h2>
            <p>Estado: {solicitud.estado}</p>

            <Link href={`/solicitudes/${solicitud.id}`}>
              Ver detalle
            </Link>
          </article>
        ))
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const solicitudes = obtenerSolicitudes();

  return {
    props: {
      solicitudes,
      generadoEn: new Date().toISOString()
    }
  };
}