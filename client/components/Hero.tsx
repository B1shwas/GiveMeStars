import { Input } from "./ui/input";
import { Button } from "./ui/button";
import heroSvg from "@/public/images/bg-pattern.svg";
import heroImage from "@/public/images/hero.svg";
import Image from "next/image";
import CustomSelect from "./CustomSelect";

const Hero = () => {
  return (
    <div
      className="w-full h-[70vh] sm:h-[90vh] bg-bg text-light"
      style={{ backgroundImage: `url(${heroSvg.src})` }}
    >
      <div className="container h-full flex items-center justify-center">
        <div className="w-full lg:w-[40%]">
          <h2 className="text-main2 md:text-main leading-tight">
            Every Review
            <br />
            is an Experience!
          </h2>
          <p className="text-sub2 md:text-sub mt-1 mb-5 font-thin">
            Check Reviews of Schools, Teachers,{" "}
          </p>
          <div className="space-y-2">
            <Input
              className="bg-light  rounded-sm pl-5  text-dark h-[50px] placeholder:text-link placeholder:text-greyish/60 py-0"
              placeholder="What are you looking for..."
            />
            <CustomSelect />
            <Button className="bg-sec text-dark rounded-sm !mt-5 md:!mt-2 w-full h-[50px] hover:bg-prim hover:text-light transition-colors">
              Search
            </Button>
          </div>
        </div>
        <div className=" justify-end w-1/2 hidden lg:flex h-full">
          <Image src={heroImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
