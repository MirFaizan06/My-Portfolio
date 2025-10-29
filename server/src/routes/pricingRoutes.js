import express from 'express';
import {
  getAllPricing,
  getPricingById,
  createPricing,
  updatePricing,
  deletePricing,
} from '../controllers/pricingController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllPricing);
router.get('/:id', getPricingById);

// Protected routes (admin only)
router.post('/', verifyToken, createPricing);
router.put('/:id', verifyToken, updatePricing);
router.delete('/:id', verifyToken, deletePricing);

export default router;
