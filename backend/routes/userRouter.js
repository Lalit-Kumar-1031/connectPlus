import express from "express";
import { followAndUnfollowUser, myProfile, updatePassword, updateProfile, userFollowerAndFollowingData, userProfile } from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";


const userRouter = express.Router();

// My Profile Route
userRouter.get("/me",isAuth,myProfile);
userRouter.get("/:id",isAuth,userProfile);
userRouter.put("/updateProfile",isAuth,uploadFile,updateProfile);
userRouter.post("/updatePassword",isAuth,updatePassword);
userRouter.post("/follow/:id",isAuth,followAndUnfollowUser);
userRouter.get("/followData/:id",isAuth,userFollowerAndFollowingData);

export default userRouter;