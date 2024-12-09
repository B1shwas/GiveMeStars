"use client";

import { useState } from "react";
import React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";

const Navbar = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  const handleSingupClick = () => {
    setShowSignUp(true);
  };

  const handleLoginClick = () => {
    setShowLogIn(true);
  };

  const handle_signup_submit = () => {};

  const handle_login_submit = () => {};

  const lists = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "about",
      path: "/about",
    },
    {
      name: "contact us",
      path: "/contact-us",
    },
  ];

  return (
    <div className="">
      <div className="w-[95%] h-20 bg-black flex items-center justify-between px-4 rounded-2xl">
        <div className="flex items-center space-x-2">
          <img
            src="/images/GMS-logo.png"
            alt="Logo"
            className="h-[50px] w-[50px] hover:scale-110"
          />
          <div className="text-lg hover:scale-110">Give Me Stars</div>
        </div>

        <div>
          <ul className="flex gap-5 justify-center items-center">
            {lists.map((list, index) => {
              return (
                <Link
                  key={index}
                  href={list.path}
                  className="text-white hover:scale-110"
                >
                  {list.name}
                </Link>
              );
            })}
            <Dialog>
              <DialogTrigger className="text-white">Open</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Are you absolutely sure?
                  </DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <li
              onClick={handleSingupClick}
              className="hover:scale-110 m-[5px] p-2 bg-blue-900 rounded-xl"
            >
              Sign Up
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
