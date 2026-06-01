import express from 'express'
import { createCompany  } from '../controllers/companyController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { companyProfileSchema } from '../validations/companyValidation.js';
import { validateRequest } from '../middlewares/validateRequest.js';
const router = express.Router();

// router.post('/post-job', isAuthenticated, createJob);
router.post('/complete-companyProfile', isAuthenticated, validateRequest(companyProfileSchema), createCompany);
export default router;