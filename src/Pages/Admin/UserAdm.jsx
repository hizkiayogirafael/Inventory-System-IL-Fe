import React, { useEffect, useState } from "react";
import ndp2 from "../../Assets/ndp2.png";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import SidebarAdmin from "../../Components/SidebarAdmin";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";

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
              className="bg-black text-white flex flex-row items-center gap-2 rounded-xl px-5 py-1 shadow-lg"
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
                    <td className="px-4 py-3">
                      <button className="text-white bg-black px-3 rounded-md py-2 hover:text-blue-800">
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
    </>
  );
};

export default UserAdm;
