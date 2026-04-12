import express from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import basicInfoSchema from '../validations/userValidation.js';
import { registerUser } from '../controllers/serControllers.js';
const router = express.Router();

router.post("/signup", validateRequest(basicInfoSchema), registerUser);
router.post("/login",);
router.get("/me");
router.get("/logout",);

export default router;