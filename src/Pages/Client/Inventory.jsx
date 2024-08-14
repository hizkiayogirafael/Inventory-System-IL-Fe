import React from 'react'
import SidebarUser from '../../Components/SidebarUser'
import ndp2 from '../../Assets/ndp2.png'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";

const Inventory = () => {
  return (
    <>
   {/* Layout Utama */}
   <div className='w-screen h-screen bg-[#EAEAEA] flex flex-row'>
    <SidebarUser/>
    {/* Content Dashboard */}
    <div className='w-[82%] float-right flex flex-col ml-[19%] mr-10'>
      {/* Dashboard */}
      <div className='flex flex-row justify-between mt-8 font-poppins items-center'>
        <h1 className='text-black text-[25px] font-medium'>Inventory</h1>
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
      <div className='flex flex-row justify-between items-center'> 
        <h1 className='font-poppins text-[25px] font-medium my-5 '>Stock List</h1>
        <input type="text" name="" id="" placeholder='Search Item..' className='font-poppins h-[40px] px-4 rounded-xl shadow-md'/>        
      </div>
      {/* Inventory Table */}
      <div className='w-full font-poppins px-2 py-2  rounded-md shadow-md'>
        <table className='w-full'>
          <thead className='border-b '>
            <tr className=''>
              <th>No</th>
              <th>Name</th>
              <th>Supplier</th>
              <th>Buy Date</th>
              <th>Serial Number</th>
              <th>Quantity</th>
              <th>Ownership</th>
              <th>Status</th>
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
            </tr>
            <tr>
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

export default Inventory
