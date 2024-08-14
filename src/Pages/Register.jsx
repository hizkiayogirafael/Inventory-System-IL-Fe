import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      {/* Layout  Utama*/}
      <div className="w-screen h-screen flex flex-col font-poppins justify-between py-8 items-center ">
        {/* Form Login */}
        <form action="" className="mt-[80px] w-[40%] flex-col grid-cols-2">
          <h1 className="flex justify-center font-bold text-[20px] text-black">
            Register
          </h1>
          <p className="text-[12px] flex justify-center mb-2">
            Please Fill in Register Information
          </p>
          <div className="flex gap-4">
            <div className="w-[50%]">
              {/* Name */}
              <a className="text-[13px] font-medium">Name</a>
              <input
                type="text"
                name="name"
                id=""
                className="w-full px-2 py-2 border border-stone-950 rounded-md text-[12px] font-medium "
              />
              {/* Email */}
              <a className="text-[13px] font-medium">Email</a>
              <input
                type="text"
                name="email"
                id=""
                className="w-full px-2 py-2 border border-stone-950 rounded-md text-[12px] font-medium mb-3"
              />
              {/* Phone */}
              <a className="text-[13px] font-medium">Phone</a>
              <input
                type="text"
                name="phone"
                id=""
                className="w-full px-2 py-2 border border-stone-950 rounded-md text-[12px] font-medium mb-3"
              />
              {/* Nik */}
              <a className="text-[13px] font-medium">Nik</a>
              <input
                type="text"
                name="nik"
                id=""
                className="w-full px-2 py-2 border border-stone-950 rounded-md text-[12px] font-medium mb-3"
              />
            </div>
            <div className="w-[50%]">
              {/* Division */}
              <a className="text-[13px] font-medium">Division</a>
              <input
                type="text"
                name="division"
                id=""
                className="w-full px-2 py-2 border border-stone-950 rounded-md text-[12px] font-medium "
              />
              {/* Company */}
              <a className="text-[13px] font-medium">Company</a>
              <input
                type="text"
                name="company"
                id=""
                className="w-full px-2 py-2 border border-stone-950 rounded-md text-[12px] font-medium mb-3"
              />
              {/* Password */}
              <a className="text-[13px] font-medium">Password</a>
              <input
                type="password"
                name="password"
                id=""
                className="w-full px-2 py-2 border border-stone-950 rounded-md text-[12px] font-medium mb-3"
              />
              {/* Confirm Password */}
              <a className="text-[13px] font-medium">Confirm Password</a>
              <input
                type="password"
                name="confirmpass"
                id=""
                className="w-full px-2 py-2 border border-stone-950 rounded-md text-[12px] font-medium mb-3"
              />
            </div>
          </div>
          {/* Button */}
          <Link
            className="flex bg-black mt-2 justify-center py-2 mx-[150px] rounded-md text-white text-[15px]"
            to="/DashboardAdmin"
          >
            Register
          </Link>
          <Link
            className="flex justify-center py-2 rounded-md text-black text-[12px] gap-1 mt-1"
            to="/Login"
          >
            Have An Account?
            <span className="text-stone-800 font-semibold">Login Here!</span>
          </Link>
        </form>
        {/* Copyrights */}
        <div className="w-screen flex justify-center">
          <a className="text-[15px]">
            ©2024 Infinite Learning All Right Reserved.
          </a>
        </div>
      </div>
    </>
  );
};

export default Register;
