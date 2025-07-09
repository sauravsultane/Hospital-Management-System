import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import {v2 as cloudinary} from "cloudinary";
import jwt from "jsonwebtoken";
// API to register a ne User

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ sucess: true, token });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login user

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ sucess: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Api to get user Profile

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// API to update the user profile

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !gender || !dob) {
      return res
        
        .json({ success: false, message: "All fields are required" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address:JSON.parser(address),
      dob,
      gender,
       
    });

    if(imageFile){
      const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})

    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { registerUser, loginUser, getProfile };
