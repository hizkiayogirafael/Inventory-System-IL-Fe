import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      {/* Layout  Utama*/}
      <div className="w-screen h-screen flex flex-col font-poppins justify-between py-8 items-center ">
        {/* Form Login */}
        <form action="" className="mt-[120px] w-[20%]">
          <h1 className="flex justify-center font-bold text-[20px] text-black">
            Login
          </h1>
          <p className="text-[12px] flex justify-center mb-2">
            Please Fill in Login Information
          </p>
          {/* Email */}
          <a className="text-[13px] font-medium">Email</a>
          <input
            type="text"
            name="email"
            id=""
            className="w-full px-2 py-2 border border-stone-950 rounded-md text-[12px] font-medium "
          />
          {/* Password */}
          <a className="text-[13px] font-medium">Password</a>
          <input
            type="password"
            name="password"
            id=""
            className="w-full px-2 py-2 border border-stone-950 rounded-md text-[12px] font-medium mb-3"
          />
          <Link
            className="flex bg-black mt-2 justify-center py-2 rounded-md text-white text-[12px]"
            to="/DashboardUser"
          >
            Login
          </Link>
          <Link
            className="flex justify-center py-2 rounded-md text-black text-[12px] gap-1 mt-1"
            to="/Register"
          >
            Don't Have An Account?
            <span className="text-stone-800 font-semibold">Register Here!</span>
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

export default Login;
