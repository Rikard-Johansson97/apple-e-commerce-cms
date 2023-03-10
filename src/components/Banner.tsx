import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import Button from "./Button";

interface BannerProps {}

const Banner: FC<BannerProps> = ({}) => {
  return (
    <section className='sticky  top-0 mx-auto flex h-screen max-w-[1359px] items-center justify-center p-8'>
      <div className='space-y-8'>
        <h1 className='space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl'>
          <span className='block appleGradient bg-clip-text text-transparent'>
            Powered
          </span>
          <span className='block'>By Intellect</span>
          <span className='block'>Driven By Values</span>
        </h1>
        <div>
          <Button title='Buy Now'></Button>
          <Link href='/'></Link>
        </div>
      </div>
      <div className='relative hidden duration-500 transition-all md:inline lg:h-[650px] lg:w-[600px]'>
        <Image src='/iphone.png' height={600} width={600} alt='banner Image' />
      </div>
    </section>
  );
};

export default Banner;
