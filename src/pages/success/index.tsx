import Button from "@/components/Button";
import { fetchLineItems } from "@/lib/fetchLineItems";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSession } from "next-auth/react";

interface SuccessProps {
  products: StripeProduct[];
}

const Success: FC<SuccessProps> = ({ products }) => {
  const router = useRouter();
  const { session_id } = router.query;
  const [mounted, setMounted] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;
  const { data: session } = useSession();

  //Format currency
  const subtotal = products?.reduce(
    (acc, product) => acc + product.price.unit_amount / 100,
    0
  );

  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };

  // Format subtotal and total price
  const formattedSubtotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(subtotal);

  const formattedTotalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(subtotal + 20);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Thank You! - Apple</title>
        <link rel='icon' href='/favicon.ico'></link>
      </Head>
      <header className='mx-auto max-w-xl pt-4 px-4  lg:hidden'>
        <Link
          href='/'
          className='cursor-pointer 
        '>
          <Image
            src='/Apple_logo_black.svg.png'
            height={24}
            width={24}
            alt='apple logo'
          />
        </Link>
      </header>
      <main className='lg:flex'>
        <section className='order-2 mx-auto max-w-xl pb-12 lg:mx-w-none lg:pt-12 '>
          <Link href='/' className='hidden cursor-pointer  lg:inline-flex'>
            <Image
              src='/Apple_logo_black.svg.png'
              height={72}
              width={72}
              alt='apple logo'
            />
          </Link>
          <div className='my-8 ml-4 flex gap-4'>
            <div className='flex p-1 h-11 w-11 items-center justify-center rounded-full border-2 border-black'>
              <CheckIcon />
            </div>
            <div>
              <p className='text-sm text-gray-600'>
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className='text.lg'>Thank You</h4>
            </div>
          </div>

          <div className='mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4'>
            <div className='space-y-2 pb-3'>
              <p>Your order is confirmed</p>
              <p className='text-sm text-gray-600'>
                We’ve accepted your order, and we’re getting it ready. Come back
                to this page for updates on your shipment status.
              </p>
            </div>
            <div className='pt-3 text-sm'>
              <p className='font-medium text-gray-600'>
                Other tracking number:
              </p>
              <p>CNB21441622</p>
            </div>
          </div>
          <div className='my-4 mx-4 space-y-2 rounded-md border border-gray-300 p-4'>
            <p>Order updates</p>
            <p className='text-sm text-gray-600'>
              You’ll get shipping and delivery updates by email and text.
            </p>
          </div>
          <div className='mx-4 flex flex-col items-center justify-between text-sm lg:flex-row'>
            <p className='hidden lg:inline'>Need help? Contact us</p>
            {mounted && (
              <Button
                title='Continue Shopping'
                onClick={() => router.push("/")}
                width={isTabletOrMobile ? "w-full" : undefined}
                padding='py-4'
              />
            )}
          </div>
        </section>
        {mounted && (
          <section className='lg:w-96 overflow-y-scroll border-y border-l border-gray-300 bg-[#FAFAFA] lg:order-1 lg:col-span-4 lg:h-screen lg:border-y-0 lg:pt-12 '>
            <div
              className={`w-full ${
                showOrderSummaryCondition && "border-b"
              } border-gray-300 text-sm lg:hidden`}>
              <div className='mx-auto flex max-w-xl items-center justify-between px-4 py-6'>
                <button
                  onClick={handleShowOrderSummary}
                  className='flex items-center space-x-2'>
                  <ShoppingCartIcon className='h-6 w-6' />
                  <p>Show order summary</p>
                  {showOrderSummaryCondition ? (
                    <ChevronUpIcon className='h-4 w-4' />
                  ) : (
                    <ChevronDownIcon className='h-4 w-4' />
                  )}
                </button>

                <p className='text-xl font-medium text-black'>
                  <p>{formattedTotalPrice}</p>
                </p>
              </div>
            </div>

            {showOrderSummaryCondition && (
              <div className='mx-auto max-w-xl divide-y border-gray-300 px-4 py-4'>
                <div className='space-y-4 pb-4'>
                  {products?.map((product) => (
                    <div
                      key={product.id}
                      className='flex items-center space-x-4 text-sm font-medium'>
                      <div className='relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#F1F1F1] text-xs text-white'>
                        <Image
                          src='/Apple_logo_black.svg.png'
                          width={24}
                          height={24}
                          alt='icon'
                        />

                        <div className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs'>
                          {product.quantity}
                        </div>
                      </div>
                      <p className='flex-1'>{product.description}</p>
                      <p>
                        <p>
                          {" "}
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: product.currency,
                          }).format(product.price.unit_amount / 100)}
                        </p>
                      </p>
                    </div>
                  ))}
                </div>
                <div className='space-y-1 py-4'>
                  <div className='flex justify-between text-sm'>
                    <p className='text-[gray]'>Subtotal</p>
                    <p className='font-medium'>
                      <p>{formattedSubtotal}</p>
                    </p>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <p className='text-[gray]'>Discount</p>
                    <p className='text-[gray]'>
                      {" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(0)}
                    </p>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <p className='text-[gray]'>Shipping</p>
                    <p className='font-medium'>
                      <p>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(20)}
                      </p>
                    </p>
                  </div>
                </div>
                <div className='flex justify-between pt-4'>
                  <p>Total</p>
                  <p className='flex items-center gap-x-2 text-xs text-[gray]'>
                    USD
                    <span className='text-xl font-medium text-black'>
                      <p>{formattedTotalPrice}</p>
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps<SuccessProps> = async ({
  query,
}) => {
  const sessionId = query.session_id as string;
  const products = await fetchLineItems(sessionId);

  return {
    props: {
      products,
    },
  };
};
