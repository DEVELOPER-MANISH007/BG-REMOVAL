import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 lg:px-44 py-8 animate-fade-in">
        {/* Logo */}
        <div className="group">
          <img 
            width={150} 
            src={assets.logo} 
            alt="Logo" 
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Copyright */}
        <p className="flex-1 text-center text-sm text-gray-600 max-sm:text-xs">
          Copyright © <span className="font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Manish.dev</span> | All rights reserved.
        </p>
        
        {/* Social Icons */}
        <div className="flex gap-3">
          <a 
            href="#" 
            className="group p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-violet-50"
            aria-label="Facebook"
          >
            <img 
              src={assets.facebook_icon} 
              width={24} 
              height={24}
              alt="Facebook" 
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </a>
          <a 
            href="#" 
            className="group p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-violet-50"
            aria-label="Twitter"
          >
            <img 
              src={assets.twitter_icon} 
              width={24} 
              height={24}
              alt="Twitter" 
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </a>
          <a 
            href="#" 
            className="group p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-violet-50"
            aria-label="Google Plus"
          >
            <img 
              src={assets.google_plus_icon} 
              width={24} 
              height={24}
              alt="Google Plus" 
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </a>
        </div>
      </div>
      
      {/* Bottom border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    </footer>
  );
};

export default Footer;
