import express from "express";
import { deleteUser, updateUser} from "../controllers/userController.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();

router.delete('/delete/:id',verifyToken,deleteUser);
router.post('/update/:id',verifyToken,updateUser);

export default router;