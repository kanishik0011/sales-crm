import express from 'express';
import { getAllFeedback, createFeedback, updateFeedback, deleteFeedback } from '../controllers/feedbackController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getAllFeedback);
router.post('/', auth, createFeedback);
router.put('/:id', auth, updateFeedback);
router.delete('/:id', auth, deleteFeedback);

export default router;
