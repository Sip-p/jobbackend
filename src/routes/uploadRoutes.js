 import { isAuthenticated } from "../middlewares/authMiddleware.js";
 import { uploadResume,profilePictureUpload } from "../controllers/uploadControllers.js";
 import { upload } from "../middlewares/uploadMiddleware.js";
import express from 'express';
const router = express.Router();
 
 
 

 
router.post("/resume", isAuthenticated,upload.single("resume"), uploadResume);
router.post("/profile-picture", isAuthenticated,upload.single("profilePicture"), profilePictureUpload);
 
export default router;