import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import SidebarAdmin from "../../Components/SidebarAdmin";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [data, setData] = useState([]);
  //state menampung data yang akan diinput
  const [perusahaan, setPerusahaan] = useState([]);
  const [divisi, setDivisi] = useState([]);

  //function get options
  const getOptions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/options");
      console.log(response.data);
      setPerusahaan(response.data.perusahaan);
      setDivisi(response.data.divisi);
    } catch (error) {
      console.error("Gagal mengambil data opsi:", error);
    }
  };

  //useEffect untuk get data saat page dimuat
  useEffect(() => {
    getOptions();
  }, []);

  //setup useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  //onSubmit form add user
  const onSubmit = async (data) => {
    try {
      console.log("Data yang dikirim:", data); // Log data sebelum dikirim
      const response = await axios.post(
        "http://localhost:3000/api/users/",
        data
      );
      console.log("Response dari server:", response); // Log response dari server
      if (response.status === 201) {
        console.log(response);
        alert("User berhasil ditambahkan!");
        reset(); // Reset form setelah berhasil menambahkan user
        navigate("/UserAdm"); // Redirect ke halaman UserAdm
      }
    } catch (error) {
      console.error("Gagal menambahkan user:", error); // Log error yang terjadi
      alert("Gagal menambahkan user. Silahkan coba lagi.");
    }
  };

  return (
    <>
      {/* Layout Utama */}
      <div className="w-screen h-screen overflow-x-hidden bg-[#EAEAEA] flex flex-row">
        <SidebarAdmin />
        {/* Content Dashboard */}
        <div className="w-[82%] float-right flex flex-col ml-[18%] mr-10 pl-2">
          {/* Dashboard */}
          <div className="flex flex-row justify-between mt-8 font-poppins items-center shadow-sm pb-5 mb-5">
            <h1 className="text-black text-[25px] font-medium">Add User</h1>
            <Link className="px-3 bg-black text-white font-poppins rounded-md">
              <CgProfile className="h-[30px]" />
            </Link>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-black font-poppins"
          >
            {/* Nama */}
            <label
              htmlFor="nama"
              className="flex text-[15px] font-poppins mb-3 text-black"
            >
              Name
            </label>
            <input
              type="text"
              {...register("nama", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            />
            {/* Email */}
            <label
              htmlFor="email"
              className="flex text-[15px] font-poppins mb-3 text-black"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-[10px]">Email is required</p>
            )}
            {/* Phone */}
            <label className="flex text-[15px] font-poppins mb-3 text-black">
              Phone
            </label>
            <input
              type="text"
              {...register("telepon", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-[10px]">Phone is required</p>
            )}
            {/* Nik */}
            <label className="flex text-[15px] font-poppins mb-3 text-black">
              Nik
            </label>
            <input
              type="text"
              {...register("nik", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            />
            {errors.nik && (
              <p className="text-red-500 text-[10px]">Nik is required</p>
            )}
            {/* Division */}
            <label className="flex text-[15px] font-poppins mb-3 text-black">
              Division
            </label>
            <select
              {...register("id_divisi", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            >
              {errors.division && (
                <p className="text-red-500 text-[10px]">Division is required</p>
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
            <label className="flex text-[15px] font-poppins mb-3 text-black">
              Company
            </label>
            <select
              {...register("id_perusahaan", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            >
              {errors.company && (
                <p className="text-red-500 text-[10px]">Company is required</p>
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
            <label className="flex text-[15px] font-poppins mb-3 text-black">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-[10px]">Password is required</p>
            )}
            {/* submit button */}
            <button
              type="submit"
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-black text-white font-poppins text-[15px] outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
