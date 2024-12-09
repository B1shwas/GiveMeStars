import { navLinks } from "../lib/constant.ts"; // Ensure this path is correct
import logo from "../public/images/logo.png"; // Ensure the logo image exists at this path
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  console.log(navLinks);
  return (
    <div className="w-[95%] h-20 bg-black flex items-center justify-between px-4 rounded-2xl m-auto mt-5 text-white sticky top-10">
      <div className="flex items-center gap-2 p-2">
        {/* Logo Section */}
        <Image src={logo} alt="logo" height={50} width={50} />
        <p className="font-bold">Givemestars</p>
      </div>
      <div className="flex  p-2 mr-10">
        {/* Navigation Links */}
        {navLinks.map((link, index) => (
          <Link key={index} href={link.path} className="ml-5">
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
