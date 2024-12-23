import Image from "next/image";
import image from "@/public/images/graphic-2.svg";
import Title from "./Title";
import image2 from "@/public/images/bg-pattern-2.svg";
import { Button } from "./ui/button";
import PrimaryButton from "./Button";

const LetsHelpYou = () => {
  return (
    <div style={{ backgroundImage: `url(${image2.src})` }} className="bg-cover">
      <div className="container flex flex-col md:flex-row py-10 md:py-15 px-5 md:px-10 ">
        <div className="md:w-1/2">
          <Image src={image} alt="" />
        </div>
        <div className="flex items-center md:w-1/2">
          <div className="w-fit my-auto">
            <Title
              title="Let's Help You"
              subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, officiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, officiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, officiis."
            />
            <PrimaryButton>Join us Now</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetsHelpYou;
