import React, { useContext } from 'react'
import assets from '../assets/assets.js'
import { AdminContext } from '../context/AdminContext.jsx';
import {useNavigate} from 'react-router-dom'

const Navbar = () => {


    const { aToken} = useContext(AdminContext);
    const { setAToken} = useContext(AdminContext);

    const navigate = useNavigate('')

   console.log("Navbar aToken:", aToken);

   const logout =()=>{
    navigate('/')
    aToken && setAToken('')

    aToken && localStorage.removeItem('aToken')
   }

  return (

    <div className='flex justify-between items-center bg-white p-4 sm:px-10 py-5 border-b '>
      <div className='flex items-center gap-2 text-xs '>
        <img className='w-36 cursor-pointer ' src={assets.admin_logo} /> 
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 '>{aToken ? "Admin":"Doctor"}</p>

      </div>
      <button onClick={logout} className='cursor-pointer bg-[#5f6fff] text-white text-sm px-10 py-2 rounded-full'>LogOut</button>
    </div>
  )
}

export default Navbar
