import validator from'validator';
import bcrypt from'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from'../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import authAdmin from '../middlewares/AuthAdmin.js';

export const addDoctor = async (req, res) => {
    try {
      const { name, email, password, speciality, experience, degree, about, fees, address } = req.body;
      const imageFile = req.file;
  
      console.log({ name, email, password, speciality, experience, degree, about, fees, address }, imageFile);

      if(!name || !email || !password || !speciality || !experience || !degree || !about || !fees || !address) {
        return res.json({ sucess:false, message: "All fields are required" });
      }
      
      if(!validator.isEmail(email)){
        return res.json({ sucess:false, message: "Please Enter the valid email" });
      }

      if(password.length<6){
        return res.json({sucess:false,message:"Enter Strong Password"})
      }

      //Hsshing Doctors Password

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);

      // Upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
      const imageUrl = imageUpload.secure_url;

      const doctorData={
        name,
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality,
        experience,
        degree,
        about,
        fees,
        address:JSON.parse(address),
        date:Date.now()
      }

      const newDoctor = new doctorModel(doctorData);
      await newDoctor.save();

      res.json({sucess:true, message:"Doctor Added Sucessfully",})


      res.status(200).json({ message: "Doctor received", data: req.body, image: imageFile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ sucess:false ,message: "Server Error", error: error.message });
    }
  };
  

  //API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

  export{loginAdmin};

// Get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { getAllDoctors };

// Change doctor availability
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        const doctor = await doctorModel.findById(docId);
        
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }
        
        doctor.available = !doctor.available;
        await doctor.save();
        
        res.json({ success: true, message: `Doctor ${doctor.available ? 'activated' : 'deactivated'} successfully` });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        // You'll need to import and use an appointment model here
        // For now, returning empty array
        res.json({ success: true, appointments: [] });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        // You'll need to import and use an appointment model here
        // For now, returning success
        res.json({ success: true, message: "Appointment cancelled successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get dashboard data
const getDashboardData = async (req, res) => {
    try {
        const totalDoctors = await doctorModel.countDocuments();
        const availableDoctors = await doctorModel.countDocuments({ available: true });
        
        const dashData = {
            totalDoctors,
            availableDoctors,
            totalAppointments: 0, // You'll need appointment model
            completedAppointments: 0, // You'll need appointment model
            totalEarnings: 0 // You'll need appointment model with fees
        };
        
        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { changeAvailability, getAllAppointments, cancelAppointment, getDashboardData };