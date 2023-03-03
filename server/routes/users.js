import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,

} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// get user
router.get("/:id", verifyToken, getUser);

// get user friends
router.get("/:id/friends", verifyToken, getUserFriends);

// add/remove friend
router.patch("/:id/friends", verifyToken, addRemoveFriend);

export default router;
