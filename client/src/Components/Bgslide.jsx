import React, { useState } from "react";
import { assets } from "../assets/assets";

const Bgslide = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="py-20 px-4">
      {/* title */}
      <div className="text-center mb-12 sm:mb-20 animate-fade-in-up">
        <div className='inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full border border-violet-200'>
          <p className='text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>
            See The Difference
          </p>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight">
          Remove Background With <br className="max-md:hidden" /> 
          <span className="gradient-text">High Quality</span> and Accuracy
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Drag the slider to see the before and after comparison
        </p>
      </div>
      
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl m-auto shadow-2xl border-4 border-white animate-scale-in">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-2xl -z-10 animate-pulse-slow"></div>
        
        {/* background image */}
        <div className="relative overflow-hidden rounded-2xl">
          <img 
            src={assets.image_w_bg} 
            style={{clipPath:`inset(0 ${100.2-sliderPosition}% 0 0)`}} 
            alt="Image with background" 
            className="w-full h-auto transition-all duration-300"
          />
          {/* foreground image */}
          <img 
            className="absolute top-0 left-0 w-full h-full object-cover" 
            src={assets.image_wo_bg} 
            style={{clipPath:`inset(0 0 0 ${sliderPosition}% )`}} 
            alt="Image without background"
          />
        </div>

        {/* Divider line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-purple-500 to-fuchsia-500 z-20 shadow-lg"
          style={{left: `${sliderPosition}%`, transform: 'translateX(-50%)'}}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-purple-500"></div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-lg z-30">
          Before
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-lg z-30">
          After
        </div>

        {/* slider */}
        <input 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full z-10 slider cursor-grab active:cursor-grabbing" 
          type="range" 
          min={0} 
          max={100} 
          value={sliderPosition} 
          onChange={handleSliderChange}
          style={{WebkitAppearance: 'none'}}
        />
      </div>
      
      {/* Instructions */}
      <p className="text-center mt-6 text-sm text-gray-500 animate-fade-in">
        👆 Drag the slider to compare
      </p>
    </div>
  );
};

export default Bgslide;
