import Job from "../models/Job.js"
export const createJobPosting = async (jobData, employerId) => {

    const job = await Job.create({
        ...jobData, postedBy: employerId
    })
    return job;
}

export const getAllJobs = async () => {
    const jobs = await Job.find();
    return jobs;
}

export const getJobById = async (jobId) => {
    const job = await Job.findById(jobId);
    return job;
}

export const updateJob = async (jobId, jobData) => {
    const updatedJob = await Job.findByIdAndUpdate(jobId, jobData, { new: true });
    return updatedJob;
}

export const deleteJob = async (jobId) => {
    const deleteJob = await Job.findByIdAndDelete(jobId);
    return deleteJob;
}

export const changeJobStatus = async (jobId, status) => {
    const updatedJob = await Job.findByIdAndUpdate(jobId, { status }, { new: true });
    return updatedJob
}