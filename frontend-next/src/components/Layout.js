import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ titulo, children }) {
  return (
    <>
      <Head>
        <title>{titulo} | Solicitudes PA4</title>
        <meta
          name="description"
          content="Plataforma académica de demostración con Next.js"
        />
      </Head>

      <header>
        <strong>Solicitudes académicas · PA4</strong>

        <nav aria-label="Navegación principal">
          <Link href="/">Información</Link>
          <Link href="/solicitudes">Solicitudes</Link>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}