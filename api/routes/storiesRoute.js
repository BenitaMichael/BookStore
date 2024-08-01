import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getStories } from '../controllers/storiesController.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getstories', getStories)

export default router;