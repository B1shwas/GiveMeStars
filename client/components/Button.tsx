import React from "react";
import { Button } from "./ui/button";
const PrimaryButton = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <Button className="!text-dark text-link bg-sec hover:bg-prim hover:!text-light rounded-sm py-2 px-4 font-semibold transition-colors duration-700">
      {children}
    </Button>
  );
};

export default PrimaryButton;
