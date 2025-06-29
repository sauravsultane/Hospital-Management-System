import React from 'react'
import Login from './pages/Login'
import AdminContextProvider from './context/AdminContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from './context/AppContext'

const App = () => {

  const {aToken} = useContext(AppContext);


  return aToken ?(
    <div>
      <ToastContainer/>
      
    </div>
  ): (
    <AdminContextProvider>
      <>
        <Login/>
        <ToastContainer/>
      </>
    </AdminContextProvider>
  )
}

export default App
