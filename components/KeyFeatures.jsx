import { benefits } from "@/lib/BenefitData";
import React from "react";

const KeyFeatures = () => {
  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="pt-8">
        <h2 className="text-[22px] font-semibold">Key Features</h2>
      </div>
      <div className="pt-16">
        <h2 className="text-5xl font-extrabold">
          Streamline Your Legal Processes
        </h2>
        <p className="text-[14px] mt-6">
          Our AI-powered platform offers a range of features designed to
          simplify and expedite <br /> your legal document creation.
        </p>
      </div>
      <div className="grid grid-cols-3 py-16 gap-6">
        {benefits.map((data, index) => (
          <div
            className="border border-gray-300 shadow-lg rounded-2xl py-4 px-6"
            key={index}
          >
            <img src={data.ico} alt="" />
            <h3 className="my-4 text-[18px] font-bold">{data.mainText}</h3>
            <p className="text-lg pr-20 text-gray-500">{data.subText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
