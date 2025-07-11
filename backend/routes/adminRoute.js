import express from 'express';
import { addDoctor, loginAdmin, getAllDoctors, changeAvailability } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/AuthAdmin.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin, upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.get('/all-doctors', authAdmin, getAllDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);

export default adminRouter
