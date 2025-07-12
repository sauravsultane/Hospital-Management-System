import React, { useContext, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {

  const { speciality } =useParams()
  const [filterDoc,setFilterDoc] = useState([])
  const {doctors} =useContext(AppContext)
  const navigate = useNavigate();

  const [showFilter,setShowFilter] = useState(false)

  const applyFilter=()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc =>doc.speciality === speciality))
    }else{
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])

  return (
    <div>
      <p className='text-gray-600 '>Browse through the doctors speciality.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5  '>
        {/* Filter button removed */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex':'hidden sm:flex'}`}>
          <p onClick={()=>speciality ==='General Physician' ? navigate('/doctors'): navigate('/doctors/General Physician')} className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transiction-all cursor-pointer ${speciality === "General Physician" ? "bg-indigo-100 text": ""} `} >General Physician</p>
          <p onClick={()=>speciality ==='Gynecologist' ? navigate('/doctors'): navigate('/doctors/Gynecologist')} className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transiction-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text": ""} `} >Gynecologist</p>
          <p onClick={()=>speciality ==='Dermatologist' ? navigate('/doctors'): navigate('/doctors/Dermatologist')} className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transiction-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text": ""} `} >Dermatologist</p>
          <p onClick={()=>speciality ==='Pediatricians' ? navigate('/doctors'): navigate('/doctors/Pediatricians')} className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transiction-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text": ""} `} >Pediatricians</p>
          <p onClick={()=>speciality ==='Neurologist' ? navigate('/doctors'): navigate('/doctors/Neurologist')} className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transiction-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text": ""} `} >Neurologist</p>
          <p onClick={()=>speciality ==='Gastroenterologist' ? navigate('/doctors'): navigate('/doctors/Gastroenterologist')} className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transiction-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text": ""} `} >Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-col-auto gap-y-6w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {
            filterDoc.map((item, index) => (
              <div
                onClick={() =>navigate(`/appointments/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
                key={index}
              >
                <img
                  className="bg-blue-50 w-full h-auto"
                  src={item.image}
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full block"></span>
                    <p>Available</p>
                  </div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
