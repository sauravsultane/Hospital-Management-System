import { createContext, useMemo } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState({
  name: "",
  email: "",
  phone: "",
  address: { line1: "", line2: "" },
  gender: "",
  dob: "",
  image: "",
  
});


  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", { headers: { token } });

      if(data.success) {
        setUserData(data.userData);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    doctors,
    currencySymbol,
    //   getDoctorsData,
    setToken,
    token,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    
  };

  useEffect(() => {
    getDoctorsData();
  }, []);
  useEffect(()=>{
    if(token){
      loadUserProfileData()
    }else{
      setUserData(false);
    }

  },[token])

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
