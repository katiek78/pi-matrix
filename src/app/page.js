import Head from "next/head";
import Training from "@/components/Training";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pi Matrix Training</title>
        <meta
          name="description"
          content="An app to help memorize digits of pi for the Pi Matrix record"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Training />
      </main>
    </div>
  );
}
