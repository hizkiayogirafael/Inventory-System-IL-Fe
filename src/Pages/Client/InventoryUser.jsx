import React from "react";
import SidebarUser from "../../Components/SidebarUser";
import { useEffect, useState } from "react";
import axios from "axios";
import ndp2 from "../../Assets/ndp2.png";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoMdAddCircle } from "react-icons/io";
import { IoOpenOutline } from "react-icons/io5";

const InventoryUser = () => {
  //state untuk menampung data barang
  const [data, setData] = useState([]);

  //Function untuk mengambil data barang dari API
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

  //function get kategori -> changed ke getOptions
  const getOptions = async () => {
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
    getOptions();
  }, []);

  //state untuk menyimpan serial number yang akan ditampilkan
  const [serialNumbers, setSerialNumbers] = useState([]);

  //handle ketika serial number button di click
  const handleSerialNumberClick = async (id_barang) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/barang/serial-number/${id_barang}`
      );
      console.log("Response Data: ", response.data.serialNumbers);
      setSerialNumbers(response.data.serialNumbers);
      document.getElementById("my_modal_2").showModal();
    } catch (error) {
      console.error("Gagal mengambil serial numbers:", error);
    }
  };

  return (
    <>
      {/* Layout Utama */}
      <div className="w-screen h-screen bg-[#EAEAEA] flex flex-row">
        <SidebarUser />
        {/* Content Dashboard */}
        <div className="w-[82%] float-right flex flex-col ml-[19%] mr-10">
          {/* Dashboard */}
          <div className="flex flex-row justify-between mt-8 font-poppins items-center">
            <h1 className="text-black text-[25px] font-medium">Inventory</h1>
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
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-poppins text-[25px] my-5 text-black font-bold">
              Stock List
            </h1>
            <div className="gap-2 flex">
              {/* Filter Kategori */}
              <div className="flex items-center font-poppins">
                <select
                  value={selectedKategori}
                  onChange={(e) => setSelectedKategori(e.target.value)}
                  className="bg-black text-white flex flex-row items-center gap-2 rounded-xl px-5 py-1 shadow-lg appearance-none"
                >
                  <option value="">All Categories</option>
                  {kategori.map((kategori) => (
                    <option
                      key={kategori.id_kategori}
                      value={kategori.nama_kategori}
                    >
                      {kategori.nama_kategori}
                    </option>
                  ))}
                </select>
              </div>
              <Link className="font-poppins bg-black text-white rounded-xl flex flex-row items-center gap-1 px-3">
                Add Loan
                <IoMdAddCircle />
              </Link>
            </div>
          </div>
          {/* Inventory Table */}
          <div className="w-full font-poppins px-2 py-2  rounded-md shadow-md bg-white">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="rounded-md text-black">
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Supplier</th>
                  <th className="px-4 py-3 text-left">Ownership</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-left">Serial Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Mapping */}
                {filteredData.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50 text-black">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{data?.nama_barang}</td>
                    <td className="px-4 py-3">{data?.jumlah}</td>
                    <td className="px-4 py-3">{data?.nama_supplier}</td>
                    <td className="px-4 py-3">{data?.nama_perusahaan}</td>
                    <td className="px-4 py-3">{data?.nama_kategori}</td>
                    <td className="px-4 py-3">{data?.lokasi_barang}</td>
                    <td className="px-4 py-3">
                      <button
                        className="btn text-white"
                        onClick={() => handleSerialNumberClick(data.id_barang)}
                      >
                        Open SN
                        <IoOpenOutline className="h-[20px] text-white" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal Serial Number */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-col bg-white text-black">
          <div className="flex flex-row items-center gap-2 justify-between">
            <h1 className="font-poppins font-bold text-[20px] italic">
              Serial Number
            </h1>
            <div className="flex flex-row gap-2">
              <button
                className="text-white bg-black font-poppins px-2 rounded-md"
                onClick={() => document.getElementById("my_modal_2").close()}
              >
                Close
              </button>
            </div>
          </div>
          {serialNumbers.length > 0 ? (
            <table className="min-w-full bg-white border shadow-md mt-4 font-poppins">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Serial Number</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {serialNumbers.map((serial, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-left">{index + 1}</td>
                    <td className="px-4 py-3 text-left">{serial.nomor_seri}</td>
                    <td className="px-4 py-3 text-left">
                      {serial.status_serial}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No serial numbers available</p>
          )}
        </div>
      </dialog>
    </>
  );
};

export default InventoryUser;
