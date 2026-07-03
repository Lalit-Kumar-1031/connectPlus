import { User } from "../models/userModel.js";
import getDataUrl from "../utils/getDataUrl.js";
import cloudinary from "cloudinary";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    const file = req.file;

    if (!name || !email || !password || !gender || !file) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const fileUrl = getDataUrl(file);

    //Hash the password
    const hashPassword = await bcrypt.hash(password, 12);

    //Upload on Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    // Now create the user
    user = await User.create({
      name,
      email,
      password: hashPassword,
      gender,
      profilePic: {
        id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    // Generate Token and ser in cookies
    generateToken(user._id, res);
    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id, res);

    res.json({
      message: "User login successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout Controller
export const logoutUser = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
