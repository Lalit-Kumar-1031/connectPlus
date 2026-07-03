import express from "express";
import uploadFile from "../middlewares/multer.js";
import { loginUser, logoutUser, registerUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", uploadFile, registerUser);
authRouter.post("/login",loginUser);
authRouter.get("/logout",logoutUser);

export default authRouter;
