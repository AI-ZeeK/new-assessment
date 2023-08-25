import express from "express";
const router = express.Router();

import {verifyToken} from "../middleware/auth.js";
import {getUser, updateProfilePicture} from "../controllers/user.js";
import {verifyUserCookie} from "../middleware/cookie.js";
import {updateBio} from "../controllers/auth.js";
import {upload} from "../middleware/multer.js";

router.get("/user/my/:id", getUser);
router.patch("/user/bio/:id", verifyToken, updateBio);
router.patch(
  "/user/profile/:id",
  upload.single("profilePhoto"),
  updateProfilePicture
);

export default router;
