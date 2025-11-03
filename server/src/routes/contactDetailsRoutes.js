import express from 'express';
import { getContactDetails, updateContactDetails } from '../controllers/contactDetailsController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getContactDetails);
router.put('/', verifyToken, updateContactDetails);

export default router;
