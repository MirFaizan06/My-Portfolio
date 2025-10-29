import express from 'express';
import { getVersion, updateVersion } from '../controllers/versionController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getVersion);
router.post('/', verifyToken, updateVersion);

export default router;
