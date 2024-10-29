import express from "express";
import { deleteUser, updateUser,getUserPost} from "../controllers/userController.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();

router.delete('/delete/:id',verifyToken,deleteUser);
router.post('/update/:id',verifyToken,updateUser);
router.get('/posts/:id',verifyToken,getUserPost);

export default router;