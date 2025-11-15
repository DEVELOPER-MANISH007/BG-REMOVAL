import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Result from "./Pages/Result";
import BuyCredit from "./Pages/BuyCredit";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import NotificationsSystem from 'reapop';
import { useNotifications } from 'reapop';

const App = () => {
  const location = useLocation();
  const { notifications, dismissNotification } = useNotifications();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <NotificationsSystem
        notifications={notifications}
        dismissNotification={dismissNotification}
      />
      
      <Navbar />
      
      <main className="relative z-10">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy" element={<BuyCredit />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
