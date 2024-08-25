import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ndp2 from "../../Assets/ndp2.png";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import SidebarAdmin from "../../Components/SidebarAdmin";
import { IoMdAddCircle } from "react-icons/io";
import { formatDate } from "../../utils";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoOpenOutline } from "react-icons/io5";

const InventoriAdmin = () => {
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
      setPerusahaan(response.data.perusahaan);
      setSupplier(response.data.supplier);
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

  // Delete barang ---
  const deleteBarang = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/barang/${id}`);
      getData(); // Refresh data setelah delete
    } catch (error) {
      console.log(error);
    }
  };

  //update section---------
  //state untuk menyimpan data yang akan diupdate
  const [currentData, setCurrentData] = useState();

  //state untuk menyimpan perusahaan dan supplier --> dilanjutkan dengan getData dari keduanya melalui getOptions
  const [perusahaan, setPerusahaan] = useState([]);
  const [supplier, setSupplier] = useState([]);

  //Set React-hook-form untuk update data
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  //Function untuk memunculkan value saat update di klik
  const openEditModal = (data) => {
    setCurrentData(data); // Simpan data yang sedang diedit ke state
    setValue("nama_barang", data.nama_barang);
    setValue("id_supplier", data.id_supplier); // Pastikan ini adalah id_supplier yang benar
    setValue("id_kategori", data.id_kategori); // Gunakan id_kategori yang benar
    setValue("tanggal_pembelian_barang", data.tanggal_pembelian_barang); // Pastikan format date sesuai
    setValue("id_perusahaan", data.id_perusahaan); // Gunakan id_perusahaan yang benar
    setValue("lokasi_barang", data.lokasi_barang);
    document.getElementById("my_modal_1").showModal(); // Buka modal
  };

  //Function update data
  const onUpdate = async (data) => {
    console.log("Data yang dikirim:", data);
    console.log("ID barang:", currentData.id_barang);
    try {
      await axios.put(
        `http://localhost:3000/api/barang/${currentData.id_barang}`, // Pastikan menggunakan `id_barang` yang benar
        data
      );
      getData(); // Refresh data setelah update
      document.getElementById("my_modal_1").close(); // Tutup modal
      reset();
    } catch (error) {
      console.log(error);
      alert("Gagal mengupdate data");
    }
  };

  //serial number section -------
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

  //function delete serial number
  const deleteSerialNumber = async (id_serial) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/barang/serial-number/${id_serial}`
      );

      // Perbarui state serialNumbers setelah penghapusan
      setSerialNumbers((prevSerialNumbers) =>
        prevSerialNumbers.filter((serial) => serial.id_serial !== id_serial)
      );
    } catch (error) {
      console.log(error);
    }
  };

  //Function Edit Serial Number
  const editSerialNumber = (serialNumber) => {
    // Simpan serial number yang sedang diedit ke dalam state
    setCurrentData(serialNumber);

    // Set value form untuk serial number
    setValues("nomor_seri", serialNumber.nomor_seri);
    setValues("status_serial", serialNumber.status_serial);

    // Tutup modal serial number
    document.getElementById("my_modal_2").close();

    // Buka modal edit serial number
    document.getElementById("my_modal_3").showModal();
  };

  //update serial number
  const onSubmitSerialNumber = async (data) => {
    try {
      await axios.put(
        `http://localhost:3000/api/barang/serial-number/${currentData.id_serial}`,
        data
      );

      // Refresh the serial numbers list after update
      setSerialNumbers((prevSerialNumbers) =>
        prevSerialNumbers.map((serial) =>
          serial.id_serial === currentData.id_serial
            ? { ...serial, ...data }
            : serial
        )
      );

      // Tutup modal edit serial number
      document.getElementById("my_modal_3").close();

      // Buka kembali modal serial number
      document.getElementById("my_modal_2").showModal();

      resets(); // Reset the form
    } catch (error) {
      console.error("Failed to update serial number:", error);
    }
  };

  // react-hook-form untuk update serial number
  const {
    register: registers,
    handleSubmit: handleSubmits,
    reset: resets,
    setValue: setValues,
    formState: formStates,
  } = useForm();

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
            <h1 className="font-poppins text-[25px] font-bold my-5 text-black">
              STOCK LIST
            </h1>
            <div className="flex flex-row gap-4">
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
          <div className="w-full font-poppins px-2 py-2 rounded-xl shadow-md text-black bg-white">
            <table className="w-full border-collapse bg-white ">
              <thead>
                <tr className="rounded-md">
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Supplier</th>
                  <th className="px-4 py-3 text-left">Ownership</th>
                  <th className="px-4 py-3 text-left">Buy Date</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Location</th>
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
                    <td className="px-4 py-3">
                      <button
                        className="text-white bg-black px-3 rounded-md py-2 hover:text-blue-800"
                        onClick={() => openEditModal(data)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="ml-2 text-white bg-black px-3 rounded-md py-2 hover:text-red-800"
                        onClick={() => deleteBarang(data?.id_barang)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Update Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white text-black font-poppins">
          <h1 className="text-[20px] pb-2">Update Data</h1>
          <form onSubmit={handleSubmit(onUpdate)}>
            {/* Nama */}
            <label
              htmlFor="nama_barang"
              className="flex text-[13px] font-poppins mb-3"
            >
              Name
            </label>
            <input
              type="text"
              {...register("nama_barang", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            />
            {/* Supplier */}
            <label
              htmlFor="id_supplier"
              className="flex text-[15px] font-poppins mb-3"
            >
              Supplier
            </label>
            <select
              {...register("id_supplier", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md  bg-white text-slate-600 text-[15px] outline-none font-medium mb-2"
            >
              <option value="">Choose Supplier</option>
              {supplier?.map((supplier, index) => (
                <option key={index} value={supplier.id_supplier}>
                  {supplier.nama_supplier}
                </option>
              ))}
            </select>
            {/* Buy Date */}
            <label
              htmlFor="tanggal_pembelian_barang"
              className="flex text-[15px] font-poppins mb-3"
            >
              Buy Date
            </label>
            <input
              type="date"
              {...register("tanggal_pembelian_barang", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md  bg-white text-slate-600 text-[15px] outline-none font-medium mb-2"
            />
            {/* Kategori */}
            <label
              htmlFor="id_kategori"
              className="flex text-[15px] font-poppins mb-3"
            >
              Kategori
            </label>
            <select
              {...register("id_kategori", { required: true })}
              className="h-[40px] w-full px-3 py-2 shadow-md rounded-md  bg-white text-slate-600 text-[15px] outline-none font-medium mb-2 font-poppins"
            >
              <option value="">Choose Category</option>
              {kategori?.map((kategori, index) => (
                <option key={index} value={kategori.id_kategori}>
                  {kategori.nama_kategori}
                </option>
              ))}
            </select>
            {/* Ownership */}
            <label
              htmlFor="id_perusahaan"
              className="flex text-[15px] font-poppins mb-3"
            >
              Ownership
            </label>
            <select
              {...register("id_perusahaan", { required: true })}
              className="h-[40px] w-full px-3 py-2 shadow-md rounded-md  bg-white text-slate-600 text-[15px] outline-none font-medium mb-2 font-poppins"
            >
              <option value="">Choose Ownership</option>
              {perusahaan?.map((perusahaan, index) => (
                <option key={index} value={perusahaan.id_perusahaan}>
                  {perusahaan.nama_perusahaan}
                </option>
              ))}
            </select>
            {/* Lokasi Barang */}
            <label
              htmlFor="lokasi_barang"
              className="flex text-[15px] font-poppins mb-3"
            >
              Lokasi Barang
            </label>
            <input
              type="text"
              {...register("lokasi_barang", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md  bg-white text-slate-600 text-[15px] outline-none font-medium mb-2"
            />
            {/* Add Data */}
            <button
              type="submit"
              className="flex font-poppins bg-black w-full py-2 mt-4 mb-4 rounded-md justify-center text-white"
            >
              Submit
            </button>
            {/* Cancel */}
            <button
              className="flex font-poppins bg-black w-full py-2 mt-4 mb-4 rounded-md justify-center text-white"
              type="button"
              onClick={() => document.getElementById("my_modal_1").close()}
            >
              Cancel
            </button>
          </form>
        </div>
      </dialog>
      {/* Modal Serial Number */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-col bg-white text-black">
          <div className="flex flex-row items-center gap-2 justify-between">
            <h1 className="font-poppins font-bold text-[20px] italic">
              Serial Number
            </h1>
            <div className="flex flex-row gap-2">
              <Link className="font-poppins text-white bg-black px-2 py-1 rounded-md">
                Add
              </Link>
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
                  <th className="px-4 py-3 text-left">Action</th>
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
                    <td className="px-4 py-3">
                      <button
                        className="text-white bg-black px-3 rounded-md py-2 hover:text-blue-800"
                        onClick={() => editSerialNumber(serial)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="ml-2 text-white bg-black px-3 rounded-md py-2 hover:text-red-800"
                        onClick={() => deleteSerialNumber(serial.id_serial)}
                      >
                        <MdDelete />
                      </button>
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
      {/* Edit Serial Number Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h1>Edit Serial Number</h1>
          <form onSubmit={handleSubmits(onSubmitSerialNumber)}>
            {/* Nama */}
            <label
              htmlFor="nomor_seri"
              className="flex text-[13px] font-poppins mb-3"
            >
              Serial Number
            </label>
            <input
              type="text"
              {...registers("nomor_seri", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
            />
            {/* Status Serial */}
            <label
              htmlFor="status_serial"
              className="flex text-[15px] font-poppins mb-3"
            >
              Status
            </label>
            <select
              {...registers("status_serial", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md  bg-white text-slate-600 text-[15px] outline-none font-medium mb-2"
            >
              <option value="Available">Available</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Loaned">Loaned</option>
            </select>
            <div className="modal-action">
              <button type="submit" className="btn">
                Submit
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  document.getElementById("my_modal_3").close();
                  document.getElementById("my_modal_2").showModal();
                }}
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

export default InventoriAdmin;
