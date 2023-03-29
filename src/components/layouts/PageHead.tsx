import Head from "next/head";

export default function PageHead({ title = "" }: { title?: string }) {
  return (
    <Head>
      <title>
        {title ? `${title} | Crypto Payment App` : `Crypto Payment App`}
      </title>
      <meta name="description" content="Crypto Payment App" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
