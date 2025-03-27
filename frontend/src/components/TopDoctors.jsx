import React, { useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  
  const { doctors } = useContext(AppContext); 
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 8).map((item, index) => (
          <div
            onClick={() =>navigate(`/appointments/${item._id}`)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
            key={index}
          >
            <img
              className="bg-blue-50 w-full h-auto"
              src={item.image}
              alt={item.name}
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
        ))}
      </div>

      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        More
      </button>
    </div>
  );
};

export default TopDoctors;
