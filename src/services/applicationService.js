export const applyForJob = async (jobId, userId) => {
    const application = await Application.create({
        jobId,
        userId,
        status: "applied",
        appliedAt: new Date(),
    })
    return application;

}

export const getApplicationById = async (applicationId) => {
    const application = await Application.findById(applicationId);
    return application;
}

export const updateApplicationStatus = async (applicationId, status) => {
    const updatedApplication = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });
    return updatedApplication;
}

export const getAllApplications = async (jobId) => {
    const applications = await Application.find({ jobId });
    return applications;
}

export const getMyApplications = async (userId) => {
    const applications = await Application.find({ userId });
    return applications;
}

export const deleteApplication = async (applicationId) => {
    const deletedApplication = await Application.findByIdAndDelete(applicationId);
    return deletedApplication;

}

