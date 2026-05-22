import express from 'express';
import { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from '../controllers/customerController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getAllCustomers);
router.get('/:id', auth, getCustomerById);
router.post('/', auth, createCustomer);
router.put('/:id', auth, updateCustomer);
router.delete('/:id', auth, deleteCustomer);

export default router;
