import express from 'express';
import {isAuth} from '../middlewares/isAuth.js';
import { commentOnPostController, deleteCommentController, deletePostController, editPostCaptionController, getAllPostsController, likeUnlikePostController, newPostController } from '../controllers/postController.js';
import uploadFile from '../middlewares/multer.js';

const postRouter= express.Router();

postRouter.post("/newPost",isAuth,uploadFile,newPostController);
postRouter.delete('/deleteComment',isAuth,deleteCommentController);
postRouter.delete("/:id",isAuth,deletePostController);
postRouter.get("/all",isAuth,getAllPostsController);
postRouter.post("/likeUnlike/:id",isAuth,likeUnlikePostController);
postRouter.post("/comment/:id",isAuth,commentOnPostController);
postRouter.put("/:id",isAuth,editPostCaptionController);

export default postRouter;