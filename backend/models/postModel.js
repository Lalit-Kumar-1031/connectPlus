import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: String,
    post: {
        id: String,
        url: String,
    },
    type: {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    author:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    commets: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            name: {
                type: String,
                required: true
            },
            commet: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
})

export const Post = mongoose.model("Post", postSchema);