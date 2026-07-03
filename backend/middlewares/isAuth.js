import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenData) {
      return res.status(400).json({ message: "Token Expired" });
    }

    req.user = await User.findById(tokenData.id);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
