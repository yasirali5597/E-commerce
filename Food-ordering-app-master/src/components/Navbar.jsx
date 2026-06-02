import React from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearch } from "../redux/slices/SearchSlice";
import { Search, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const cart = useSelector((state) => state.cart.cart);

const totalQty = cart.reduce(
  (total, item) => total + (item.qty || 1),
  0
);

  useEffect( () =>{
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  } ,[])


  const handleLogout =()=>{
    localStorage.removeItem("user"); 
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <nav className=" top-0 bottom-0 z-50 bg-black border-b border-gray-800 shadow-lg ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Section */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <ShoppingBag className="w-8 h-8 text-indigo-500" />

          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              E-Commerce
            </h1>

            <p className="text-xs text-gray-400">{new Date().toDateString()}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-[350px] lg:w-[450px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="search"
            placeholder="Search products..."
            autoComplete="off"
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="
              w-full
              pl-12
              pr-4
              py-1
              rounded-full
              bg-gray-800
              text-white
              border
              border-gray-700
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
              transition-all
              duration-300
            "
          />
        </div>
        // Auth Buttons 

        {
          isLoggedIn ? (
            <button 
            onClick={handleLogout}
            className="px-4 py-1 bg-gradient-to-r from-blue-700 to-pink-500 text-white rounded-full hover:from-blue-600 hover:to-pink-600 transition-colors">
              Logout
            </button>
          ): 
          (
            <div>
              <button 
              onClick={()=> navigate("/login")}
              className="px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:from-indigo-600 hover:to-purple-600 transition-colors mr-2">
                Login
              </button>
              <button 
              onClick={()=> navigate("/signup")}
              className="px-4 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:from-green-600 hover:to-emerald-600 transition-colors">
                Sign Up
              </button> 
            </div>
          )

        }
      </div>
    </nav>
  );
};

export default Navbar;
