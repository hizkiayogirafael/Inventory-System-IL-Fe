import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import SidebarAdmin from "../../Components/SidebarAdmin";

const AddItem = () => {
  return (
    <>
      {/* Layout Utama */}
      <div className="w-screen h-screen overflow-x-hidden bg-[#EAEAEA] flex flex-row">
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
          <form action="">
            {/* Nama */}
            <label for="nama" className="flex text-[15px] font-poppins mb-3">
              Name
            </label>
            <input
              type="text"
              name="nama"
              id=""
              className="w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2 "
            />
            {/* Supplier */}
            <label
              for="supplier"
              className="flex text-[15px] font-poppins mb-3"
            >
              Supplier
            </label>
            <input
              type="text"
              name="supplier"
              id=""
              className="w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2"
            />
            {/* Buy Date */}
            <label for="buydate" className="flex text-[15px] font-poppins mb-3">
              Buy Date
            </label>
            <input
              type="date"
              name="buydate"
              id=""
              className="w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2"
            />
            {/* Quantity */}
            <label
              for="serialnumber"
              className="flex text-[15px] font-poppins mb-3"
            >
              Quantity
            </label>
            <input
              type="number"
              name="serialnumber"
              id=""
              className="w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2"
            />
            {/* Serial Number */}
            <label
              for="quantity"
              className="flex text-[15px] font-poppins mb-3"
            >
              Serial Number
            </label>
            <input
              type="text"
              name="=quantity"
              id=""
              className="w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2"
            />
            {/* Ownership */}
            <label
              for="quantity"
              className="flex text-[15px] font-poppins mb-3"
            >
              Ownership
            </label>
            <select
              name="quantity"
              id=""
              className="h-[40px] w-full px-3 py-2 shadow-md rounded-md text-[12px] font-medium mb-2 font-poppins"
            >
              <option className="" value="infinite">
                Infinite Learning Indonesia
              </option>
              <option value="ndp">Nongsa Digital Park</option>
            </select>
            {/* Status */}
            <label for="status" className="flex text-[15px] font-poppins mb-3">
              Status
            </label>
            <select
              name="status"
              id=""
              className="h-[40px] w-full px-3 py-2 shadow-md rounded-md text-[12px] font-medium mb-2 font-poppins"
            >
              <option className="" value="infinite">
                Tersedia
              </option>
              <option value="ndp">Maintenance</option>
            </select>
            {/* Add Data */}
            <Link
              type="submit"
              to="/InventoryAdm"
              className="flex font-poppins bg-black w-full py-2 mt-4 mb-4 rounded-md justify-center text-white"
            >
              Submit
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItem;
