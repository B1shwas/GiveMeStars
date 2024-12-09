"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const Page = () => {
  const [scrollingUp, setScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setScrollingUp(false);
      } else {
        if (currentScrollY < lastScrollY) {
          setScrollingUp(true);
        } else {
          setScrollingUp(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div>
      <div
        className={`z-20 fixed bg-black w-[95%] m-5 rounded-2xl transition-transform ${
          scrollingUp ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <Navbar />
      </div>
      <Hero />
      <section className="bg-blue h-screen w-screen flex justify-center items-center text-5xl">
        About
      </section>
      <section className="bg-blue h-screen w-screen flex justify-center items-center text-5xl">
        Contact
      </section>
      <section className="bg-blue h-screen w-screen flex justify-center items-center text-5xl">
        Footer
      </section>
    </div>
  );
};

export default Page;
