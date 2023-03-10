import Link from "next/link";
import React, { FC } from "react";

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
          {/* <Button title='Buy Now'></Button> */}
          <Link href='/'></Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
