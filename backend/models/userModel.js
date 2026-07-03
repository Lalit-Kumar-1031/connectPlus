import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    profilePic: {
      id: String,
      url: String,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
