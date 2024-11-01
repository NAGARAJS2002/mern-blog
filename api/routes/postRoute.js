import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import { createPost,deletePost } from "../controllers/postController.js";

const router = express.Router();

router.post('/create',verifyToken,createPost)
router.delete('/delete/:postId/:id',  verifyToken, deletePost);
export default router;