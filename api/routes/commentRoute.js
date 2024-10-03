import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {createComment,
        deleteComment,
        editComment,
        getStoryComments,
        getcomments,
        likeComment,} from '../controllers/commentController.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getStoryComments/:storyId', getStoryComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);


export default router;
