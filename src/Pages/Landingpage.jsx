import React from "react";
import logoHitam from "../Assets/logoHitam.png";
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import ndp from "../Assets/ndp.png";

const Landingpage = () => {
  return (
    <>
      {/* Layout Pertama */}
      <div className="w-full bg-black flex flex-row h-screen font-poppins">
        {/* Layout Kiri */}
        <div className="w-[50%] h-screen bg-black flex flex-col">
          {/* Navbar */}
          <div className="flex flex-row px-5 pt-8 gap-[60px] ml-[60px]">
            <img
              src={logoHitam}
              className="h-[50px]"
              alt="Infinite Learning Indonesia"
            />
            <Link className="flex text-white items-center">How It Works?</Link>
            <Link className="flex text-white items-center">Contact Us</Link>
          </div>
          {/* Content */}
          <div className="flex flex-col ml px-5 ml-[60px] mt-[150px]">
            <h1 className="text-white font-medium text-[50px]">Inventory</h1>
            <h1 className="text-white font-medium text-[50px]">Management</h1>
            <h1 className="text-white font-medium text-[50px]">System.</h1>
            <Link
              className="w-[30%] px-1 py-2 bg-white text-black flex flex-row rounded-[30px] justify-center mt-2 text-[20px] font-semibold gap-2"
              to="/Login"
            >
              Login
              <IoMdLogIn className="h-[30px]" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landingpage;
