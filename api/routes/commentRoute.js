import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, getStoryComments } from '../controllers/commentController.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getStoryComments/:storyId', getStoryComments)

export default router;
