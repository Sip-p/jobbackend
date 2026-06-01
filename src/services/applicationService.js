// import Application from "../models/Application.js";
// export const applyForJob = async (jobId, userId) => {
//     const application = await Application.create({
//         jobId,
//         applicantId: userId.populate("name email p"),
//         status: "applied",
//         appliedAt: new Date(),
//     })
//     return application;

// }



// export const updateApplicationStatus = async (applicationId, status) => {
//     const updatedApplication = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });
//     return updatedApplication;
// }

// export const getAllApplications = async (jobId) => {
//     const applications = await Application.find({ jobId });
//     return applications;
// }

// export const getMyApplications = async (userId) => {
//     const applications = await Application.find({ applicantId: userId });
//     return applications;
// }

// // export const deleteApplication = async (applicationId) => {
// //     const deletedApplication = await Application.findByIdAndDelete(applicationId);
// //     return deletedApplication;

// // }


import Application from "../models/Application.js";

export const applyForJob = async (jobId, userId) => {
    // ✅ Check if already applied
    const existing = await Application.findOne({ jobId, applicantId: userId });
    if (existing) throw new Error("You have already applied for this job");

    const application = await Application.create({
        jobId,
        applicantId: userId,  // ✅ just the id, no .populate()
        status: "applied",
        appliedAt: new Date(),
    });
    return application;
};

export const updateApplicationStatus = async (applicationId, status) => {
    const updatedApplication = await Application.findByIdAndUpdate(
        applicationId, 
        { status }, 
        { new: true }
    );
    return updatedApplication;
};

export const getAllApplications = async (jobId) => {
    const applications = await Application.find({ jobId })
        .populate('applicantId', 'name email');  // ✅ populate applicant details
    return applications;
};

export const getMyApplications = async (userId) => {
    const applications = await Application.find({ applicantId: userId })  // ✅ correct field name
        .populate('jobId', 'title location jobType salary status')  // ✅ populate job details
        .sort({ appliedAt: -1 });
    return applications;
};