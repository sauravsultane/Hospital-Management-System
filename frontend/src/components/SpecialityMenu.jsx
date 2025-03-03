import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
return (
    <div id='speciality' className='flex flex-col items-center gap-2 py-16 text-gray-800'>
            <h1 className='text-3xl font-medium'>
                Find by Speciality
            </h1>
            
            <p className='text-center sm:w-1/3 text-sm '>
                Simply browse from our extensive list of specialities to book an appointment in the hospital.
            </p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll '>
                {specialityData.map((item,index)=>(
                    <Link className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-300' key={index} to={`/doctors/${item.speciality}`}>
                        <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                        <p className='flex justify-center items-center'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
    </div>
)
}

export default SpecialityMenu
