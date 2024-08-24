import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ndp2 from "../../Assets/ndp2.png";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import SidebarAdmin from "../../Components/SidebarAdmin";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import { formatDate } from "../../utils";

const InventoryAdm = () => {
  // State untuk menyimpan data barang, kategori, dan serial number`
  const [data, setData] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState("");
  const [selectedSerialNumbers, setSelectedSerialNumbers] = useState([]);

  // State untuk mengelola edit serial number dan status
  const [editSerialId, setEditSerialId] = useState(null);
  const [editSerialValue, setEditSerialValue] = useState("");
  const [editStatusSerial, setEditStatusSerial] = useState("");

  //state untuk mengelola table action
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState(null); // Untuk menyimpan barang yang dipilih untuk diupdate/delete

  //state untuk option supplier, perusahaan dan kategori(diatas)
  const [supplier, setSupplier] = useState([]);
  const [perusahaan, setPerusahaan] = useState([]);

  // react-hook-form setup
  const { register, handleSubmit, setValue, control, reset, watch } = useForm({
    defaultValues: {
      nama_barang: "",
      jumlah: 0,
      id_supplier: "",
      id_perusahaan: "",
      tanggal_pembelian_barang: "",
      id_kategori: "",
      nomor_seri: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "nomor_seri",
  });

  const jumlah = watch("jumlah", 0);

  // Function untuk mengisi form dengan data yang dipilih
  useEffect(() => {
    if (selectedBarang) {
      setValue("nama_barang", selectedBarang.nama_barang);
      setValue("jumlah", selectedBarang.jumlah);
      setValue("id_supplier", selectedBarang.id_supplier);
      setValue("id_perusahaan", selectedBarang.id_perusahaan);
      setValue(
        "tanggal_pembelian_barang",
        selectedBarang.tanggal_pembelian_barang
      );
      setValue("id_kategori", selectedBarang.id_kategori);
      setValue("nomor_seri", selectedBarang.serial_numbers || []);
    }
  }, [selectedBarang, setValue]);

  // Mengatur nomor seri sesuai dengan jumlah yang diinput
  useEffect(() => {
    if (jumlah > fields.length) {
      append({ nomor_seri: "" });
    } else if (jumlah < fields.length) {
      remove(fields.length - 1);
    }
  }, [jumlah, fields.length, append, remove]);

  // mengambil option dari state
  const getOptions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/options");
      setSupplier(response.data.supplier);
      setPerusahaan(response.data.perusahaan);
      setKategori(response.data.kategori);
    } catch (error) {
      console.error("Gagal mengambil data opsi:", error);
    }
  };

  //function update barang
  const updateBarang = async (data) => {
    try {
      await axios.put(
        `http://localhost:3000/api/barang/${selectedBarang.id_barang}`,
        data
      );

      setData((prevData) =>
        prevData.map((item) =>
          item.id_barang === selectedBarang.id_barang
            ? { ...item, ...data }
            : item
        )
      );

      setIsUpdateModalOpen(false);
      setSelectedBarang(null);
    } catch (error) {
      console.error("Failed to update barang:", error);
    }
  };

  // Function untuk mengambil data barang dari API
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/barang");
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function untuk menghapus barang berdasarkan ID
  const deleteBarang = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/barang/${id}`);
      getData(); // Refresh data setelah delete
    } catch (error) {
      console.log(error);
    }
  };

  // Mengambil data ketika komponen pertama kali dimuat
  useEffect(() => {
    getData();
    getOptions();
  }, []);

  // Mengatur serial number yang akan diedit
  const handleSerialNumberClick = (serialNumbers) => {
    setSelectedSerialNumbers(serialNumbers);
    document.getElementById("my_modal_2").showModal();
  };

  // Function untuk mengedit serial number
  const handleEditClick = (serial) => {
    setEditSerialId(serial.id_serial);
    setEditSerialValue(serial.nomor_seri);
    setEditStatusSerial(serial.status_serial);
  };

  // Function untuk menyimpan perubahan serial number
  const handleSave = async (id_serial) => {
    try {
      await axios.put(
        `http://localhost:3000/api/barang/serial-number/${id_serial}`,
        {
          nomor_seri: editSerialValue,
          status_serial: editStatusSerial, // Jika status juga diubah
        }
      );

      setSelectedSerialNumbers((prev) =>
        prev.map((serial) =>
          serial.id_serial === id_serial
            ? {
                ...serial,
                nomor_seri: editSerialValue,
                status_serial: editStatusSerial, // Perbarui status juga jika diperlukan
              }
            : serial
        )
      );
      setEditSerialId(null);
      setEditSerialValue("");
      setEditStatusSerial(""); // Setel status input menjadi kosong setelah update
    } catch (error) {
      console.error("Failed to update serial number:", error);
    }
  };

  // Function untuk membatalkan perubahan
  const handleCancel = () => {
    setEditSerialId(null);
    setEditSerialValue("");
    setEditStatusSerial("");
  };

  // Function untuk menghapus serial number
  const handleDelete = async (id_serial) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/barang/serial-number/${id_serial}`
      );

      setSelectedSerialNumbers((prev) =>
        prev.filter((serial) => serial.id_serial !== id_serial)
      );

      setData((prevData) =>
        prevData.map((item) => {
          if (
            item.serial_numbers.some((serial) => serial.id_serial === id_serial)
          ) {
            return {
              ...item,
              jumlah: item.jumlah - 1,
              serial_numbers: item.serial_numbers.filter(
                (serial) => serial.id_serial !== id_serial
              ),
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error("Failed to delete serial number:", error);
    }
  };

  //handle click table action
  const handleUpdateClick = (barang) => {
    setSelectedBarang(barang);
    setIsUpdateModalOpen(true);
  };

  //handle click table action
  const handleDeleteClick = (barang) => {
    setSelectedBarang(barang);
    setIsDeleteModalOpen(true);
  };

  // Function untuk konfirmasi delete barang
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/barang/${selectedBarang.id_barang}`
      );

      setData((prevData) =>
        prevData.filter((item) => item.id_barang !== selectedBarang.id_barang)
      );

      setIsDeleteModalOpen(false);
      setSelectedBarang(null);
    } catch (error) {
      console.error("Failed to delete barang:", error);
    }
  };

  // Filter data barang berdasarkan kategori yang dipilih
  const filteredData = selectedKategori
    ? data.filter((item) => item.nama_kategori === selectedKategori)
    : data;

  return (
    <>
      {/* Layout Utama */}
      <div className="w-screen h-screen bg-[#EAEAEA] flex flex-row text-black">
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
            <h1 className="font-poppins text-[25px] font-medium my-5 ">
              Stock List
            </h1>
            <div className="flex flex-row gap-3 items-center justify-center">
              {/* Filter Kategori */}
              <div className="flex flex-row items-center font-poppins mb-4">
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
              {/* Add Item Button */}
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
          <div className="w-full font-poppins px-4 py-4 bg-white rounded-lg shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className=" text-black italic font-light rounded-xl">
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
                {filteredData.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-200">
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
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleUpdateClick(data)}
                      >
                        Update
                      </button>
                      <button
                        className="ml-2 text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteClick(data)}
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

      {/* Modal Serial Number */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-white text-black font-poppins">
          <h3 className="font-bold text-xl text-center">Serial Numbers</h3>
          <div className="py-4 text-center">
            {selectedSerialNumbers.length > 0 ? (
              <ul>
                {selectedSerialNumbers.map((serial, index) => (
                  <li
                    key={index}
                    className="mb-2 flex text-left gap-5 text-lg px-2"
                  >
                    {editSerialId === serial.id_serial ? (
                      <>
                        <input
                          value={editSerialValue}
                          onChange={(e) => setEditSerialValue(e.target.value)}
                          className="border rounded px-2 py-1 bg-white"
                        />
                        <select
                          value={editStatusSerial}
                          onChange={(e) => setEditStatusSerial(e.target.value)}
                          className="border rounded px-2 py-1 bg-white"
                        >
                          <option value="Available">Available</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Loan">Loan</option>
                        </select>
                        <p>-</p>
                        <button onClick={() => handleSave(serial.id_serial)}>
                          Save
                        </button>
                        <p>-</p>
                        <button onClick={handleCancel}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <p>{serial.nomor_seri}</p>
                        <p>-</p>
                        <p>{serial.status_serial}</p>
                        <p>-</p>
                        <button onClick={() => handleEditClick(serial)}>
                          Edit
                        </button>
                        <p>-</p>
                        <button onClick={() => handleDelete(serial.id_serial)}>
                          Delete
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No serial numbers available.</p>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Modal Update di komponen */}
      {isUpdateModalOpen && (
        <dialog id="my_modal_2" className="modal" open>
          <div className="modal-box bg-white text-black font-poppins">
            <h3 className="font-bold text-xl text-center">Update Barang</h3>
            <form
              onSubmit={handleSubmit(updateBarang)}
              className="flex flex-col py-4 gap-2"
            >
              {/* nama barang */}
              <label htmlFor="nama_barang" className="text-sm">
                Name
              </label>
              <input
                type="text"
                {...register("nama_barang")}
                className="border rounded px-2 py-1 bg-white w-full"
              />
              {/* quantity */}
              <label htmlFor="jumlah" className="text-sm">
                Quantity
              </label>
              <input
                type="number"
                {...register("jumlah")}
                className="border rounded px-2 py-1 bg-white w-full"
              />
              {/* supplier */}
              <label htmlFor="id_supplier" className="text-sm">
                Supplier
              </label>
              <select
                {...register("id_supplier")}
                className="border rounded px-2 py-1 bg-white w-full"
              >
                {supplier.map((sup) => (
                  <option key={sup.id_supplier} value={sup.id_supplier}>
                    {sup.nama_supplier}
                  </option>
                ))}
              </select>
              {/* Ownership */}
              <label htmlFor="id_perusahaan" className="text-sm">
                Ownership
              </label>
              <select
                {...register("id_perusahaan")}
                className="border rounded px-2 py-1 bg-white w-full"
              >
                {perusahaan.map((per) => (
                  <option key={per.id_perusahaan} value={per.id_perusahaan}>
                    {per.nama_perusahaan}
                  </option>
                ))}
              </select>
              {/* buy date */}
              <label htmlFor="tanggal_pembelian_barang" className="text-sm">
                Buy Date
              </label>
              <input
                type="date"
                {...register("tanggal_pembelian_barang")}
                className="border rounded px-2 py-1 bg-white w-full"
              />
              {/* Category */}
              <label htmlFor="id_kategori" className="text-sm">
                Category
              </label>
              <select
                {...register("id_kategori")}
                className="border rounded px-2 py-1 bg-white w-full"
              >
                {kategori.map((kat) => (
                  <option key={kat.id_kategori} value={kat.id_kategori}>
                    {kat.nama_kategori}
                  </option>
                ))}
              </select>
              {/* Nomor Seri */}
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col">
                  <label
                    htmlFor={`nomor_seri.${index}.nomor_seri`}
                    className="text-sm"
                  >
                    Serial Number {index + 1}
                  </label>
                  <input
                    {...register(`nomor_seri.${index}.nomor_seri`)}
                    className="border rounded px-2 py-1 bg-white w-full"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-3 py-2 mt-4"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsUpdateModalOpen(false)}
                className="bg-gray-500 text-white rounded px-3 py-2 mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </dialog>
      )}

      {/* Render Modal Delete di komponen */}
      {isDeleteModalOpen && (
        <dialog className="modal" open>
          <div className="modal-box bg-white text-black font-poppins">
            <h3 className="font-bold text-xl text-center">Confirm Delete</h3>
            <p>Are you sure you want to delete this item?</p>
            <div className="py-4 text-center">
              <button onClick={handleDeleteConfirm}>Yes</button>
              <button onClick={() => setIsDeleteModalOpen(false)}>No</button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default InventoryAdm;
