import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img className="w-44 cursor-pointer" src={assets.logo} alt="" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">
            Home
            <hr className="border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden" />
          </li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">
            All Doctors
            <hr className="border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden" />
          </li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">
            About
            <hr className="border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden" />
          </li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">
            Contact
            <hr className="border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden" />
          </li>
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 left-0 text-base pt-14 font-medium text-gray-600 z-25 hidden group-hover:block">
              <div className="w-48 bg-stone-100 rounded flex flex-col gap-2 shadow-lg">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                >
                  My Appointments
                </p>
                <p onClick={()=>setToken(false)} className="cursor-pointer hover:bg-red-300 p-2 rounded text-red-600">
                  Log Out
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className=" bg-blue-500 text-white rounded-full px-8 py-3 font-light cursor-pointer hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
