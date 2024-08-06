import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getStories, deleteStory, updateStory } from '../controllers/storiesController.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getstories', getStories);
router.delete('/deletestory/:storyId/:userId', verifyToken, deleteStory);
router.put('/updatestory/:storyId/:userId', verifyToken, updateStory);


export default router;