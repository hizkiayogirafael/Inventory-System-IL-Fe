import React from 'react'
import logoPutih  from '../Assets/logoPutih.png'
import { Link } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { MdOutlineInventory2 } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";

const SidebarAdmin = () => {
  return (
    <>
    <div className='flex flex-col h-screen w-[17%] bg-white shadow-sm justify-between font-poppins fixed'>
        {/* Menubar */}
        <div className='flex flex-col w-full pt-10'>
            <Link className='flex justify-center' to="/DashboardAdmin"><img  src={logoPutih} className='flex w-[200px] justify-center' alt="Infinite Learning Indonesia"/></Link>
            <hr className='mx-10 mt-5'/>
            <Link className='mt-[50px] flex flex-row gap-3 text-[20px] px-10 mx-5 pb-2 items-center shadow-sm' to="/DashboardAdmin"><RxDashboard/>Dashboard</Link>
            <Link className='mt-[10px] flex flex-row gap-3 text-[20px] px-10 mx-5 pb-2 items-center shadow-sm' to="/InventoryAdm"><MdOutlineInventory2/>Inventory</Link>
            <Link className='mt-[10px] flex flex-row gap-3 text-[20px] px-10 mx-5 pb-2 items-center shadow-sm' to="/LoaningAdm"><MdOutlinePendingActions/>Loaning</Link>
            <Link className='mt-[10px] flex flex-row gap-3 text-[20px] px-10 mx-5 pb-2 items-center shadow-sm' to="/UserAdm">
            <LuUsers />User</Link>
            <Link className='mt-[10px] flex flex-row gap-3 text-[20px] px-10 mx-5 pb-2 items-center shadow-sm' to="/ProfileAdm"><CgProfile/>Profile</Link>
        </div>
        <div className='flex flex-col w-full pb-5'>
        <Link className='flex flex-row gap-3 text-[20px] px-10 mx-5 pb-2 items-center ' to='/'><TbLogout2/>Logout</Link>
        </div>
    </div>
    </>
  )
}

export default SidebarAdmin
