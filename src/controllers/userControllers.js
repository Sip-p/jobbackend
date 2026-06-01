import { registerUserService, loginUserService,getCurrentUserService } from "../services/userService.js";
import jwt from 'jsonwebtoken';
import Company from "../models/Company.js";
 import CandidateProfile from "../models/CandidateProfile.js";
 
// export const getCurrentUser = async (req, res) => {
//     try {

//         const user = await getCurrentUserService(
//             req.user._id
//         );

//         let profilecompleted = false;

//         if (user.role === "employer") {
//             const profile = await Company.findOne({
//                 createdBy: user._id
//             });

//             if (profile) {
//                 profilecompleted = true;
//             }
//         }

//         if (user.role === "candidate") {
//             const profile = await CandidateProfile.findOne({
//                 userId: user._id
//             });

//             if (profile) {
//                 profilecompleted = true;
//             }
//         }
// let company = null;

// if(user.role === "employer" && user.companyId){
//     company = await Company.findById(user.companyId);
// }
//        res.status(200).json({
//    success:true,
//    user,
//    company,
//    isProfileCompleted:profilecompleted
// })

//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

export const getCurrentUser = async (req, res) => {
    try {
        const user = await getCurrentUserService(req.user._id);
        let profilecompleted = false;
        let candidateProfile = null;  // ✅ add this
        let company = null;

        if (user.role === "employer") {
            const profile = await Company.findOne({ createdBy: user._id });
            if (profile) profilecompleted = true;
            if (user.companyId) {
                company = await Company.findById(user.companyId);
            }
        }

        if (user.role === "candidate") {
            candidateProfile = await CandidateProfile.findOne({ userId: user._id }); // ✅ fetch it
            if (candidateProfile) profilecompleted = true;
        }

        res.status(200).json({
            success: true,
            user,
            company,
            candidateProfile,  // ✅ send it to frontend
            isProfileCompleted: profilecompleted
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export const registerUser = async (req, res) => {
    try {
        const user = await registerUserService(req.body);
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: "7d" });

       res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
});
// let profilecompleted=false;
//  if(user.role==="employer"){
//     const profile=await Company.findOne({createdBy:user._id});
//     if(profile){
//         profilecompleted=true;
//     }
//  }
//  if(user.role==="candidate"){
//     const profile=await CandidateProfile.findOne({userId:user._id});
//     if(profile){
//         profilecompleted=true;
//     }
//  }

        res.status(201).json({ success: true, message: "User registered successfully", user,isProfileCompleted: false });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const loginUser = async (req, res) => {
    try {
        const user = await loginUserService(req.body);
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        let profilecompleted=false;
 if(user.role==="employer"){
    const profile=await Company.findOne({createdBy:user._id});
    if(profile){
        profilecompleted=true;
    }
 }
 if(user.role==="candidate"){
    const profile=await CandidateProfile.findOne({userId:user._id});
    if(profile){
        profilecompleted=true;
    }
 }
        res.status(200).json({ success: true, message: "LoginSuccessfull", user, isProfileCompleted: profilecompleted })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const logoutUser = (req, res) => {
    // We destroy the cookie by replacing the token with an empty string and setting its lifespan to 0!
   res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 0
});

    res.status(200).json({ success: true, message: "Logged out successfully." });
};


 