import express from 'express';
import * as resumeController from '../controllers/resumeController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ===== EXPERIENCE ROUTES =====
// Public routes
router.get('/experiences', resumeController.getAllExperiences);
router.get('/experiences/:id', resumeController.getExperience);

// Admin routes
router.post('/experiences', authenticate, isAdmin, resumeController.createExperience);
router.put('/experiences/:id', authenticate, isAdmin, resumeController.updateExperience);
router.delete('/experiences/:id', authenticate, isAdmin, resumeController.deleteExperience);

// ===== EDUCATION ROUTES =====
// Public routes
router.get('/education', resumeController.getAllEducation);

// Admin routes
router.post('/education', authenticate, isAdmin, resumeController.createEducation);
router.put('/education/:id', authenticate, isAdmin, resumeController.updateEducation);
router.delete('/education/:id', authenticate, isAdmin, resumeController.deleteEducation);

// ===== SKILLS ROUTES =====
// Public routes
router.get('/skills', resumeController.getAllSkills);

// Admin routes
router.post('/skills', authenticate, isAdmin, resumeController.createSkill);
router.put('/skills/:id', authenticate, isAdmin, resumeController.updateSkill);
router.delete('/skills/:id', authenticate, isAdmin, resumeController.deleteSkill);

// ===== CERTIFICATIONS ROUTES =====
// Public routes
router.get('/certifications', resumeController.getAllCertifications);

// Admin routes
router.post('/certifications', authenticate, isAdmin, resumeController.createCertification);
router.put('/certifications/:id', authenticate, isAdmin, resumeController.updateCertification);
router.delete('/certifications/:id', authenticate, isAdmin, resumeController.deleteCertification);

export default router;
