import validator from'validator';
import bcrypt from'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from'../models/doctorModel.js';
import jwt from 'jsonwebtoken';

export const addDoctor = async (req, res) => {
    try {
      const { name, email, password, speciality, exprience, degree, about, fees, address } = req.body;
      const imageFile = req.file;
  
      console.log({ name, email, password, speciality, exprience, degree, about, fees, address }, imageFile);

      if(!name || !email || !password || !speciality || !exprience || !degree || !about || !fees || !address) {
        return res.json({ sucess:false, message: "All fields are required" });
      }
      
      if(!validator.isEmail(email)){
        return res.json({ sucess:false, message: "Please Enter the valid email" });
      }

      if(password.length<8){
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
        exprience,
        degree,
        about,
        fees,
        address:JSON.parse(address),
        date:Data.now()
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

  const loginAdmin = async (req,res)=>{
    try{
        const{email, password}= req.body
        if(email=== process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

          const token = jwt.sign(email+password, process.env.JWT_SECRET)

            res.status(200).json({sucess:true, message:"Admin Login Sucessfully",token})
        }else{
          res.json({sucess:false, message:"Invalid Email or Password"})
        }

    }catch(error){
      console.error(error);
      res.status(500).json({ sucess:false ,message: "Server Error", error: error.message });
    }
  } 

  export{loginAdmin};