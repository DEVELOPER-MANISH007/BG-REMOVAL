import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

const Header = () => {

const {removeBg} = useContext(AppContext)

  return (
    <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-24 lg:px-44 sm:mt-32 min-h-[85vh]">
      {/* left side */}
      <div className="flex-1 animate-slide-in-left">
        <div className="inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full border border-violet-200 animate-fade-in">
          <p className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            ✨ AI-Powered Background Removal
          </p>
        </div>
        <h1 className="text-4xl xl:text-5xl font-bold 2xl:text-6xl text-neutral-800 leading-tight mb-6">
          Remove the <br className="max-md:hidden" /> 
          <span className="gradient-text">background</span> from <br className="max-md:hidden" />
          images for free.
        </h1>
        <p className="my-6 text-base text-gray-600 leading-relaxed max-w-lg">
          Transform your images instantly with our advanced AI technology. 
          Remove backgrounds in seconds with professional-quality results. 
          <br className="max-md:hidden" /> 
          Perfect for e-commerce, social media, and creative projects.
        </p>
        <div className="mt-8">
          <input onChange={e=>removeBg(e.target.files[0])} type="file" id="upload1" accept="image/*" hidden />
          <label 
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 relative overflow-hidden" 
            htmlFor="upload1"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-purple-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <img 
              width={22} 
              src={assets.upload_btn_icon} 
              alt="Upload" 
              className="relative z-10 transition-transform duration-300 group-hover:rotate-12"
            />
            <p className="text-white text-sm font-semibold relative z-10">Upload your image</p>
          </label>
          <p className="mt-4 text-sm text-gray-500 flex items-center gap-2">
            <span>✓</span> Free to use • <span>✓</span> No watermarks • <span>✓</span> High quality
          </p>
        </div>
      </div>
      {/* Right side */}
      <div className="w-full max-w-md flex-shrink-0 animate-slide-in-right">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-3xl blur-3xl animate-pulse-slow"></div>
          <img 
            src={assets.header_img} 
            alt="Background removal preview" 
            className="relative z-10 w-full h-auto rounded-2xl shadow-2xl animate-float"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
