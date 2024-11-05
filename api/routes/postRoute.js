import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import { createPost,deletePost, getPost, updatePost,  } from "../controllers/postController.js";

const router = express.Router();

router.post('/create',verifyToken,createPost)
router.delete('/delete/:postId/:id',  verifyToken, deletePost);
router.get('/get/:id' ,getPost)
router.post('/update/:id/:userId',verifyToken ,updatePost)
export default router;