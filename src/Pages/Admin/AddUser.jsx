import React from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import SidebarAdmin from '../../Components/SidebarAdmin';

const AddUser = () => {
  return (
    <>
    {/* Layout Utama */}
   <div className='w-screen h-screen overflow-x-hidden bg-[#EAEAEA] flex flex-row'>
    <SidebarAdmin/>
    {/* Content Dashboard */}
    <div className='w-[82%] float-right flex flex-col ml-[18%] mr-10 pl-2'>
      {/* Dashboard */}
      <div className='flex flex-row justify-between mt-8 font-poppins items-center shadow-sm pb-5 mb-5'>
        <h1 className='text-black text-[25px] font-medium'>Add User</h1>
        <Link className='px-3 bg-black text-white font-poppins rounded-md'><CgProfile className='h-[30px]'/></Link>
      </div>
      <form action="">
        {/* Nama */}
        <label for="nama" className='flex text-[15px] font-poppins mb-3'>Name</label>
        <input type="text" name="nama" id="" className='w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2 '/>
        {/* Email */}
        <label for="email" className='flex text-[15px] font-poppins mb-3'>Email</label>
        <input type="text" name="email" id="" className='w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2'/>
        {/*  Phone */}
        <label for="buydate" className='flex text-[15px] font-poppins mb-3'>Phone</label>
        <input type="text" name="buydate" id="" className='w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2'/>
        {/* Nik */}
        <label for="nik" className='flex text-[15px] font-poppins mb-3'>Nik</label>
        <input type="text" name="nik" id="" className='w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2'/>
        {/* Division */}
        <label for="division" className='flex text-[15px] font-poppins mb-3'>Division</label>
        <input type="text" name="division" id="" className='w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2'/>
        {/* Company */}
        <label for="company" className='flex text-[15px] font-poppins mb-3'>Company</label>
        <select name="company" id="" className='h-[40px] w-full px-3 py-2 shadow-md rounded-md text-[12px] font-medium mb-2 font-poppins'>
            <option className='' value="infinite">Infinite Learning Indonesia</option>
            <option value="ndp">Nongsa Digital Park</option>
        </select>
        {/* Password */}
        <a className='flex text-[15px] font-poppins mb-3'>Password</a>
        <input type="password" name="password" id="" className='w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2'/>
        {/* Add Data */}
        <Link type='submit' to='/UserAdm' className='flex font-poppins bg-black w-full py-2 mt-4 mb-4 rounded-md justify-center text-white'>Submit</Link>
      </form>
    </div>
   </div>
    </>
  )
}

export default AddUser
