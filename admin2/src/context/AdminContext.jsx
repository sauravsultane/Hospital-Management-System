import React, { createContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {


    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):"")
    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const value = {
        aToken,
        setAToken,
        backendUrl,
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
            <ToastContainer />
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;