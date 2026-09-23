import User from "../models/User.js"
import bcrypt from "bcryptjs"
import {generateAccessToken, generateRefreshToken} from "../utils/generateToken.js"


// Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({message : "Successfully register"});

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Login
export const loginUser = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      user.refreshToken = refreshToken;
      await user.save();
      
      res.cookie("jwt", refreshToken, {
        httpOnly : true,
        secure : true,
        sameSite : "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.json({
        user : {
          _id: user._id,
          role: user.role
        },
        accessToken
      })
    } else {
      res.status(401).json({ message: "Invalid email or password" })
    }

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//Log out user
export const logoutUser = async (req, res) => {
  const token = req.cookies.refreshToken
  if (!token) return res.sendStatus(204)

  const user = await User.findOne({ refreshToken: token })
  if (user) {
    user.refreshToken = null
    await user.save()
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  })

  res.sendStatus(204)
}


//Me
export const checkAuth = (req, res)=>{
  try {
    res.json(req.user)
  } catch (error) {
    res.json(error)
  }
}