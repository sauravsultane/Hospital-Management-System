import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors,currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();
  
  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');


  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlot = async () => {
    let today = new Date();
    let slots = []; // Store all slots first before updating state

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day+"-"+month+"-"+year;
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime)?false:true;

        if(isSlotAvailable){
           timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        }

        
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slots.push(timeSlots);
    }

    setDocSlot(slots); // Update state once after loop
  };

  const bookAppointment = async()=>{
    if(!token){
      toast.warn("login to book appointment");
      return navigate('/login');
    }
    try {
      const date = docSlot[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "-" + month + "-" + year;
      
      const {data} = await axios.post(backendUrl+"/api/user/book-appointment", {docId, slotDate, slotTime}, {headers: {token}});
      if(data.success){
        toast.success(data.message);
        getDoctorsData();
        return navigate('/my-appointments');

      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlot();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlot);
  }, [docSlot]);

  return (
    docInfo && (
      <div>
        {/* -------------------Doctors Details --------------------------------------*/}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-indigo-500 w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* Doc info ,name ,speciality, experience */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 mt-1 text-sm text-gray-900 ">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.2 px-2 border text-xs rounded-full mt-1 border-gray-400">
                {docInfo.experience}
              </button>
            </div>

            {/*--------------------------------- Doctor About--------------------------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>

              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 mt-4 font-medium">
              Appointment fee:{" "}
              <span className="text-gray-600">${docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/*------------------------------------ Booking slot -----------------------------*/}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slot</p>
          <div className="flex overflow-x-scroll mt-4  gap-3 items-center w-full ">
            {docSlot.length > 0 &&
              docSlot.map((item, index) => (
                <div onClick={()=>{setSlotIndex(index)}}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex == index
                      ? "bg-indigo-600 text-white"
                      : "border border-gray-400"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {
              docSlot.length && docSlot[slotIndex].map((item,index)=>(
                <p onClick={()=>{setSlotTime(item.time)}} className={`text-sm font-light flex-shrink-0 px-5 py-2 border rounded-full cursor-pointer ${item.time==slotTime ? 'bg-indigo-600 border-gray-400 text-white':'text-gray-400 border-gray-400'}`} key={index}>
                  {item.time.toLowerCase()}
                </p>
              ))
            }
          </div>
          <button onClick={bookAppointment} className="bg-indigo-600 text-white twxt-sm font-light px-14 py-3 my-6 rounded-full">Book an Appointment</button>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
      </div>
    )
  );
};

export default Appointments;
