import express from 'express';
import multer from 'multer';
import { uploadFile, deleteFile } from '../controllers/uploadController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and PDF allowed.'));
    }
  },
});

router.post('/', verifyToken, upload.single('file'), uploadFile);
router.delete('/:filename', verifyToken, deleteFile);

export default router;
