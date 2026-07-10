import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import {  getAllChatsController, getAllMessagesController, sendMessageController } from '../controllers/messageController.js';

const messageRouter=express.Router();

messageRouter.post("/",isAuth,sendMessageController)
messageRouter.get("/chats",isAuth,getAllChatsController);
messageRouter.get("/:id",isAuth,getAllMessagesController);

export default messageRouter;