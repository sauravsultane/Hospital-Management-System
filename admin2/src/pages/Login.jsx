import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAToken, backendUrl } = useContext(AdminContext);

  // Add fallback for when context is not available
  if (!backendUrl) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Configuration Error</h2>
          <p className="text-gray-600">Backend URL is not configured. Please check your environment variables.</p>
        </div>
      </div>
    );
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl+'/api/admin/login', { email, password });
        console.log("API response:", data);
        if (data.success) {
          console.log("Token:", data.token);
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
        }else{
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl+'/doctor/login', { email, password });
        if (data.success) {
          console.log(data.token);      
        }
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-[#5F6FFF]">{state}</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input autoComplete="off" onChange={(e)=>setEmail(e.target.value)} value={email} className="border border-[#dadada] rounded w-full p-2 mt-1" type="email" required />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input autoComplete="off" onChange={(e)=>setPassword(e.target.value)} value={password} className="border border-[#dadada] rounded w-full p-2 mt-1" type="password" required />
        </div>
        <button className="bg-[#5f6fff] text-white w-full py-2 rounded-md text-base cursor-pointer">Login</button>

        { 
          state === "Admin" ? 
          <p>Doctor Login? <span className="text-[#5f6fff] underline cursor-pointer" onClick={()=>setState('Doctor')}>Click here</span></p>
          :<p>Admin Login? <span className="text-[#5f6fff] underline cursor-pointer" onClick={()=>setState('Admin')}>Click here</span></p>

        }
      </div>
    </form>
  );
};

export default Login;
