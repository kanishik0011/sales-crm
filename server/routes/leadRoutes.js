import express from 'express';
import { getAllLeads, createLead, updateLead, deleteLead } from '../controllers/leadController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getAllLeads);
router.post('/', auth, createLead);
router.put('/:id', auth, updateLead);
router.delete('/:id', auth, deleteLead);

export default router;
