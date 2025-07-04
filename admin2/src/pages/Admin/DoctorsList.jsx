import { useContext } from "react"
import React  from 'react'
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import axios from "axios";  


const DoctorsList = () => {
  const{ getAllDoctors, doctors, aToken } =useContext(AdminContext);
  useEffect(()=>{
    if(aToken){
      getAllDoctors()
    }
  },[aToken])
  return (
    <div>
      
    </div>
  )
}

export default DoctorsList
