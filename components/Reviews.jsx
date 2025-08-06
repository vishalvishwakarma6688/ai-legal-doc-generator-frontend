import { reviews } from "@/lib/BenefitData";
import React from "react";

const Reviews = () => {
  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="pt-8">
        <h2 className="text-[22px] font-semibold">User Reviews</h2>
      </div>
      <div className="grid grid-cols-3 py-16 gap-6">
        {reviews.map((data, index) => (
          <div
            className="border border-gray-300 shadow-lg rounded-2xl py-4 px-6"
            key={index}
          >
            <img className="rounded-2xl" src={data.user} alt="user images" />
            <h3 className="my-4 text-[18px] font-bold">{data.name}</h3>
            <p className="text-lg text-gray-500">{data.review}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6 mt-5 pb-10">
        <h2 className="text-[22px] font-semibold">Important Content</h2>
        <p className="text-gray-700 text-[16px]">Legal documents are essential for protecting your rights and interests in various situations. Whether you're starting a business, entering into a contract, or dealing with personal matters, having accurate and legally sound documents is crucial. Our AI legal document generator simplifies this process, providing you with the tools to create professional documents quickly and efficiently. By leveraging AI, we ensure that your documents are up-to-date with the latest legal requirements, reducing the risk of errors and potential disputes. Explore our platform to discover how we can help you navigate the complexities of legal documentation with ease.</p>
      </div>
    </div>
  );
};

export default Reviews;
