import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-indigo-500 rounded-lg px-6 md:px-10 lg:px-20">
      <div className="md:w-1/2 flex flex-col items-start justify-centergap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light mt-4">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browser throw our extensive list of trusted doctors,
            <br className="hidden sm:block" /> schedule your appointments hassel free.
          </p>
        </div>
        <a className="p-3 bg-white mt-4 flex gap-4 rounded-xl hover:scale-105 transition-all duration-300 text-sm" href="">
          Book Appointment <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>
      <div className="md:w-1/2 relative ">
        <img
          src={assets.header_img}
          alt="#speciality"
          className="w-full md:absolute bottom-0 h-auto rounded-lg "
        />
      </div>
    </div>
  );
};

export default Header;
