import { GetStaticProps } from "next";
import Head from "next/head";

import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

/*
Formas de renderização

- Client Side

  A renderização ocorre no cliente. O conteúdo da página não renderiza imediatamente, o que prejudica a indexeção pelos motores de busca.

- Server Side

  As chamadas ao back-end são feitas no servidor. Ao ser carregada a página, o conteúdo já está disponível.

- Static Site Generation

  Ao ser realizado o primeiro acesso pelo cliente, o servidor gera uma página estática que será acessada por todas as requisições posteriores,
até que seja renovada no período definido. 
*/

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1L2vyjBfWh0t2h4HnRZ3kk9a");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
