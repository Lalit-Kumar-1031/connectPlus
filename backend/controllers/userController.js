import { User } from "../models/userModel.js";
import getDataUrl from "../utils/getDataUrl.js";
import cloudinary from 'cloudinary';
import bcrypt from "bcryptjs";


export const myProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch Any User profile based on user id
export const userProfile = async (req, res) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

// Follow and Unfollow
export const followAndUnfollowUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    let loggedInUser = await User.findById(req.user._id);

    if (!user || !loggedInUser) {
      return res.status(404).json({ message: "No User Exist" });
    }

    // check user trying to follow yourself
    if (user._id.toString() === loggedInUser._id.toString()) {
      return res.status(400).json({ message: "You can not follow yourself" });
    }

    // unfollow case
    if (user.followers.includes(loggedInUser._id)) {
      let followingIndex = loggedInUser.followings.indexOf(user._id);
      let followerIndex = user.followers.indexOf(loggedInUser._id);

      //remove the id
      loggedInUser.followings.splice(followingIndex, 1);
      user.followers.splice(followerIndex, 1);

      await loggedInUser.save();
      await user.save();

      res.json({ message: "User UnFollowed" });
    } else {
      loggedInUser.followings.push(user._id);
      user.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await user.save();

      res.json({ message: "User Followed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Specific User Follower and Following Data
export const userFollowerAndFollowingData = async (req, res) => {
  try {
    let user = await User.findById(req.params.id).populate("followers followings");

    res.json({ followers: user.followers, followings: user.followings });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update User Profile
export const updateProfile = async (req, res) => {

  try {
    let user = await User.findById(req.user._id);

    const { name } = req.body;

    if (name) {
      user.name = name;
    }

    const file = req.file;

    if (file) {

      let fileUrl = getDataUrl(file);

      await cloudinary.v2.uploader.destroy(user.profilePic.id);
      let myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

      user.profilePic.id = myCloud.public_id;
      user.profilePic.url = myCloud.secure_url;

    }
    await user.save();

    res.json({ message: "Profile Updated" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Update Password
export const updatePassword = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    let comparePassword = await bcrypt.compare(oldPassword,user.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Please enter the correct old password" });
    }

    // hash the password and save
    let hashPassword= await bcrypt.hash(newPassword,12);

    user.password=hashPassword;
   await user.save();

   res.json({message:"Password Updated"});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}