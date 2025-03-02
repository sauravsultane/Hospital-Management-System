import React from 'react'
import {assets} from '../assets/assets'
import {NavLink} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img className='w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li className='py-1'>
            Home
            <hr className='border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden' />
          </li>
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1'>
            All Doctors 
            <hr className='border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden' />
          </li>
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>
            About 
            <hr className='border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden' />
          </li>
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1'>
            Contact 
            <hr className='border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden' />
          </li>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4 bg-blue-500 text-white rounded-full'>
        <button className='px-8 py-3 font-light cursor-pointer hidden md:block' >Create Account</button>
      </div>
    </div>
  )
}

export default Navbar
