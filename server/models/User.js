import mongoose from "mongoose";
import hashPassword from "../middleware/hashPassword.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin", "vendor", "tech"],
    default: "user"
  },
  refreshToken : String
  
}, { timestamps: true })

userSchema.pre("save", hashPassword);

export default mongoose.model("User", userSchema)