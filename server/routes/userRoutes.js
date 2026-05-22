import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);
router.post('/', auth, authorize('Executive Leadership', 'Sales Manager'), createUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, authorize('Executive Leadership'), deleteUser);

export default router;
