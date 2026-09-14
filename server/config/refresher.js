import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";


export const refreshTokenHandler = async (req, res) => {
  const token = req.cookies.jwt
 
  if(!token) return res.status(403).json({message: "No referesh token"});
  
  try{
    //Verify refresh token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    
    //Fetch the user from DB
    const user =  await User.findById(decoded.id).lean();

    if(!user) return res.status(403).json({message : "User not found"});
    
    const payload = {id: user._id.toString(), role: user.role}
    
    const refreshToken =  generateRefreshToken(user)

    user.refreshToken = refreshToken
    await user.save();

      // Set refresh cookie again
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true, // true in production
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    return res.json({
            accessToken : generateAccessToken(user),  
            user : payload
        })
    }
    catch(err){
        return res.status(403).json({ message: "Invalid refresh token" });
    }
}