import { Post } from "../models/postModel.js";
import { User } from "../models/userModel.js";
import getDataUrl from "../utils/getDataUrl.js";
import cloudinary from 'cloudinary';

// Create New Post

export const newPostController = async (req, res) => {

    try {
        const { caption } = req.body;
        const file = req.file;


        //convert file buffer to string base64 url
        const fileUrl = getDataUrl(file);

        // check user trying to post image or video
        let option;

        let type = req.query.type;

        if (type === "reel") {
            option = {
                resource_type: "video"
            }
        } else {
            option = {};
        }

        const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content, option);

        let post = await Post.create({
            caption,
            post: {
                id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            type,
            author: req.user._id,
        });

        res.status(201).json({
            message: "Post Created",
            post
        });

    } catch (error) {
        console.log("Error =>", error.message);
        res.status(500).json({ message: error.message });
    }
}

// Delete the Post
export const deletePostController = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found with this id" });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // if post exist and logged in user and post auther are same the delete the post
        await cloudinary.v2.uploader.destroy(post.post.id);

        await post.deleteOne();

        res.json({ message: "Post Deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Fetch All Posts
export const getAllPostsController = async (req, res) => {
    try {
        let posts = await Post.find({ type: "post" }).sort({ createdAt: -1 }).populate("author");
        let reels = await Post.find({ type: "reel" }).sort({ createdAt: -1 }).populate("author");
        res.json({ posts, reels })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Like Unlike Post Controller
export const likeUnlikePostController = async (req, res) => {
    try {

        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        let currentUserId = req.user._id.toString();

        // Like Unlike Logic
        if (post.likes.includes(currentUserId)) {

            // Method 1 Best
            post.likes.pull(currentUserId);

            // Method 2 Good
            // post.likes = post.likes.filter((userId) => userId.toString() !== currentUserId);

            //Method 3 Poor
            // let index=post.likes.indexOf(currentUserId);
            // post.likes.splice(index,1);

            await post.save();
            res.json({ message: "Post Unliked" });
        } else {
            post.likes.push(currentUserId);
            await post.save();

            res.json({ message: "Post Liked" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Comment on the post
export const commentOnPostController = async (req, res) => {
    try {
        const { comment } = req.body;

        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(400).json({ message: "Post not found" });
        }

        let user = await User.findById(req.user._id);

        post.comments.push({
            user: req.user._id,
            name: user.name,
            comment,
        });

        await post.save();

        res.json({ message: "Comment Added", post });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete Comment with comment id
export const deleteCommentController = async (req, res) => {
    try {
        console.log("Step 0");

        const { postId, commentId } = req.body;

        if (!postId || !commentId) {
            return res.status(400).json({ message: "Please provide post Id and commet Id" });
        }
        console.log("Step 1");
        let post = await Post.findById(postId);
        let currentUserId = req.user._id.toString();

        console.log("Step 2");

        if (!post) {
            return res.status(400).json({ message: "Post not found" });
        }

        let commentIndex = post.comments.findIndex((item) => item._id.toString() === commentId.toString());

        if (commentIndex === -1) { // no comment exist with that comment id
            return res.json({ message: "Comment not found" });
        }
        console.log("Step 3");

        let comment = post.comments[commentIndex];

        if (post.author.toString() === currentUserId || comment.user.toString() === currentUserId) {

            post.comments.splice(commentIndex, 1);
            await post.save();

            res.json({ message: "Comment deleted", post });

        } else {
            res.json({ message: "You dont have access to delete this comment" });
        }


    } catch (error) {
        console.log("Error in delete Comment ->", error.message);
        res.status(500).json({ message: error.message });
    }
}

// Edit Post Caption
export const editPostCaptionController = async (req, res) => {
    try {

        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        //check you are the owner of the post
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You dont have access to edit this post" });
        }

        post.caption = req.body.caption;
        await post.save();

        return res.json({ message: "Post Updated", post });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}