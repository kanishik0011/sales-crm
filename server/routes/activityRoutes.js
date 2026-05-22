import express from 'express';
import { getAllActivities, createActivity, updateActivity, deleteActivity } from '../controllers/activityController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getAllActivities);
router.post('/', auth, createActivity);
router.put('/:id', auth, updateActivity);
router.delete('/:id', auth, deleteActivity);

export default router;
