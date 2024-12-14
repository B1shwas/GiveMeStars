import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="py-5 px-7">
      <h1>GIVEMESTARD</h1>
      <div>
        {["home", "about", "contact"].map((item, index) => (
          <Link key={index} href={`/${item}`}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
