import express from "express";
import { createComment, getComments } from "../controllers/comment.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/comment", verifyToken, createComment);
router.get("/comment", getComments);

export default router;
