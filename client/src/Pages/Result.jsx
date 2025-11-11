import React from "react";
import { assets } from "../assets/assets";

const Result = () => {
  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]">
      <div className="bg-white rounded-lg px-8 drop-shadow-sm">
        {/* image container */}
        <div className="grid grid-cols-2 gap-8">
          {/* left side */}
          <div className="mb-4">
            <p className="font-semibold text-gray-600 mb-2">Original</p>
            <img className="rounded-md border" src={assets.image_w_bg} alt="" />
          </div>
          {/* right side  */}
          <div className="flex flex-col mb-4 ">
            <p className="font-semibold text-gray-600">Background Removed</p>
            <div className="rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden">
              <img src={assets.image_wo_bg} alt="" />
              {/* <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
                <div className="h-12 w-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
              </div> */}
            </div>
          </div>
        </div>
        {/* btns */}
        <div className="flex items-center justify-center sm:justify-end flex-wrap gap-4 mt-6 pb-4" >
          <button className="px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer ">Try another image</button>
          <a href="" className=" text-white text-sm gap-3 px-8  py-2.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition-all duration-300 " >Download image</a>
        </div>
      </div>
    </div>
  );
};

export default Result;
