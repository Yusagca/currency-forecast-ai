import React from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 border-b border-emerald-600 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-stretch">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-emerald-500">
        <i class="ri-arrow-right-up-line"></i>Tahmin<span className="text-slate-100">Pro</span><i class=" text-red-500 ri-arrow-right-down-line"></i>
        </h1>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-slate-200 hover:text-emerald-500 transition-all duration-300 font-medium text-lg"
          >
            Ana Sayfa
          </Link>
          <Link
            to="/forecast"
            className="text-slate-200 hover:text-emerald-500 transition-all duration-300 font-medium text-lg"
          >
            Tahmin
          </Link>
        </div>

        {/* User Profile / Login Button */}
      </div>
    </nav>
  );
};

export default Navbar;
