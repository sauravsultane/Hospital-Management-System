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

// import express from 'express';
// import { loginAdmin, addDoctor} from '../controllers/adminController.js';
// // import { changeAvailablity } from '../controllers/doctorController.js';
// import authAdmin from '../middlewares/AuthAdmin.js';
// import upload from '../middlewares/multer.js';
// const adminRouter = express.Router();

// adminRouter.post("/login", loginAdmin)
// adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
// // adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
// // adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
// // adminRouter.post("/change-availability", authAdmin, changeAvailablity)
// // adminRouter.get("/dashboard", authAdmin, adminDashboard)

// export default adminRouter;