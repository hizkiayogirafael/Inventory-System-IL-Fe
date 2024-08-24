import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import SidebarAdmin from "../../Components/SidebarAdmin";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddItem = () => {
  const [supplier, setSupplier] = useState([]);
  const [perusahaan, setPerusahaan] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [statusBarang, setStatusBarang] = useState([]);
  const [nomorSeri, setNomorSeri] = useState([]);

  const getOptions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/options");
      console.log(response.data);
      setSupplier(response.data.supplier);
      setPerusahaan(response.data.perusahaan);
      setKategori(response.data.kategori);
      setStatusBarang(response.data.statusBarang);
    } catch (error) {
      console.error("Gagal mengambil data opsi:", error);
    }
  };

  const { register, handleSubmit, reset, watch } = useForm();
  const navigate = useNavigate();

  // Tangkap perubahan pada field "jumlah"
  const jumlah = watch("jumlah", 0);

  useEffect(() => {
    // Perbarui nomor seri berdasarkan jumlah
    const updatedNomorSeri = Array.from({ length: jumlah }, (_, i) => "");
    setNomorSeri(updatedNomorSeri);
  }, [jumlah]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/api/barang", {
        ...data,
        nomor_seri: nomorSeri,
      });
      if (response.status === 201) {
        console.log(response);
        alert("Barang berhasil ditambahkan!");
        reset(); // Reset form setelah berhasil menambahkan barang
        navigate("/InventoryAdm"); // Redirect ke halaman inventory admin
      }
    } catch (error) {
      console.error("Gagal menambahkan barang:", error);
      alert("Gagal menambahkan barang. Silahkan coba lagi.");
    }
  };

  const handleSerialNumberChange = (index, value) => {
    const updatedNomorSeri = [...nomorSeri];
    updatedNomorSeri[index] = value;
    setNomorSeri(updatedNomorSeri);
  };

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <>
      {/* Layout Utama */}
      <div className="w-screen h-screen overflow-x-hidden bg-[#EAEAEA] flex flex-row font-poppins">
        <SidebarAdmin />
        {/* Content Dashboard */}
        <div className="w-[82%] float-right flex flex-col ml-[18%] mr-10 pl-2">
          {/* Dashboard */}
          <div className="flex flex-row justify-between mt-8 font-poppins items-center shadow-sm pb-5 mb-5">
            <h1 className="text-black text-[25px] font-medium">Add Item</h1>
            <Link className="px-3 bg-black text-white font-poppins rounded-md">
              <CgProfile className="h-[30px]" />
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nama */}
            <label
              htmlFor="nama_barang"
              className="flex text-[15px] font-poppins mb-3"
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
            {/* Quantity */}
            <label
              htmlFor="jumlah"
              className="flex text-[15px] font-poppins mb-3"
            >
              Quantity
            </label>
            <input
              type="number"
              {...register("jumlah", { required: true })}
              className="w-full px-2 py-2 shadow-md rounded-md  bg-white text-slate-600 text-[15px] outline-none font-medium mb-2"
            />
            {/* Serial Number */}
            {Array.from({ length: jumlah }).map((_, index) => (
              <div key={index}>
                <label
                  htmlFor={`nomor_seri_${index}`}
                  className="flex text-[15px] font-poppins mb-3"
                >
                  Serial Number {index + 1}
                </label>
                <input
                  type="text"
                  {...register(`nomor_seri[${index}]`, { required: true })}
                  value={nomorSeri[index] || ""}
                  onChange={(e) =>
                    handleSerialNumberChange(index, e.target.value)
                  }
                  className="w-full px-2 py-2 shadow-md rounded-md  bg-white text-slate-600 text-[15px] outline-none font-medium mb-2"
                />
              </div>
            ))}
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
            {/* Status */}
            {/* <label
              htmlFor="id_status_barang"
              className="flex text-[15px] font-poppins mb-3"
            >
              Status Barang
            </label>
            <select
              {...register("id_status_barang", { required: true })}
              className="h-[40px] w-full px-3 py-2 shadow-md rounded-md text-[12px] font-medium mb-2 font-poppins"
            >
              <option value="">Choose Status</option>
              {statusBarang?.map((statusBarang, index) => (
                <option key={index} value={statusBarang.id_status_barang}>
                  {statusBarang.status_barang}
                </option>
              ))}
            </select> */}
            {/* Add Data */}
            <button
              type="submit"
              className="flex font-poppins bg-black w-full py-2 mt-4 mb-4 rounded-md justify-center text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItem;
