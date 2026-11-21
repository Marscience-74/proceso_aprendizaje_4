import Link from 'next/link';
import Layout from '@/components/Layout';

export default function NoEncontrado() {
  return (
    <Layout titulo="No encontrado">
      <h1>Página o solicitud no encontrada</h1>
      <p>Revisa la dirección o regresa al listado.</p>
      <Link href="/solicitudes">Ver solicitudes</Link>
    </Layout>
  );
}