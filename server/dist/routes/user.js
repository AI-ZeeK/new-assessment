import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUser, updateProfilePicture } from "../controllers/user.js";
const router = express.Router();
router.get("/user/my/:id", getUser);
router.patch("/user/profile/:id", verifyToken, updateProfilePicture);
export default router;
