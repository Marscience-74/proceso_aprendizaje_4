import Layout from '@/components/Layout';

export default function Informacion({ generadoEn }) {
  return (
    <Layout titulo="Información">
      <h1>Gestión de solicitudes académicas</h1>

      <p>
        Esta plataforma permite consultar solicitudes y revisar
        su estado.
      </p>

      <h2>¿Qué solicitudes podemos consultar?</h2>

      <ul>
        <li>Constancias de estudios.</li>
        <li>Certificados de notas.</li>
      </ul>

      <h2>Generación estática: SSG</h2>

      <p>
        Esta página contiene información general que cambia poco.
        Se prepara durante la compilación.
      </p>

      <p>
        Generada en: <time dateTime={generadoEn}>{generadoEn}</time>
      </p>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      generadoEn: new Date().toISOString()
    }
  };
}