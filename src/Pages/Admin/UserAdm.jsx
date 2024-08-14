import React from 'react'
import ndp2 from '../../Assets/ndp2.png'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import SidebarAdmin from '../../Components/SidebarAdmin';
import { IoMdAddCircle } from "react-icons/io";

const UserAdm = () => {
  return (
    <>
      {/* Layout Utama */}
   <div className='w-screen h-screen bg-[#EAEAEA] flex flex-row'>
    <SidebarAdmin/>
    {/* Content Dashboard */}
    <div className='w-[82%] float-right flex flex-col ml-[19%] mr-10'>
      {/* Dashboard */}
      <div className='flex flex-row justify-between mt-8 font-poppins items-center'>
        <h1 className='text-black text-[25px] font-medium'>User Management</h1>
        <Link className='px-3 bg-black text-white font-poppins rounded-md'><CgProfile className='h-[30px]'/></Link>
      </div>
      {/* Header */}
      <div className='flex flex-row justify-between bg-black mt-5 h-[200px] rounded-[20px] items-center px-8'>
        <p className='text-white font-poppins w-[40%] text-[20px]'>Infinite Learning Indonesia Inventory System
        website-based is what is designed for
        managing stock of goods, loan process and
        returning goods, as well as monitoring the status of goods
        real-time.</p>
        <img src={ndp2} className='flex h-[170px]' alt="Infinite Learning Indonesia" />
      </div>
      <div className='flex flex-row justify-between items-center font-poppins'>
      <h1 className='font-poppins text-[25px] font-medium my-5 '>User List</h1>
      <Link className='bg-black text-white flex flex-row items-center gap-2 rounded-xl px-5 py-1 shadow-lg' to='/AddUser'>Add User<IoMdAddCircle />
      </Link>
      </div>
      {/* Inventory List */}
      <div className='w-full font-poppins px-2 py-2  rounded-md shadow-md'>
        <table className='w-full'>
          <thead className='border-b '>
            <tr className=''>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Nik</th>
              <th>Division</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-black'>
            <tr className=''>
              <td>adjiajd</td>
              <td>adjiajd</td>
              <td>adjiajd</td>
              <td>adjiajd</td>
              <td>adjiajd</td>
              <td>adjiajd</td>
              <td>adjiajd</td>
              <td>adjiajd</td>
            </tr>
            <tr>
              <td>adjiajd</td>
              <td>adjiajd</td>
              <td>adjiajd</td>
              <td>adjiajd</td>
              <td>adjiajd</td>
              <td>adjiajd</td>
              <td>adjiajd</td>
              <td>adjiajd</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   </div>
    </>
  )
}

export default UserAdm
