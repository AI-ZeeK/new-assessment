import express from "express";
const router = express.Router();
import { createPost, getUserPosts, deletePost, Like, getPosts, getPost, } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
// READ
router.get("/post", getPosts);
router.get("/post/users/:authorId", getUserPosts);
router.get("/post/user/:id", getPost);
router.post("/post", upload.single("image"), createPost);
router.delete("/post/:id", verifyToken, deletePost);
router.put("/post/:postId/:userId", verifyToken, Like);
export default router;
