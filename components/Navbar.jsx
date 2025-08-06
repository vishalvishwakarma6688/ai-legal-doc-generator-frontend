import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between shadow-md sticky bg-white top-0 w-full items-center py-8 px-12">
      <div className="logo">
        <Link href={"/"}>
          <img src="/logo.svg" className="w-52" alt="Logo" />
        </Link>
      </div>
      <button onClick={()=> router.push("/auth/login")} className="bg-[#407dbf] text-white py-3 transition-all hover:bg-[#44607d] cursor-pointer px-6 text-[16px] font-bold rounded-full">
        Get Started
      </button>
    </div>
  );
};

export default Navbar;
