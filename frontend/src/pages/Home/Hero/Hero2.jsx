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
              <p>
                With expert-led lessons and interactive content, this course
                ensures an engaging and effective learning experience
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              {/* Nút Join Today */}
              <button className="px-7 py-3 rounded-lg bg-blue-600 font-bold uppercase w-auto inline-block">
                Join Today
              </button>
              {/* Nút View Course */}
              <button className="px-7 py-3 rounded-lg border bg-transparent border-gray-400 text-gray-400 opacity-60 hover:bg-secondary font-bold uppercase w-auto inline-block">
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
