import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
const NavBar = () => {
  const links = [
    {
      name: "Dashboard",
      href: "/",
    },
    {
      name: "Issues",
      href: "/issue",
    },
  ];
  return (
    <div className='flex space-x-6 items-center p-5 mb-5 border-b-2'>
      <Link href='/'>
        <AiFillBug size={30} />
      </Link>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className='text-lg text-zinc-500 hover:text-zinc-800 transition-colors font-semibold'
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavBar;
