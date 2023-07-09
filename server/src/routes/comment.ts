import express from "express";
import {
  createComment,
  deleteComment,
  getComments,
  updatedComment,
} from "../controllers/comment.js";

import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.post("/comment", verifyToken, createComment);
router.delete("/comment/:id", verifyToken, deleteComment);
router.put("/comment/:id", verifyToken, updatedComment);
router.get("/comment", getComments);

export default router;
