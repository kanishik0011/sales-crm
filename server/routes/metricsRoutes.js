import express from 'express';
import { getDashboardMetrics, getPerformanceMetrics } from '../controllers/metricsController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', auth, getDashboardMetrics);
router.get('/performance', auth, getPerformanceMetrics);

export default router;
