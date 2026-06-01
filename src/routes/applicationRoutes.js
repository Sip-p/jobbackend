import express from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { applyForJob, getAllapplications, getAllMyApplications, updateApplicationStatus,getCompanyApplications } from '../controllers/applicationController.js';
import { applicationCreationSchema, updateApplicationStatusSchema } from '../validations/applicationValidation.js';
const router = express.Router();

router.post("/apply/:jobId", isAuthenticated, validateRequest(applicationCreationSchema), applyForJob);
router.get("/my-applications", isAuthenticated, getAllMyApplications);

router.get("/:jobId/applicants", isAuthenticated, getAllapplications);
 router.patch("/update-status/:applicationId", isAuthenticated, validateRequest(updateApplicationStatusSchema), updateApplicationStatus);
// ✅ Recruiter sees all applications for their jobs
router.get("/company-applications", isAuthenticated, getCompanyApplications);
export default router;