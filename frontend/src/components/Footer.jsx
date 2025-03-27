import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10 ">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left Section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates animi praesentium velit consectetur cumque unde, beatae nobis eos deserunt facere dolorem earum sequi ut expedita eaque 
          </p>
        </div>
        {/* Center Section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* Right Section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-9158565635</li>
            <li>hospital@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* Copyright text */}
      <hr />
      <div>
        <p className="py-5 text-sm text-center">Copyright 2025@saurav-All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
