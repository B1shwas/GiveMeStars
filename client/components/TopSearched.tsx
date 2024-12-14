import Link from "next/link";
import React from "react";

const TopSearched = () => {
  return (
    <div className="container pt-14 pb-8">
      <div className="flex justify-between">
        <div>
          <h4 className="text-title leading-tight">Top Searched</h4>
          <p className="text-greyish text-subtitle">
            Cum doctus civibus efficiantur in imperdiet deterruisset.
          </p>
        </div>
        <Link href={"/"} className="text-link text-prim">
          See All
        </Link>
      </div>
    </div>
  );
};

export default TopSearched;
