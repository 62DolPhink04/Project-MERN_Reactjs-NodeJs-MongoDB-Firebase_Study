import React from "react";
import bgImg from "../../../assets/home/banner-2.jpg";

const Hero2 = () => {
  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60">
        <div>
          <div className="space-y-4">
            <h3 className="md:text-4xl text-2xl">Best Online</h3>
            <h1 className="md:text-7xl text-4xl font-bold">Course From Home</h1>
            <div className="md:w-1/2">
              <p>1 câu giới thiệu</p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <button className="px-7 py-3 rounded-lg bg-secondary font-bold uppercase">
                Join Day
              </button>
              <button className="px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase">
                View Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero2;
