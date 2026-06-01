import * as candidateProfileService from '../services/candidateProfileService.js';
export const getMyProfile = async (req, res) => {
    try {
        const profile = await candidateProfileService.getMyProfile(req.user.id);
        return res.status(200).json({ success: true, profile });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const completeMyProfile = async (req, res) => {
    try {
        const profile = await candidateProfileService.completeMyProfile(req.user.id, req.body);

        return res.status(200).json({ success: true, profile });
    } catch (error) {
        console.log("Error completing profile:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const updateMyProfile = async (req, res) => {
    try {
        const profile = await candidateProfileService.updateMyProfile(req.user.id, req.body);
        return res.status(200).json({ success: true, profile });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}