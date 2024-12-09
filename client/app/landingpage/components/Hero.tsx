import React from "react";

const Hero = () => {
  return (
    <div className="flex bg-white w-screen h-screen z-10">
      <div className="">
        <div>
          <p className="animate-slideIn text-7xl m-10 text-black relative top-40">
            Give Me Stars
          </p>
        </div>
        <div className="m-10">
          <p className="animate-slideUp text-5xl m-2 text-black relative top-40">
            Rate Your Tutors
          </p>
          <p className="animate-slideUp text-5xl m-2 text-black relative top-40">
            Share Feedbacks
          </p>
          <p className="animate-slideUp text-5xl m-2 text-black relative top-40">
            Improve Your Teachings
          </p>
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

export default Hero;
