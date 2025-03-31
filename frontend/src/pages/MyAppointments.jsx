import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {AppContext} from '../context/AppContext'
const MyAppointments = () => {

  const {docId} = useParams()
  const {doctors} = useContext(AppContext)

  const [docInfo,setDocInfo] = useState(null)

  const fetchDocInfo = async ()=>{
    const docInfo = doctors.find(doc=> doc._id === docId)
    setDocInfo(docInfo)
    console.log(docInfo);
    
  }

  useEffect(()=>{

    fetchDocInfo()
  },[doctors,docId])


  return (
    <div>
      {/* -------------------Doctors Deatiles --------------------------------------*/}
      <div>
        <div>
          <img src={docInfo.img} alt="" />
        </div>
      </div>
    </div>
  )
}

export default MyAppointments
