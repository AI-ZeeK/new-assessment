import express from "express";
import { createPost, getUserPosts, deletePost, Like, getPosts, getPost, } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
// READ
router.get("/post", getPosts);
router.get("/post/users/:authorId", getUserPosts);
router.get("/post/user/:id", getPost);
router.post("/post", verifyToken, createPost);
router.delete("/post/:id", verifyToken, deletePost);
router.put("/post/:postId/:userId", verifyToken, Like);
export default router;
