import React, { useContext, useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../Context/AppContext";
import { useNotifications } from 'reapop';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit,loadCreditData,} = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const { notify } = useNotifications()
  const prevSignedInRef = useRef(isSignedIn)
  const hasShownNotificationRef = useRef(false)

  useEffect(()=>{
    // Check if user just logged in (transition from false to true)
    if(isSignedIn && !prevSignedInRef.current && !hasShownNotificationRef.current){
      // Small delay to ensure user data is loaded
      setTimeout(() => {
        const userName = user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || 'User'
        notify({
          title: 'Login Successful! 🎉',
          message: `Welcome ${userName}! You're all set.`,
          status: 'success',
          dismissible: true,
          dismissAfter: 4000,
        })
        hasShownNotificationRef.current = true
      }, 500)
    }
    
    // Update previous state
    prevSignedInRef.current = isSignedIn
    
    // Reset notification flag when logged out
    if(!isSignedIn){
      hasShownNotificationRef.current = false
    }
  },[isSignedIn, user, notify])

  useEffect(()=>{
    if(isSignedIn){
      loadCreditData()
    }
  },[isSignedIn, loadCreditData])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/98 backdrop-blur-xl shadow-xl border-b border-gray-100/50 py-3' 
        : 'bg-transparent py-5'
    }`}>
      {/* Gradient border bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-200/50 to-transparent transition-opacity duration-500 ${
        scrolled ? 'opacity-100' : 'opacity-0'
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                className="relative cursor-pointer w-32 sm:w-40 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110" 
                src={assets.logo} 
                alt="Logo" 
              />
            </div>
          </Link>

          {/* Right Section */}
          {isSignedIn ? (
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Credits Button */}
              <button 
                onClick={()=>navigate('/buy')} 
                className="group relative flex items-center gap-3 bg-white/90 hover:bg-white px-4 sm:px-5 py-2.5 rounded-full border border-violet-200/50 hover:border-violet-300 transition-all duration-300 hover:scale-105 hover:shadow-md backdrop-blur-sm"
              >
                {/* Crown Icon */}
                <div className="relative w-8 h-8 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-sm">
                  <img 
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                    src={assets.credit_icon} 
                    alt="Credits" 
                  />
                </div>
                {/* Credits Text */}
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-600 font-medium leading-tight">Credits</span>
                  <span className="text-base font-bold text-fuchsia-600 leading-tight">
                    {credit !== false ? credit : 5}
                  </span>
                </div>
                {/* Dot Indicator */}
                <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></div>
              </button>

              {/* User Greeting */}
              {user && (
                <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300 transition-all duration-300">
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500 font-medium leading-tight">Welcome back</span>
                    <span className="text-sm font-bold text-gray-800 leading-tight">
                      {user.firstName?.toUpperCase() || user.emailAddresses[0]?.emailAddress?.split('@')[0]?.toUpperCase() || 'USER'}
                    </span>
                  </div>
                </div>
              )}

              {/* User Button */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 border-2 border-violet-200 hover:border-violet-400 transition-all duration-300",
                        userButtonPopoverCard: "shadow-2xl border border-gray-100",
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Get Started Button */}
              <button
                onClick={() => openSignIn()}
                className="group relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 text-white flex items-center gap-2.5 px-6 sm:px-8 py-3 text-sm font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 border border-violet-500/20"
              >
                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                
                <span className="relative z-10 flex items-center gap-2">
                  <span>Get Started</span>
                  <img 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" 
                    src={assets.arrow_icon} 
                    alt="Arrow" 
                  />
                </span>
                
                {/* Hover gradient overlay */}
                <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-purple-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
