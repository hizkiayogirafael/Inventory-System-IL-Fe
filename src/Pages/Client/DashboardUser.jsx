import React from "react";
import SidebarUser from "../../Components/SidebarUser";
import ndp2 from "../../Assets/ndp2.png";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const DashboardUser = () => {
  return (
    <>
      {/* Layout Utama */}
      <div className="w-screen h-screen bg-[#EAEAEA] flex flex-row">
        <SidebarUser />
        {/* Content Dashboard */}
        <div className="w-[82%] float-right flex flex-col ml-[19%] mr-10">
          {/* Dashboard */}
          <div className="flex flex-row justify-between mt-8 font-poppins items-center">
            <h1 className="text-black text-[25px] font-medium">Dashboard</h1>
            <Link className="px-3 bg-black text-white font-poppins rounded-md">
              <CgProfile className="h-[30px]" />
            </Link>
          </div>
          {/* Header */}
          <div className="flex flex-row justify-between bg-black mt-5 h-[200px] rounded-[20px] items-center px-8">
            <p className="text-white font-poppins w-[40%] text-[20px]">
              Infinite Learning Indonesia Inventory System website-based is what
              is designed for managing stock of goods, loan process and
              returning goods, as well as monitoring the status of goods
              real-time.
            </p>
            <img
              src={ndp2}
              className="flex h-[170px]"
              alt="Infinite Learning Indonesia"
            />
          </div>
          <h1 className="font-poppins text-[25px] font-medium my-5 text-black">
            Main Feature
          </h1>
          {/* Inventory Menu */}
          <Link
            className="bg-black flex flex-row text-white font-poppins justify-between py-4 px-5 rounded-xl mb-3 shadow-lg items-center"
            to="/Inventory"
          >
            Inventory - Stock
            <IoOpenOutline className="h-[20px]" />
          </Link>
          <Link
            className="bg-black flex flex-row text-white font-poppins justify-between py-4 px-5 rounded-xl shadow-lg"
            to="/Loaning"
          >
            Inventory - Loan
            <IoOpenOutline className="h-[20px]" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardUser;
