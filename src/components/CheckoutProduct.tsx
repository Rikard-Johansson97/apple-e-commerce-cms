import { urlFor } from "@/lib/sanity.client";
import { removeFromBasket } from "@/redux/basketSlice";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { FC } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Button from "./Button";

interface CheckoutProductProps {
  items: Product[];
  id: string;
}

const CheckoutProduct: FC<CheckoutProductProps> = ({ id, items }) => {
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error(`${items[0].title} removed from basket`, {
      position: "bottom-center",
    });
  };

  // Price Formatter
  const totalPrice = items.reduce((total, item) => total + item.price, 0);
  const formattedTotalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  return (
    <div className='flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center first:border-t'>
      <Image
        className='drop-shadow-lg py-4'
        src={urlFor(items[0].images[0]).url()}
        height={200}
        width={200}
        alt='Product Image'
      />
      <div className='flex flex-1 items-end lg:items-center'>
        <div className='flex-1 space-y-4'>
          <div className='flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl'>
            <h4 className='font-semibold lg:w-96'>{items[0].title}</h4>
            <p className='flex items-end gap-x-1 font-semibold'>
              {items.length}
              <ChevronDownIcon className='h-6 w-6 text-blue-500' />
            </p>
          </div>
          <p className='flex cursor-pointer items-end text-blue-500 duration-200 hover:underline'>
            Show product details
            <ChevronDownIcon className='h-6 w-6' />
          </p>
        </div>
        <div className='flex flex-col items-end space-y-4'>
          <h4 className='text-xl font-semibold lg:text-2xl'>
            {formattedTotalPrice}
          </h4>
          <button
            onClick={removeItemFromBasket}
            className='text-blue-500 hover:underline'>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
