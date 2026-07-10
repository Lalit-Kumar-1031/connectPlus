import { Chat } from "../models/chatModel.js";
import { Messages } from "../models/messagesModel.js";

export const sendMessageController = async (req, res) => {

    try {

        const { receiverId, message } = req.body;

        if (!receiverId || !message) {
            return res.status(400).json({ message: "Provide required fields" });
        }
        let senderId = req.user._id;

        let chat = await Chat.findOne({
            users: { $all: [senderId, receiverId] }
        });

        // if chat not exist between those two users then create the new chat
        if (!chat) {
            chat = new Chat({
                users: [senderId, receiverId],
                latest: {
                    text: message,
                    sender: senderId
                }
            });

            await chat.save();
        }

        // now add new message 
        let newMessge = new Messages({
            chatId: chat._id,
            sender: senderId,
            text: message
        });

        await newMessge.save();

        // now update the lates message
        await chat.updateOne({
            latestMessage: {
                text: message,
                sender: senderId
            }
        });

        return res.json(newMessge);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all messages 
export const getAllMessagesController = async (req, res) => {
    try {

        let receiverId = req.params.id;
        let senderId = req.user._id;

        let chat = await Chat.findOne({
            users: { $all: [senderId, receiverId] }
        });

        if (!chat) {
            return res.status(404).json({ message: "Chat does not exist with these users" });
        }

        let allMessage = await Messages.find({ chatId: chat._id });

        return res.json(allMessage);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// get all chats
export const getAllChatsController = async (req, res) => {
    try {
        let chats = await Chat.find({
            users: req.user._id
        }).populate({
            path:"users",
            select:"name profilePic"
        });

        return res.json(chats);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}