import React from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import SidebarAdmin from '../../Components/SidebarAdmin';

const ProfileAdm = () => {
  return (
    <>
   {/* Layout Utama */}
   <div className='w-screen h-screen overflow-x-hidden bg-[#EAEAEA] flex flex-row'>
    <SidebarAdmin/>
    {/* Content Dashboard */}
    <div className='w-[82%] float-right flex flex-col ml-[18%] mr-10 pl-2'>
      {/* Dashboard */}
      <div className='flex flex-row justify-between mt-8 font-poppins items-center shadow-sm pb-5 mb-5'>
        <h1 className='text-black text-[25px] font-medium'>Profile</h1>
        <Link className='px-3 bg-black text-white font-poppins rounded-md'><CgProfile className='h-[30px]'/></Link>
      </div>
      <form action="">
        {/* Nama */}
        <a className='flex text-[15px] font-poppins mb-3'>Name</a>
        <input type="text" name="nama" id="" className='w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2 '/>
        {/* Email */}
        <a className='flex text-[15px] font-poppins mb-3'>Email</a>
        <input type="text" name="email" id="" className='w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2'/>
        {/* Phone */}
        <a className='flex text-[15px] font-poppins mb-3'>Phone</a>
        <input type="text" name="phone" id="" className='w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2'/>
        {/* Password */}
        <a className='flex text-[15px] font-poppins mb-3'>Password</a>
        <input type="password" name="password" id="" className='w-full px-2 py-2 shadow-md rounded-md text-[12px] font-medium mb-2'/>
        {/* Edit */}
        <Link type='submit' className='flex font-poppins bg-black w-full py-2 mt-4 mb-4 rounded-md justify-center text-white'>Edit Profile</Link>
      </form>
    </div>
   </div>
   </>
  )
}

export default ProfileAdm
