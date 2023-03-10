import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

interface HeaderProps {}

const navigation = {
  _id: "navigation",
  _type: "navigation",
  links: [
    {
      _key: "product",
      text: "Product",
      url: "#product",
    },
    {
      _key: "explore",
      text: "Explore",
      url: "#explore",
    },
    {
      _key: "support",
      text: "Support",
      url: "#support",
    },
    {
      _key: "business",
      text: "Business",
      url: "#business",
    },
  ],
};

const Header: FC<HeaderProps> = ({}) => {
  const session = false;

  return (
    <header className='sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4'>
      <div className='flex items-center justify-center md:w-1/5'>
        {/* LOGO */}
        <Link href='/'>
          <Image
            className='cursor-pointer opacity-75 duration-200 hover:opacity-100'
            src='/Apple_logo_black.svg.png'
            alt='Apple-logo'
            width={24}
            height={24}
          />
        </Link>
      </div>
      {/* Nav Links */}
      <div className='hidden flex-1 items-center justify-center space-x-8 md:flex'>
        {navigation.links.map((link) => (
          <Link key={link._key} href={link.url} className='headerLink'>
            {link.text}
          </Link>
        ))}
      </div>
      <div className='flex items-center justify-center gap-x-4 md:w-1/5'>
        <MagnifyingGlassIcon className='headerIcon' />
        <Link href={"/"}>
          <div className='relative cursor-pointer'>
            <span className='absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full appleGradient text-[10px] text-white'>
              5
            </span>
            <ShoppingBagIcon className='headerIcon' />
          </div>
        </Link>
        {session ? (
          <Image
            src='https://i.imgur.com/308CpXC.png'
            alt='avatar-image'
            width={24}
            height={24}
            className='cursor-pointer rounded-full'
          />
        ) : (
          <UserIcon className='headerIcon' onClick={() => {}} />
        )}
      </div>
    </header>
  );
};

export default Header;
