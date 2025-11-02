import express from 'express';
import { getServices, createService, updateService, deleteService } from '../controllers/servicesController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getServices);

// Protected routes (require authentication)
router.post('/', verifyToken, createService);
router.put('/:id', verifyToken, updateService);
router.delete('/:id', verifyToken, deleteService);

export default router;
