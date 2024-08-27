import React, { useEffect, useState } from "react";
import ndp2 from "../../Assets/ndp2.png";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import SidebarAdmin from "../../Components/SidebarAdmin";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UserAdm = () => {
  //state untuk menampung data user
  const [data, setData] = useState([]);

  //Function Untuk get data user
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      if (response.data.data === null) {
        throw new Error("Data user tidak ditemukan");
      }
      setData(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error.message);
      console.log(error);
    }
  };

  //useEffect untuk menjjalan kembali setelah render
  useEffect(() => {
    getData();
  }, []);

  //function delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      getData(); // Refresh data setelah delete
    } catch (error) {
      console.log(error);
    }
  };

  // Function untuk approve user
  const approveUser = async (userId) => {
    try {
      await axios.put(`http://localhost:3000/api/users/approve/${userId}`, {
        approved: 1,
      });
      getData(); // Refresh data setelah approve
    } catch (error) {
      console.log(error);
    }
  };

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
  const onSubmit = async (data) => {
    try {
      // Pastikan id dimasukkan ke dalam data yang dikirim ke backend
      if (!data.id) {
        throw new Error("User ID is required for updating");
      }

      await axios.put(`http://localhost:3000/api/users/${data.id}`, data);
      getData(); // Refresh data setelah update
      reset();
      document.getElementById("my_modal_1").close(); // Tutup modal jika berhasil
      navigate("/UserAdm"); // Redirect setelah submit berhasil
    } catch (error) {
      console.log(error);
      // Jika terjadi kesalahan, Anda bisa menunjukkan pesan kesalahan di UI
    }
  };

  //state menampung data sebelumnya / current data
  const [currentData, setCurrentData] = useState();

  //setValue saat open modal edit
  const openEditModal = (data) => {
    setCurrentData(data);
    setValue("id", data.id_user); // Pastikan id disertakan
    setValue("nama", data.nama);
    setValue("email", data.email);
    setValue("telepon", data.telepon);
    setValue("nik", data.nik);
    setValue("id_divisi", data.id_divisi);
    setValue("id_perusahaan", data.id_perusahaan);
    setValue("approved", data.approved); // Set the status (approved) value
    document.getElementById("my_modal_1").showModal(); // Buka modal
  };

  //state untuk divisi dan perusahaan
  const [divisi, setDivisi] = useState([]);
  const [perusahaan, setPerusahaan] = useState([]);

  //getOption untuk divisi dan perusahaan
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

  //useEffect untuk menjjalan kembali setelah render
  useEffect(() => {
    getOptions();
  }, []);

  return (
    <>
      {/* Layout Utama */}
      <div className="w-screen h-screen bg-[#EAEAEA] flex flex-row">
        <SidebarAdmin />
        {/* Content Dashboard */}
        <div className="w-[82%] float-right flex flex-col ml-[19%] mr-10">
          {/* Dashboard */}
          <div className="flex flex-row justify-between mt-8 font-poppins items-center">
            <h1 className="text-black text-[25px] font-medium">
              User Management
            </h1>
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
          <div className="flex flex-row justify-between items-center font-poppins">
            <h1 className="font-poppins text-[25px] font-medium my-5 text-black">
              User List
            </h1>
            <Link
              className="bg-black text-white flex flex-row items-center gap-2 rounded-xl px-5 py-1 shadow-lg hover:shadow-2xl hover:bg-gray-600"
              to="/AddUser"
            >
              Add User
              <IoMdAddCircle />
            </Link>
          </div>
          {/* Inventory List */}
          <div className="w-full font-poppins px-2 py-2  rounded-md shadow-md bg-white">
            <table className="w-full border-collapse bg-white text-black">
              <thead>
                <tr className="rounded-md">
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Nik</th>
                  <th className="px-4 py-3 text-left">Division</th>
                  <th className="px-4 py-3 text-left">Company</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{user?.nama}</td>
                    <td className="px-4 py-3">{user?.email}</td>
                    <td className="px-4 py-3">{user?.telepon}</td>
                    <td className="px-4 py-3">{user?.nik}</td>
                    <td className="px-4 py-3">{user?.nama_divisi}</td>
                    <td className="px-4 py-3">{user?.nama_perusahaan}</td>
                    <td className="px-4 py-3">
                      {user.approved === 0 ? (
                        <button
                          className="text-white bg-black px-3 rounded-md py-2 hover:bg-gray-800"
                          onClick={() => approveUser(user.id_user)}
                        >
                          Approve
                        </button>
                      ) : (
                        <span>Approved</span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex flex-row">
                      <button
                        className="text-white bg-black px-3 rounded-md py-2 hover:text-blue-800"
                        onClick={() => openEditModal(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-white bg-black px-3 rounded-md py-2 ml-2 hover:text-red-800"
                        onClick={() => deleteUser(user?.id_user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal Update User */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white font-poppins text-black">
          <h1 className="text-[20px] font-medium text-center">Update User</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
              <option value="">Choose Division</option>
              {divisi?.map((divisi, index) => (
                <option key={index} value={divisi.id_divisi}>
                  {divisi.nama_divisi}
                </option>
              ))}
            </select>
            {errors.division && (
              <p className="text-red-500 text-[10px]">Division is required</p>
            )}
            {/* Company */}
            <label className="flex text-[15px] font-poppins mb-3 text-black">
              Company
            </label>
            <select
              {...register("id_perusahaan", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            >
              <option value="">Choose Company</option>
              {perusahaan?.map((perusahaan, index) => (
                <option key={index} value={perusahaan.id_perusahaan}>
                  {perusahaan.nama_perusahaan}
                </option>
              ))}
            </select>
            {errors.company && (
              <p className="text-red-500 text-[10px]">Company is required</p>
            )}
            {/* Status */}
            <label className="flex text-[15px] font-poppins mb-3 text-black">
              Status
            </label>
            <select
              {...register("approved", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            >
              <option value={0}>Pending</option>
              <option value={1}>Approved</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-[10px]">Status is required</p>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-black text-white px-3 py-2 rounded-md mt-4"
            >
              Submit
            </button>
            <button
              className="bg-black text-white px-3 py-2 rounded-md mt-3"
              onClick={() => document.getElementById("my_modal_1").close()}
            >
              Cancel
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default UserAdm;
