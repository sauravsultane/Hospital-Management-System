import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-600 '> 
        <p>CONTACT <span className='text-gary-700 font-semibold'>US</span></p> 
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px] rounded-lg  ' src={assets.contact_image} alt="" />

        <div className='flex flex-col justify-center items-start gap-6  ' >
          <p className='font-semibold text-lg text-gray-600 ' >Our Office</p>
          <p className='text-gray-500' >Lorem ipsum dolor sit amet consectetur.</p>
          <p className='text-gray-500' >Tel:(+91) 918-45998 <br />Email:hospital@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600 '>Careers at PRESCRIPTO</p>
          <p className='text-gray-500'>Learning more about team and job opening.</p>
          <button className='border border-black px-10 py-4 text-sm hover:bg-black hover:text-white transition-all durattion-500 rounded-lg' >Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
