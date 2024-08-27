import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import SidebarAdmin from "../../Components/SidebarAdmin";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../store/auth";

const ProfileAdm = () => {
  const { loginResponse } = useAuth();
  const [data, setData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [currentData, setCurrentData] = useState(null); // State untuk menyimpan data user saat open modal
  const user = jwtDecode(loginResponse);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${user.id}`
      );
      if (response.data.data === null) {
        throw new Error("Data user tidak ditemukan");
      }
      setData(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //useForm untuk setup form update
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  //submit untuk form update
  const onSubmit = async (formData) => {
    try {
      // Pastikan id dimasukkan ke dalam data yang dikirim ke backend
      if (!formData.id) {
        throw new Error("User ID is required for updating");
      }

      await axios.put(
        `http://localhost:3000/api/users/profile/${formData.id}`,
        formData
      );
      getData(); // Refresh data setelah update
      reset();
      document.getElementById("my_modal_1").close(); // Tutup modal jika berhasil
    } catch (error) {
      console.log(error);
    }
  };

  //setValue saat open modal edit
  const openEditModal = (userData) => {
    setCurrentData(userData);
    setValue("id", userData.id_user); // Pastikan id disertakan
    setValue("nama", userData.nama);
    setValue("email", userData.email);
    setValue("telepon", userData.telepon);
    setValue("nik", userData.nik);
    setValue("id_divisi", userData.id_divisi);
    setValue("id_perusahaan", userData.id_perusahaan);
    document.getElementById("my_modal_1").showModal(); // Buka modal
  };

  //state untuk divisi dan perusahaan
  const [divisi, setDivisi] = useState([]);
  const [perusahaan, setPerusahaan] = useState([]);

  //getOption untuk divisi dan perusahaan
  const getOptions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/options");
      setPerusahaan(response.data.perusahaan);
      setDivisi(response.data.divisi);
    } catch (error) {
      console.error("Gagal mengambil data opsi:", error);
    }
  };

  //useEffect untuk menjalankan kembali setelah render
  useEffect(() => {
    getOptions();
  }, []);

  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden bg-[#EAEAEA] flex flex-row">
        <SidebarAdmin />
        <div className="w-[82%] float-right flex flex-col ml-[18%] mr-10 pl-2">
          <div className="flex flex-row justify-between mt-8 font-poppins items-center shadow-sm pb-5 mb-5">
            <h1 className="text-black text-[25px] font-medium">Profile</h1>
            <Link className="px-3 bg-black text-white font-poppins rounded-md">
              <CgProfile className="h-[30px]" />
            </Link>
          </div>
          <div className="flex flex-col mt-4 font-poppins pb-5 mb-5 text-black">
            <label htmlFor="nama" className="mb-2">
              Name
            </label>
            <p className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none">
              {data.nama || "N/A"}
            </p>
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <p className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none">
              {data.email || "N/A"}
            </p>
            <label htmlFor="telepon" className="mb-2">
              Phone
            </label>
            <p className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none">
              {data.telepon || "N/A"}
            </p>
            <label htmlFor="nik" className="mb-2">
              Nik
            </label>
            <p className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none">
              {data.nik || "N/A"}
            </p>
            <label htmlFor="divisi" className="mb-2">
              Division
            </label>
            <p className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none">
              {data.nama_divisi || "N/A"}
            </p>
            <label htmlFor="perusahaan" className="mb-2">
              Company
            </label>
            <p className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none">
              {data.nama_perusahaan || "N/A"}
            </p>
            <button
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-black text-white text-[15px] mt-3 outline-none"
              onClick={() => openEditModal(data)} // Pastikan 'data' digunakan di sini
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {/* Modal Edit Profile */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white font-poppins">
          <h1 className="text-center text-black text-[20px] font-semibold">
            Edit Profile
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nama */}
            <label
              htmlFor="nama"
              className="flex text-[15px] font-poppins mb-3 text-black"
            >
              Name
            </label>
            <input
              type="text"
              {...register("nama")}
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
              {...register("email")}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            />
            {/* Phone */}
            <label className="flex text-[15px] font-poppins mb-3 text-black">
              Phone
            </label>
            <input
              type="text"
              {...register("telepon")}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            />
            {/* Nik */}
            <label className="flex text-[15px] font-poppins mb-3 text-black">
              Nik
            </label>
            <input
              type="text"
              {...register("nik")}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            />
            {/* Division */}
            <label className="flex text-[15px] font-poppins mb-3 text-black">
              Division
            </label>
            <select
              {...register("id_divisi")}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            >
              <option value="">Choose Division</option>
              {divisi?.map((divisi, index) => (
                <option key={index} value={divisi.id_divisi}>
                  {divisi.nama_divisi}
                </option>
              ))}
            </select>
            {/* Company */}
            <label className="flex text-[15px] font-poppins mb-3 text-black">
              Company
            </label>
            <select
              {...register("id_perusahaan")}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            >
              <option value="">Choose Company</option>
              {perusahaan?.map((perusahaan, index) => (
                <option key={index} value={perusahaan.id_perusahaan}>
                  {perusahaan.nama_perusahaan}
                </option>
              ))}
            </select>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-black text-white px-3 py-2 rounded-md"
              >
                Update
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-3 py-2 rounded-md ml-3"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ProfileAdm;
