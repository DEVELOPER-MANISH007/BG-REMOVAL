import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";

import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit,loadCreditData,} = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if(isSignedIn){
     loadCreditData()
    
     
    }
  },[isSignedIn])

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44 ">
      <Link to="/">
        {" "}
        <img className="cursor-pointer w-33 sm:w-44" src={assets.logo} alt="" />
      </Link>
      {isSignedIn ? (
        <div className="flex items-center gap-0 sm:gap-3">
          <button onClick={()=>navigate('/buy')} className="flex items-center gap-2 bg-blue-100 px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-300">
            <img className="w-5" src={assets.credit_icon} alt="" />
            <p className="text-sm sm:text-sm font-medium text-gray-600">Credits:{credit !== false ? credit : 5}</p>
            </button>
            {user && (
              <p className="text-gray-500 max-sm:hidden">Hi, {user.firstName || user.emailAddresses[0]?.emailAddress || 'User'}</p>
            )}
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn()}
          className="bg-zinc-800  cursor-pointer text-white flex items-center gap-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full"
        >
          Get Started{" "}
          <img className="w-3 sm:s-4" src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
