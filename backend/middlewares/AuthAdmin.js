import jwt from 'jsonwebtoken'

//Admin Auth Middleware

export const authAdmin = async(req, res)=>{
    try {
        const atoken = req.headers.authorization.split(" ")[1];
        if(!atoken){
            return res.status(401).json({success:false, message:"Unauthorized Access"});
        }
        
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        if(decoded!== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(401).json({success:false, message:"Unauthorized Access"});
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message:"Server Error", error: error.message});
    }
}