import { Router } from "express";
import { AcceptFriendRequest, AddOrRemoveFriendRequest, FriendsPosts, sentFriendRequests, userFriendRequests, } from "../controllers/friend.js";
const router = Router();
router.put("/friends/:friendId/:userId", AddOrRemoveFriendRequest);
router.put("/friends/:requestId", AcceptFriendRequest);
router.get("/friends/requests/received/:userId", userFriendRequests);
router.get("/friends/requests/sent/:userId", sentFriendRequests);
router.get("/friends/:userId", FriendsPosts);
export default router;
