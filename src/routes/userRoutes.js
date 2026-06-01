import express from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { loginSchema, basicInfoSchema } from '../validations/userValidation.js';
import { registerUser, loginUser, logoutUser } from '../controllers/userControllers.js';
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { getCurrentUser } from "../controllers/userControllers.js";
const router = express.Router();

router.post("/signup", validateRequest(basicInfoSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);

router.get("/logout", logoutUser);
 router.get(
    "/me", isAuthenticated,
    getCurrentUser
);
export default router;

 

 