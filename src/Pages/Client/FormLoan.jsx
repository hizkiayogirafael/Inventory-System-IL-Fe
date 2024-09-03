import React from "react";
import SidebarUser from "../../Components/SidebarUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const FormLoan = () => {
  //login response
  const { loginResponse } = useAuth();
  const user = jwtDecode(loginResponse);
  const idUser = user.id;
  function stringToInt(str) {
    const result = parseInt(str, 10); // Basis 10 untuk desimal
    if (isNaN(result)) {
      throw new Error("Input bukan angka yang valid");
    }
    return result;
  }

  //useForm Setup
  const { register, handleSubmit, reset, watch } = useForm();
  const navigate = useNavigate();

  //state menampung data options
  const [kategori, setKategori] = useState([]);
  const [barang, setBarang] = useState([]);

  //ambil data barang untuk dipilih
  const getOptions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/options");
      console.log(response.data);
      setKategori(response.data.kategori);
      setBarang(response.data.barang);
    } catch (error) {
      console.error("Gagal mengambil data opsi:", error);
    }
  };

  //useEffect
  useEffect(() => {
    getOptions();
  }, []);

  //Function Submit Form
  const onSubmit = async (data) => {
    try {
      // Menambahkan id_user ke dalam data yang akan dikirim ke server
      const requestData = {
        id_user: idUser, // Mengambil id_user dari user yang login
        id_kategori: stringToInt(data.id_kategori),
        id_barang: stringToInt(data.id_barang),
        jumlah: stringToInt(data.jumlah),
        keterangan: data.keterangan,
        tanggal_pinjam: data.tanggal_pinjam,
        tanggal_kembali: data.tanggal_kembali,
      };

      // Mengirimkan data ke server menggunakan axios
      await axios.post("http://localhost:3000/api/peminjaman", requestData);
      alert("Peminjaman berhasil diajukan dengan status Pending.");
      reset();
      navigate("/Loaning");
    } catch (error) {
      console.error("Gagal mengajukan peminjaman:", error);
      alert("Terjadi kesalahan saat mengajukan peminjaman.");
    }
  };

  //state untuk filter kategori barang
  const [filteredBarang, setFilteredBarang] = useState([]);

  //handle kategori
  const handleKategoriChange = (e) => {
    const selectedKategoriId = stringToInt(e.target.value);

    // Filter barang berdasarkan kategori yang dipilih
    const filtered = barang.filter(
      (item) => item.id_kategori === selectedKategoriId
    );

    // Update state barang yang difilter
    setFilteredBarang(filtered);
  };

  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden bg-[#EAEAEA] flex flex-row">
        <SidebarUser />
        <div className="w-[82%] float-right flex flex-col ml-[18%] mr-10 pl-2">
          <div className="flex flex-row justify-between mt-8 font-poppins items-center shadow-sm pb-5 mb-5">
            <h1 className="text-black text-[25px] font-medium">Form Loan</h1>
            <Link className="px-3 bg-black text-white font-poppins rounded-md">
              <CgProfile className="h-[30px]" />
            </Link>
          </div>
          <div className="flex flex-col mt-4 font-poppins pb-5 mb-5 text-black">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Kategori */}
              <label
                htmlFor="id_kategori"
                className="flex text-[15px] font-poppins mb-3"
              >
                Kategori
              </label>
              <select
                {...register("id_kategori", { required: true })}
                className="h-[40px] w-full px-3 py-2 shadow-md rounded-md bg-white text-slate-600 text-[15px] outline-none font-medium mb-2 font-poppins"
                onChange={handleKategoriChange} // Add this line
              >
                <option value="">Choose Category</option>
                {kategori?.map((kategori, index) => (
                  <option key={index} value={kategori.id_kategori}>
                    {kategori.nama_kategori}
                  </option>
                ))}
              </select>

              {/* Barang */}
              <label
                htmlFor="id_barang"
                className="flex text-[15px] font-poppins mb-3"
              >
                Barang
              </label>
              <select
                {...register("id_barang", { required: true })}
                className="h-[40px] w-full px-3 py-2 shadow-md rounded-md bg-white text-slate-600 text-[15px] outline-none font-medium mb-2 font-poppins"
              >
                <option value="">Choose Barang</option>
                {filteredBarang?.map((barang, index) => (
                  <option key={index} value={barang.id_barang}>
                    {barang.nama_barang}
                  </option>
                ))}
              </select>

              {/* Quantity */}
              <label
                htmlFor="jumlah"
                className="flex text-[15px] font-poppins mb-3"
              >
                Jumlah
              </label>
              <input
                type="number"
                {...register("jumlah", { required: true })}
                className="w-full px-2 py-2 shadow-md rounded-md  bg-white text-slate-600 text-[15px] outline-none font-medium mb-2"
              />
              {/* Keterangan */}
              <label
                htmlFor="keterangan"
                className="flex text-[15px] font-poppins mb-3"
              >
                Keterangan
              </label>
              <textarea
                type="text"
                {...register("keterangan", { required: true })}
                className="w-full px-2 py-2 shadow-md rounded-md font-medium mb-2 bg-white text-slate-600 text-[15px] outline-none"
              ></textarea>
              {/* Tanggal Pinjam */}
              <label
                htmlFor="tanggal_pinjam"
                className="flex text-[15px] font-poppins mb-3 text-black"
              >
                Tanggal Pinjam
              </label>
              <input
                type="date"
                {...register("tanggal_pinjam", { required: true })}
                className="w-full px-2 py-2 shadow-md rounded-md  bg-white text-slate-600 text-[15px] outline-none font-medium mb-2"
              />
              {/* Tanggal Kembali */}
              <label
                htmlFor="tanggal_kembali"
                className="flex text-[15px] font-poppins mb-3 text-black mt-2"
              >
                Tanggal Kembali
              </label>
              <input
                type="date"
                {...register("tanggal_kembali", { required: true })}
                className="w-full px-2 py-2 shadow-md rounded-md  bg-white text-slate-600 text-[15px] outline-none font-medium mb-2"
              />
              {/* Submit */}
              <button
                type="submit"
                className="flex font-poppins bg-black w-full py-2 mt-4 mb-4 rounded-md justify-center text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLoan;
