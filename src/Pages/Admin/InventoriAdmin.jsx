import React, { useEffect, useState } from "react";
import axios from "axios";
import ndp2 from "../../Assets/ndp2.png";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import SidebarAdmin from "../../Components/SidebarAdmin";
import { IoMdAddCircle } from "react-icons/io";
import { formatDate } from "../../utils";

const InventoriAdmin = () => {
  //state untuk menampung data barang
  const [data, setData] = useState([]);

  //Function untuk mengambil data barang dari API//2
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/barang");
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //state untuk menyimpan kategori
  const [kategori, setKategori] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState("");

  //function get kategori
  const getKategori = async () => {
    try {
      const response = await axios.get("http://localhost:3000/options");
      setKategori(response.data.kategori);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter data barang berdasarkan kategori yang dipilih
  const filteredData = selectedKategori
    ? data.filter((item) => item.nama_kategori === selectedKategori)
    : data;

  //use effcect untuk mengambil data barang dan kategori
  useEffect(() => {
    getData();
    getKategori();
  }, []);

  // Delete barang ---
  const deleteBarang = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/barang/${id}`);
      getData(); // Refresh data setelah delete
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
              Inventory Management
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
              Stock List
            </h1>
            <div className="flex flex-row gap-4">
              {/* Filter Kategori */}
              <div className="flex items-center font-poppins mb-4">
                <select
                  value={selectedKategori}
                  onChange={(e) => setSelectedKategori(e.target.value)}
                  className="bg-black text-white flex flex-row items-center gap-2 rounded-xl px-5 py-1 shadow-lg"
                >
                  <option value="">All Categories</option>
                  {kategori.map((kat) => (
                    <option key={kat.id_kategori} value={kat.nama_kategori}>
                      {kat.nama_kategori}
                    </option>
                  ))}
                </select>
              </div>
              {/* Add Item */}
              <Link
                className="bg-black text-white flex flex-row items-center gap-2 rounded-xl px-5 py-1 shadow-lg"
                to="/AddItem"
              >
                Add Item
                <IoMdAddCircle />
              </Link>
            </div>
          </div>
          {/* Inventory List */}
          <div className="w-full font-poppins px-2 py-2  rounded-md shadow-md text-black">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Supplier</th>
                  <th className="px-4 py-3 text-left">Ownership</th>
                  <th className="px-4 py-3 text-left">Buy Date</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Serial Number</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Mapping */}
                {filteredData.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{data?.nama_barang}</td>
                    <td className="px-4 py-3">{data?.jumlah}</td>
                    <td className="px-4 py-3">{data?.nama_supplier}</td>
                    <td className="px-4 py-3">{data?.nama_perusahaan}</td>
                    <td className="px-4 py-3">
                      {formatDate(data?.tanggal_pembelian_barang)}
                    </td>
                    <td className="px-4 py-3">{data?.nama_kategori}</td>
                    <td className="px-4 py-3">
                      <button
                        className="ml-2 text-green-600 hover:text-green-800"
                        onClick={() =>
                          handleSerialNumberClick(data?.serial_numbers)
                        }
                      >
                        Serial Numbers
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        Update
                      </button>
                      <button
                        className="ml-2 text-red-600 hover:text-red-800"
                        onClick={() => deleteBarang(data?.id_barang)}
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

export default InventoriAdmin;
