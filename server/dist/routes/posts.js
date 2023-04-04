import express from "express";
import { createPost, getUserPosts, deletePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
// READ
router.get("/post", getUserPosts);
router.post("/post", verifyToken, createPost);
router.delete("/post/:id", verifyToken, deletePost);
export default router;
