import { useRouter } from "next/navigation";
import React from "react";


const Hero = () => {
  const router = useRouter()
  return (
    <>
      <div className="bg-[url(/hero-image.svg)] h-[480px] max-w-7xl flex gap-8 mt-16 justify-center flex-col items-center w-[928px] mx-auto bg-no-repeat bg-center bg-cover">
        <h1 className="text-white text-6xl font-bold">
          Generate Legal Documents with AI
        </h1>
        <p className="text-white text-[16px] text-center px-16 mt-5">
          Create accurate, professional legal documents in minutes with our
          AI-powered platform. Simplify your legal processes and save time.
        </p>
        <button onClick={()=> router.push("/auth/login")} className="bg-[#407dbf] text-white py-3 transition-all hover:bg-[#44607d] cursor-pointer px-6 text-[16px] font-bold rounded-full">
        Get Started
      </button>
      </div>
    </>
  );
};

export default Hero;
