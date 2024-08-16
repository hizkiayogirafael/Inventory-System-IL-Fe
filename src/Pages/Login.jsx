import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../store/auth";

const Login = () => {
  const { setLoginResponse } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/login`,
        data
      );
      console.log(response);
      if (response.data !== undefined && response.status === 200) {
        const userData = await response.data;
        setLoginResponse(userData);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Layout  Utama*/}
      <div className="w-screen h-screen flex flex-col font-poppins justify-between py-8 items-center ">
        <form className="mt-[120px] w-[20%]" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="flex justify-center font-bold text-[20px] text-black">
            Registration
          </h1>
          <p className="text-[12px] flex justify-center mb-2">
            Please Fill in Your Information
          </p>

          <label className="text-[13px] font-medium">Email</label>
          <input
            {...register("email", { required: true, maxLength: 100 })}
            className="w-full px-2 py-2 border border-stone-950 rounded-md text-[12px] font-medium mb-3"
            type="text"
            placeholder="First Name"
          />

          <label className="text-[13px] font-medium">Last Name</label>
          <input
            {...register("password", { pattern: /^[A-Za-z]+$/i })}
            className="w-full px-2 py-2 border border-stone-950 rounded-md text-[12px] font-medium mb-3"
            type="password"
            placeholder="Last Name"
          />

          <button
            className="flex bg-black mt-2 px-10 mx-auto justify-center py-2 rounded-md text-white text-[12px]"
            type="submit"
            value="Submit"
          >
            Submit
          </button>

          <Link
            className="flex justify-center py-2 rounded-md text-black text-[12px] gap-1 mt-1"
            to="/Register"
          >
            Already have an account?
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

export default Login;
