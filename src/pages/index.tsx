import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Product from "@/components/Product";
import fetchCategories from "@/lib/fetchCategories";
import fetchProducts from "@/lib/fetchProducts";
import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface Props {
  categories: Category[];
  products: Product[];
  // session: Session | null;
}

export default function Home({ categories, products }: Props) {
  const showProducts = (categoryIndex: number) => {
    const categoryId = categories[categoryIndex]._id;
    return products
      .filter((product) => product.category._ref === categoryId)
      .map((product) => <Product product={product} key={product._id} />);
  };

  return (
    <>
      <Head>
        <title>Apple Store</title>
        <meta name='description' content='Generated by Apple Store' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='relative h-[200vh] bg-[#e7ecee]'>
        <Header />
        <Banner />
      </main>
      <section className='relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]'>
        <div className='space-y-10 py-16'>
          <h1 className='text-center text-4xl font-medium tracking-wide text-white md:text-5xl'>
            New Promos
          </h1>

          <Tab.Group>
            <Tab.List className='flex justify-center'>
              {categories.map((category) => (
                <Tab
                  key={category._id}
                  id={category._id}
                  className={({ selected }) =>
                    `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 opacity-75 md:text-base duration-200 hover:opacity-100 ${
                      selected
                        ? "borderGradient bg-[#35383C] text-white opacity-100"
                        : "border-b-2 border-[#35383C] text-[#747474]"
                    }`
                  }>
                  {category.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className='tabPanels'>
              {categories.map((_, index) => (
                <Tab.Panel key={index} className='productPanel'>
                  {showProducts(index)}
                </Tab.Panel>
              ))}
            </Tab.Panels>
            ;
          </Tab.Group>
        </div>
      </section>
    </>
  );
}

// Backend Code
export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  // const session = await getSession(context);

  return {
    props: {
      categories,
      products,
      // session,
    },
  };
};
