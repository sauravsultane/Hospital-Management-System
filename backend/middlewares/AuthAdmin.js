// import jwt from 'jsonwebtoken'

// //Admin Auth Middleware

// export const authAdmin = async(req, res, next)=>{
//     try {
//         const atoken = req.headers.authorization.split(" ")[1];
//         if(!atoken){
//             return res.status(401).json({success:false, message:"Unauthorized Access"});
//         }
        
//         const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
//         if(decoded!== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
//             return res.status(401).json({success:false, message:"Unauthorized Access"});
//         }
//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({success:false, message:"Server Error", error: error.message});
//     }
// }
// import jwt from "jsonwebtoken";

// // admin authentication middleware
// const authAdmin = async (req, res, next) => {
//     try {

//         const { atoken } = req.headers;
//         if (!atoken) {
//             return res.json({ success: false, message: "Not Authorized Login Again" });
//         }
//         const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

//         if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             return res.json({ success: false, message: "Not Authorized Login Again" });
//         }

//         next();

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// export default authAdmin;

import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin;