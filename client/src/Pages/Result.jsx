import React, { useContext, useRef } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const {resultImage,image,removeBg} = useContext(AppContext)

  const handleTryAnother = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    if(e.target.files[0]){
      removeBg(e.target.files[0])
    }
  }

  return (
    <div className="min-h-[85vh] py-8 px-4 animate-fade-in relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl px-6 sm:px-8 lg:px-12 py-10 shadow-2xl border border-gray-100/50 relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-100/30 to-purple-100/30 rounded-full blur-3xl -z-0"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8 text-center animate-fade-in-down">
              <div className='inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full border border-violet-200'>
                <p className='text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>
                  Image Processing Complete
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
                Your <span className="gradient-text">Result</span>
              </h1>
              <p className="text-gray-600">Compare your original and processed images</p>
            </div>

        {/* Hidden file input */}
        <input 
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file" 
          accept='image/*' 
          hidden 
        />
        
        {/* image container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* left side - Original */}
          <div className="animate-slide-in-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <p className="font-bold text-gray-700 text-lg">Original Image</p>
            </div>
            <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              {image ? (
                <img 
                  className="w-full h-auto object-contain" 
                  src={URL.createObjectURL(image)} 
                  alt="Original image" 
                />
              ) : (
                <div className="h-64 md:h-80 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="text-center">
                    <p className="text-gray-400 text-lg mb-2">📷</p>
                    <p className="text-gray-400">No image</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* right side - Background Removed */}
          <div className="animate-slide-in-right">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse-slow"></div>
              <p className="font-bold text-gray-700 text-lg">Background Removed</p>
            </div>
            <div className="rounded-xl border-2 border-violet-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-layer overflow-hidden relative min-h-[200px]">
              {resultImage ? (
                <img 
                  className="w-full h-auto object-contain" 
                  src={resultImage} 
                  alt="Background removed image" 
                />
              ) : image ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative">
                      <div className="h-16 w-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-violet-600 font-semibold">Processing...</p>
                      <p className="text-sm text-gray-500 mt-2">Removing background</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-64 md:h-80 flex items-center justify-center bg-gradient-to-br from-violet-50 to-purple-50">
                  <div className="text-center">
                    <p className="text-gray-400 text-lg mb-2">✨</p>
                    <p className="text-gray-400">Processed image will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        {resultImage && image && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-8 border-t border-gray-200 animate-fade-in-up">
            <button 
              onClick={handleTryAnother} 
              className="group w-full sm:w-auto px-8 py-3.5 text-violet-600 font-semibold border-2 border-violet-600 rounded-full hover:bg-violet-50 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🔄</span>
              <span>Try another image</span>
            </button>
            <a 
              href={resultImage} 
              download 
              className="group w-full sm:w-auto px-8 py-3.5 text-white font-semibold rounded-full cursor-pointer bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 hover:from-fuchsia-500 hover:via-purple-600 hover:to-violet-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 flex items-center justify-center gap-2"
            >
              <span>⬇️</span>
              <span>Download image</span>
            </a>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
