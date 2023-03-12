import Header from "@/components/Header";
import Head from "next/head";
import React, { FC } from "react";

interface CheckoutProps {}

const Checkout: FC<CheckoutProps> = ({}) => {
  return (
    <div>
      <Head>
        <title>Bag - Apple</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main></main>
    </div>
  );
};

export default Checkout;
