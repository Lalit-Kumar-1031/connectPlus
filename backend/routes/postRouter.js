import express from 'express';
import {isAuth} from '../middlewares/isAuth.js';
import { deletePost, newPost } from '../controllers/postController.js';
import uploadFile from '../middlewares/multer.js';

const postRouter= express.Router();

postRouter.post("/newPost",isAuth,uploadFile,newPost);
postRouter.delete("/:id",isAuth,deletePost);

export default postRouter;