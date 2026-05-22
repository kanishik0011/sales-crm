import express from 'express';
import { getAllOpportunities, createOpportunity, updateOpportunity, deleteOpportunity } from '../controllers/opportunityController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getAllOpportunities);
router.post('/', auth, createOpportunity);
router.put('/:id', auth, updateOpportunity);
router.delete('/:id', auth, deleteOpportunity);

export default router;
