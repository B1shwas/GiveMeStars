import image1 from "@/public/images/topsearched/1.jpg";
import Title from "./Title";
import Image from "next/image";
import { TbMessageCircle } from "react-icons/tb";

const TopSearched = () => {
  return (
    <div className="container pt-14 pb-8">
      <Title
        title="Top Searched"
        subtitle="Based on your recent searches"
        link="/"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {[1, 2, 3, 4, 5, 6].map((num, index) => (
          <div
            key={index}
            className="relative bg-bg h-[200px] mb-3 rounded-sm overflow-hidden"
          >
            <Image
              src={image1}
              alt=""
              className="hover:scale-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/35"></div>
            <div className="absolute inset-0 flex items-end h-full">
              <div className="px-4 pb-3 text-light w-full">
                <span className="text-xs bg-prim p-1 rounded-sm text-center mb-3">
                  112 Searches
                </span>
                <div className="flex justify-between w-full items-center">
                  <h4 className="text-topsearched">Harley Davidson</h4>
                  <div className="flex gap-2">
                    <TbMessageCircle className="text-white text-sm" />
                    <span className="text-xs">35 Reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSearched;
