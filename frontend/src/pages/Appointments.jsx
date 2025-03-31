import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'

const Appointments = () => {
  const {docId} = useParams()
  const {doctors} = useContext(AppContext)

  const [docInfo,setDocInfo] = useState(null)
  const [docSlot,setDocSlot] =useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState('')

  const fetchDocInfo = async ()=>{
    const docInfo = doctors.find(doc=> doc._id === docId)
    setDocInfo(docInfo)
    
  }

  const getAvailableSlot  = async ()=>{
    setDocSlot([])

    //getting current data

    let today = new Date()

    for(let i=0;i<7;i++){
      //getting date with index

      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+i)

      //setting end time of the date with index

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)

      endTime.setHours(21,0,0,0)

      //setting hours

      if(today.getDate()==currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      }
      else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while(currentDate<endTime){
        let formattedTime = currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
        // Add slot to array
        timeSlots.push({
          datetime:new Date(currentDate),
          time:formattedTime
        })

        //Inc Time by 30min
        currentDate.setMinutes(currentDate.getMinutes()+30)
      }
      setDocSlot(prev=>([...prev,timeSlots]))
    }
  }

  useEffect(()=>{

    fetchDocInfo()
  },[doctors,docId])
 
  useEffect(() => {
 
      getAvailableSlot()
    
  }, [docInfo])
  

  useEffect(()=>{
    console.log(docSlot);

  },[docSlot])

  return docInfo && (
    <div>
      {/* -------------------Doctors Deatiles --------------------------------------*/}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-indigo-500 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* Doc info ,name ,speciality, experience */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <div className='flex items-center gap-2 mt-1 text-sm text-gray-900 '>
            <p>
              {docInfo.degree}-{docInfo.speciality}
            </p>
            <button className='py-0.2 px-2 border text-xs rounded-full mt-1 border-gray-400'>{docInfo.experience}</button>
          </div>
          {/*--------------------------------- Doctor About--------------------------- */}

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />

            </p>

            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
              {docInfo.about}
            </p>
          </div>
          <p className='text-gray-500 mt-4 font-medium  '>
            Appointment fee : <span className='text-gray-600'>${docInfo.fees}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Appointments
