import React from "react";
import { givemestars, hero_list } from "@/lib/constant";

const Main = () => {
  return (
    <div className="flex bg-white w-screen h-screen z-10">
      <div className="">
        <div>
          {givemestars.map((paragraph, index) => (
            <p
              key={index}
              className="animate-slideIn text-7xl m-10 text-black relative top-40"
            >
              {Object.values(paragraph)[0]}
            </p>
          ))}
        </div>
        <div className="m-10">
          {hero_list.map((paragraph, index) => (
            <p
              key={index}
              className="animate-slideUp text-5xl m-2 text-black relative top-40"
            >
              {Object.values(paragraph)[0]}
            </p>
          ))}
        </div>
      </div>

      <img
        src="/images/landing-page-main-image.png"
        alt=""
        className="w-[50%] h-full absolute right-0"
      />
    </div>
  );
};

export default Main;
