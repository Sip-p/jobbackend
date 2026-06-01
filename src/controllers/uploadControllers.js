import { uploadToCloudinary } from "../services/uploadService.js";
import CandidateProfile from "../models/CandidateProfile.js";

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log("FILE:", req.file);
        console.log("MIMETYPE:", req.file?.mimetype);
        console.log("ORIGINALNAME:", req.file?.originalname);

        const resumeUrl = await uploadToCloudinary(req.file, "resumes", "raw");

console.log("RESUME URL:", resumeUrl);
        const profile = await CandidateProfile.findOneAndUpdate(
            { userId: req.user._id },
            { resume: resumeUrl },
            { new: true, upsert: true }
        );
        

        res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            resume: resumeUrl,
            profile
        });
    } catch (error) {
        console.error("Error uploading resume:", error.message);
        res.status(500).json({ message: "Error uploading resume" });
    }
};

export const profilePictureUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Profile picture required" });
        }

        const imageUrl = await uploadToCloudinary(req.file, "profiles", "image"); // ✅ pass req.file

        const profile = await CandidateProfile.findOneAndUpdate(
            { userId: req.user._id },
            { profilePicture: imageUrl },
            { new: true, upsert: true }
        );

        res.status(200).json({
            success: true, 
            message: "Profile picture uploaded",
            profilePicture: imageUrl,
            profile
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};