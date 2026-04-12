import CandidateProfile from "../models/CandidateProfile.js"

export const completeMyProfile = async (userId, profileData) => {
    const profile = await CandidateProfile.create({
        userId,
        ...profileData
    })
    return profile;
}


export const getMyProfile = async (userId) => {
    const profile = await CandidateProfile.findOne({ userId });
    return profile;
}

export const updateMyProfile = async (userId, profileData) => {
    const profile = await CandidateProfile.findOneAndUpdate({ userId }, profileData, { new: true });
    return profile;
}
