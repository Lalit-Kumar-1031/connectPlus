import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/db.js";
import cloudinary from "cloudinary";

dotenv.config();

//Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Import Routers
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server Working...");
});

// Registering Router here
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
