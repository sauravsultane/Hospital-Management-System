import React, { useContext, useState } from "react";
import assets from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [experience, setExperience] = React.useState("1 Year");
  const [fees, setFees] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [speciality, setSpeciality] = React.useState("General Physician");
  const [degree, setDegree] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Please upload a doctor image");
      }

      const formData = new FormData();

      formData.append("docImg", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address1", JSON.stringify({line1:address1, line2:address2}));
      
      formData.append("about", about);

      formData.forEach((value, key)=>{
        console.log(`${key} : ${value}`) 
      })
      const [data] = await axios.post(backendUrl + 'admin/add-doctor', formData,{headers:{aToken}})

      if(data.sucess){
        toast.sucess("Doctor added successfully");
      }else{
        toast.error(data.message || "Failed to add doctor");
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-4 text-2xl font-semibold text-gray-800">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded-xl shadow-md w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Upload Image */}
        <div className="flex items-center gap-4 mb-6 text-gray-600">
          <label htmlFor="doc-img">
            <img
              className="w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer border"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-sm text-gray-500">
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <label className="block mb-1">Doctor Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1">Doctor Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1">Doctor Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1">Experience</label>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              required
              className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>{`${
                  i + 1
                } Year`}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Fees</label>
            <input
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              type="number"
              placeholder="Fees"
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1">Speciality</label>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              required
              className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Education</label>
            <input
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
              type="text"
              placeholder="Education"
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1">Address</label>
            <input
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              type="text"
              name="address1"
              placeholder="Address line 1"
              required
              className="w-full mb-2 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              type="text"
              name="address2"
              placeholder="Address line 2"
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1">About Doctor</label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              rows={5}
              placeholder="Write about doctor"
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition cursor-pointer duration-200"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
