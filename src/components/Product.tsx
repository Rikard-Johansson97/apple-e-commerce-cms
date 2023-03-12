import { urlFor } from "@/lib/sanity.client";
import { addToBasket } from "@/redux/basketSlice";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { FC } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

interface ProductProps {
  product: Product;
}

const Product: FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket(product));

    toast.success(`${product.title} added to basket`, {
      position: "bottom-center",
    });
  };

  return (
    <div className='flex flex-col justify-center items-center rounded-xl p-8 bg-[#35383c] shadow-md'>
      <Image
        src={urlFor(product.images[0]).url()}
        height={400}
        width={400}
        alt='product'
        className='drop-shadow-xl aspect-square object-contain'
      />
      <div className='flex items-center justify-between pt-8 w-full'>
        <div className='space-y-2 text-lg text-white '>
          <p>{product.title}</p>
          <p className='text-gray-300'>{product.price} $</p>
        </div>
        <div
          className='flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center rounded-full appleGradient md:h-14 md:w-14 duration-200 hover:brightness-110'
          onClick={() => addItemToBasket()}>
          <ShoppingCartIcon className='h-6 w-6  text-white ' />
        </div>
      </div>
    </div>
  );
};

export default Product;
