import express from 'express';
import {isAuth} from '../middlewares/isAuth.js';
import { commentOnPostController, deletePostController, getAllPostsController, likeUnlikePostController, newPostController } from '../controllers/postController.js';
import uploadFile from '../middlewares/multer.js';

const postRouter= express.Router();

postRouter.post("/newPost",isAuth,uploadFile,newPostController);
postRouter.delete("/:id",isAuth,deletePostController);
postRouter.get("/all",isAuth,getAllPostsController);
postRouter.post("/likeUnlike/:id",isAuth,likeUnlikePostController);
postRouter.post("/comment/:id",isAuth,commentOnPostController);
postRouter.delete('/deleteComment',isAuth,deletePostController);

export default postRouter;