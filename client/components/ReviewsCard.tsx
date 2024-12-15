import Image from "next/image";
import { Button } from "./ui/button";
import image1 from "@/public/images/topsearched/1.jpg";

const ReviewsCard = () => {
  return (
    <div className="p-4 rounded-sm space-y-4 m-2 shadow-md shadow-muted-foreground">
      <div>
        <div className="flex gap-5">
          <Image
            src={image1}
            alt=""
            className="rounded-full h-[50px] w-[50px] object-cover"
          />
          <div>
            <p className="text-link">Shops</p>
          </div>
        </div>
      </div>
      <div>
        <h5 className="text-greyish">
          <span className="text-dark">Bishwash</span> reviewed{" "}
          <span className="text-prim">Messi</span>
        </h5>
        <h3 className="text-subtitle mb-3">
          "Lorem ipsum dolor sit amet consectetur adipisicing elit."
        </h3>
        <p className="text-greyish/70">This is the amazing football</p>
      </div>
      <div className="flex justify-between mt-4">
        <p className="text-greyish font-extralight text-small">
          Published: 2081
        </p>
        <Button className="bg-prim text-light hover:bg-sec hover:text-dark px-2 py-1 text-xs max-h-[25px] rounded-sm ">
          Read review
        </Button>
      </div>
    </div>
  );
};

export default ReviewsCard;
