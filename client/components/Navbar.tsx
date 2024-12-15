"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { navLinks } from "@/lib/constant";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  return (
    <div
      className={`py-5 px-7 flex justify-between fixed top-0 w-full text-light transition-all z-50 font-semibold ${
        scrolled && "bg-white !text-black"
      }`}
    >
      <h1 className="text-sub font-bold">GIVEMESTARS</h1>
      <div className="text-link  hidden md:flex gap-6">
        <div className="relative top-2">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="px-3 capitalize hover:text-prim"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Button className="!text-dark text-link bg-sec hover:bg-prim hover:!text-light rounded-sm py-2 px-4 font-semibold transition-colors duration-700">
          Create a free account
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
