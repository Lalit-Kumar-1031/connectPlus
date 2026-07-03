import express from "express";
import { followAndUnfollowUser, myProfile, userProfile } from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";


const userRouter = express.Router();

// My Profile Route
userRouter.get("/me",isAuth,myProfile);
userRouter.get("/:id",isAuth,userProfile);
userRouter.post("/follow/:id",isAuth,followAndUnfollowUser);

export default userRouter;