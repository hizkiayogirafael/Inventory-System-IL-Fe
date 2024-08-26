import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const [divisi, setDivisi] = useState();
  const [perusahaan, setPerusahaan] = useState();
  console.log(divisi, perusahaan);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const getOptions = async () => {
    const response = await axios.get("http://localhost:3000/options");
    setDivisi(response.data.divisi);
    setPerusahaan(response.data.perusahaan);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      console.log("Data yang dikirim:", data);
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data
      );

      //jika register berhasil
      if (response.status === 201) {
        alert("registrasi berhasil, tunggu konfirmasi email anda");
        reset(); //reset form setelah berhasil
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("registrasi gagal");
    }
  };

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <>
      {/* Layout Utama */}
      <div className="w-screen h-screen flex flex-col font-poppins justify-between py-8 items-center bg-white">
        {/* Form Register */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[80px] w-[40%] flex-col grid-cols-2"
        >
          <h1 className="flex justify-center font-bold text-[20px] text-black">
            Register
          </h1>
          <p className="text-[12px] flex justify-center mb-2 text-black">
            Please Fill in Register Information
          </p>
          <div className="flex gap-4">
            <div className="w-[50%]">
              {/* Name */}
              <label className="text-[13px] font-medium text-black">Name</label>
              <input
                type="text"
                {...register("nama", { required: true })}
                className="w-full px-2 py-2 border border-stone-950 bg-white text-black rounded-md text-[12px] font-medium"
              />
              {errors.name && (
                <p className="text-red-500 text-[10px]">Name is required</p>
              )}

              {/* Email */}
              <label className="text-[13px] font-medium text-black">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full px-2 py-2 border bg-white text-black border-stone-950 rounded-md text-[12px] font-medium mb-3"
              />
              {errors.email && (
                <p className="text-red-500 text-[10px]">Email is required</p>
              )}

              {/* Phone */}
              <label className="text-[13px] font-medium text-black">
                Phone
              </label>
              <input
                type="text"
                {...register("telepon", { required: true })}
                className="w-full px-2 py-2 border border-stone-950 bg-white text-black rounded-md text-[12px] font-medium mb-3"
              />
              {errors.phone && (
                <p className="text-red-500 text-[10px]">Phone is required</p>
              )}

              {/* Nik */}
              <label className="text-[13px] font-medium text-black">Nik</label>
              <input
                type="text"
                {...register("nik", { required: true })}
                className="w-full px-2 py-2 border border-stone-950 bg-white text-black rounded-md text-[12px] font-medium mb-3"
              />
              {errors.nik && (
                <p className="text-red-500 text-[10px]">Nik is required</p>
              )}
            </div>
            <div className="w-[50%]">
              {/* Division */}
              <label className="text-[13px] font-medium text-black">
                Division
              </label>
              <select
                {...register("id_divisi", { required: true })}
                className="w-full px-2 py-2 border border-stone-950 bg-white text-black rounded-md text-[12px] font-medium"
              >
                {errors.division && (
                  <p className="text-red-500 text-[10px]">
                    Division is required
                  </p>
                )}
                <option value="">Choose Division</option>
                {divisi?.map((divisi, index) => {
                  return (
                    <option key={index} value={divisi.id_divisi}>
                      {divisi.nama_divisi}
                    </option>
                  );
                })}
              </select>

              {/* Company */}
              <label className="text-[13px] font-medium text-black">
                Company
              </label>
              <select
                {...register("id_perusahaan", { required: true })}
                className="w-full px-2 py-2 border border-stone-950 bg-white text-black rounded-md text-[12px] font-medium mb-3"
              >
                {errors.company && (
                  <p className="text-red-500 text-[10px]">
                    Company is required
                  </p>
                )}
                <option value="">Choose Company</option>
                {perusahaan?.map((perusahaan, index) => {
                  return (
                    <option key={index} value={perusahaan.id_perusahaan}>
                      {perusahaan.nama_perusahaan}
                    </option>
                  );
                })}
              </select>
              {errors.company && (
                <p className="text-red-500 text-[10px]">Company is required</p>
              )}

              {/* Password */}
              <label className="text-[13px] font-medium text-black">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full px-2 py-2 border border-stone-950 bg-white text-black rounded-md text-[12px] font-medium mb-3"
              />
              {errors.password && (
                <p className="text-red-500 text-[10px]">Password is required</p>
              )}
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-2 py-2 bg-black text-white rounded-md text-[12px] font-medium mt-6"
              >
                Register
              </button>
            </div>
          </div>
        </form>

        {/* Link to Login */}
        <Link
          className="flex justify-center py-2 rounded-md text-black text-[12px] gap-1 mt-[-320px]"
          to="/Login"
        >
          Have An Account?
          <span className="text-stone-800 font-semibold">Login Here!</span>
        </Link>

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
