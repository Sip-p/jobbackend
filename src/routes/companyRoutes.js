import express from 'express'
import { createCompany } from '../controllers/companyController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/create', isAuthenticated, createCompany);
export default router;