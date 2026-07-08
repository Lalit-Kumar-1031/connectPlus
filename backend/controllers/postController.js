import { Post } from "../models/postModel.js";
import getDataUrl from "../utils/getDataUrl.js";
import cloudinary from 'cloudinary';

// Create New Post

export const newPost = async (req, res) => {

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
        res.status(500).json({ message: error.message });
    }
}

// Delete the Post
export const deletePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({message:"Post not found with this id"});
        }

        if(post.author.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"Unauthorized"});
        }

        // if post exist and logged in user and post auther are same the delete the post
        await cloudinary.v2.uploader.destroy(post.post.id);

        await post.deleteOne();

        res.json({message:"Post Deleted"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}