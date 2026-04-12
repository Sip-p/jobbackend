import express from 'express'
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { candidateProfileSchema, updateCandidateProfileSchema } from '../validations/candidateprofileValidation.js';
import { completeMyProfile, getMyProfile, updateMyProfile } from '../controllers/candidateProfileController.js';
const router = express.Router();

router.get("/me", isAuthenticated, getMyProfile);
router.post("/complete-profile", isAuthenticated, validateRequest(candidateProfileSchema), completeMyProfile)
router.patch("/update-profile", isAuthenticated, validateRequest(updateCandidateProfileSchema), updateMyProfile)

export default router;