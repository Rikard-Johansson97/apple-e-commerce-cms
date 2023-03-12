import Header from "../../components/Header";
import { selectBasketItems, selectBasketTotal } from "@/redux/basketSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "@/components/Button";
import CheckoutProduct from "@/components/CheckoutProduct";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Checkout: FC = () => {
  const items = useSelector(selectBasketItems);
  const router = useRouter();
  const [groupedItemsInBasket, setGroupedItemsOutBasket] = useState<{
    [key: string]: Product[];
  }>({});

  const basketTotal = useSelector(selectBasketTotal);

  const formattedTotalBasketPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(basketTotal);

  const createCheckoutSession = async () => {};

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: Product[] });
    setGroupedItemsOutBasket(groupedItems);
  }, [items]);

  return (
    <div className='min-h-screen overflow-hidden bg-[#e7ecee]'>
      <Head>
        <title>Bag - Apple</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='mx-auto max-w-5xl pb-24'>
        <div className='px-5 pb-4'>
          <h2 className='my-4 text-3xl font-semibold lg:text-4xl'>
            {items.length > 0 ? "Review your bag" : "Your bag is empty"}
          </h2>
          <p className='my-4'>Free delivery and free returns</p>

          {items.length === 0 && (
            <Button
              title='Continue Shopping'
              onClick={() => router.push("/")}
            />
          )}
        </div>
        {items.length > 0 && (
          <div className='mx-5 md:mx-8'>
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}
            <div className='my-12 mt-6 mx-auto max-w-3xl'>
              <div className='divide-y divide-gray-300'>
                <div className='pb-4'>
                  <div className='flex justify-between'>
                    <p>SubTotal</p>
                    <p>{formattedTotalBasketPrice}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex flex-col gap-x-1 lg:flex-row'>
                      Estimated Tax for:{" "}
                      <p className='flex cursor-pointer text-blue-500 hover:underline'>
                        Enter zip code
                        <ChevronDownIcon className='h-6 w-6' />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>
                <div className='flex justify-between pt-4 text-xl font-semibold'>
                  <h4>Total</h4>
                  <h4>{formattedTotalBasketPrice}</h4>
                </div>
              </div>
              <div className='my-14 gap-4'>
                <h4 className='text-xl font-semibold pb-2'>
                  How would you like to checkout?
                </h4>
                <div className='flex flex-col gap-4 md:flex-row '>
                  <div className='order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center shadow-sm'>
                    <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                      <span>Pay Monthly</span>
                      <span>With Apple Card</span>
                      <span>
                        ¤283.16/mo. at 0% APR
                        <sup className='-top-1'>o</sup>
                      </span>
                      <span></span>
                    </h4>
                    <Button title='Check Out With Apple Card Monthly Installments' />
                    <p className='mt-2 max-w-[240px] text-[13px]'>
                      $0.00 due today, which includes applicable full-price
                      items, down payments, shipping, and taxes
                    </p>
                  </div>
                  <div className='flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2 shadow-sm'>
                    <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                      Pay in full
                      <span>{formattedTotalBasketPrice}</span>
                    </h4>
                    <Button
                      noIcon
                      width='w-full'
                      title='Checkout'
                      onClick={createCheckoutSession}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
