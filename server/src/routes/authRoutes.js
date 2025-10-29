import express from 'express';
import { googleAuth, verifyAuth } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/google', googleAuth);
router.get('/verify', verifyToken, verifyAuth);

export default router;
