import React, { useState, useEffect } from "react";
import ndp2 from "../../Assets/ndp2.png";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import SidebarAdmin from "../../Components/SidebarAdmin";
import axios from "axios";
import { formatDate } from "../../utils";

const LoaningAdm = () => {
  // State untuk menampung data peminjaman
  const [data, setData] = useState([]);

  // Function untuk mengambil data peminjaman
  const getPeminjaman = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/peminjaman`);
      setData(response.data.data); // Simpan data yang diterima ke state
      console.log(response.data.data); // Periksa data yang diterima di sini
    } catch (error) {
      console.log("Gagal Mengambil data peminjaman", error);
    }
  };

  // useEffect untuk mengambil data peminjaman saat pertama kali page dirender
  useEffect(() => {
    getPeminjaman();
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
            <h1 className="text-black text-[25px] font-medium">Loaning</h1>
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
            <h1 className="font-poppins text-[25px] font-bold my-5 text-black">
              Loan List
            </h1>
          </div>
          {/* Inventory List */}
          <div className="w-full font-poppins px-2 py-2 rounded-md shadow-md bg-white text-center">
            <table className="w-full border-collapse bg-white text-black">
              <thead>
                <tr className="rounded-md">
                  <th className="px-4 py-3 text-center">No</th>
                  <th className="px-4 py-3 text-center">User</th>
                  <th className="px-4 py-3 text-center">Category</th>
                  <th className="px-4 py-3 text-center">Barang</th>
                  <th className="px-4 py-3 text-center">Quantity</th>
                  <th className="px-4 py-3 text-center">Description</th>
                  <th className="px-4 py-3 text-center">Loan Date</th>
                  <th className="px-4 py-3 text-center">Return Date</th>
                  <th className="px-4 py-3 text-center">Serial Numbers</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3 text-center">{item?.nama_user}</td>
                    <td className="px-4 py-3 text-center">
                      {item?.nama_kategori}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item?.nama_barang}
                    </td>
                    <td className="px-4 py-3 text-center">{item?.jumlah}</td>
                    <td className="px-4 py-3 text-center">
                      {item?.keterangan}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {formatDate(item?.tanggal_pinjam)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {formatDate(item?.tanggal_kembali)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button className="btn text-white">Serial Number</button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item?.status_peminjaman}
                    </td>
                    <td className="px-4 py-3 flex flex-row justify-center">
                      <button className="text-white bg-black px-3 rounded-md py-2 hover:text-blue-800">
                        Approve
                      </button>
                      <button className="ml-2 text-white bg-black px-3 rounded-md py-2 hover:text-red-800">
                        Reject
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

export default LoaningAdm;
