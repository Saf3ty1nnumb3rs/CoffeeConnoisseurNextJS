import Head from 'next/head';
import { useRouter } from 'next/router';

const DynamicPage = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{router.query.dynamicid}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{`Page ${router.query.dynamicid}`}</h1>
    </div>
  );
};

export default DynamicPage;
