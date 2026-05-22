import express from 'express';
import { getAllCampaigns, createCampaign, updateCampaign, deleteCampaign } from '../controllers/campaignController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getAllCampaigns);
router.post('/', auth, createCampaign);
router.put('/:id', auth, updateCampaign);
router.delete('/:id', auth, deleteCampaign);

export default router;
