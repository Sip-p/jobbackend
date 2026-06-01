import Job from "../models/Job.js"
import User from "../models/User.js"; 
// export const createJobPosting = async (jobData, employerId) => {

//     const job = await Job.create({
//         ...jobData, postedBy: employerId
//     })
//     return job;
// }
// jobService.js
export const createJobPosting = async (jobData, employerId) => {
    const user = await User.findById(employerId);
    
    const job = await Job.create({
        ...jobData,
        postedBy: employerId,
        company: user.companyId  // ✅ this is what populate needs
    });
    return job;
}

export const getAllJobs = async (
    keyword,
    location,
    jobType,
    page = 1,
    limit = 10,
    sort,
    order
) => {

    page = Number(page);
    limit = Number(limit);

    const query = {};

    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { skills: { $regex: keyword, $options: "i" } }
        ];
    }

    if (location) {
        query.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
        query.jobType = jobType;
    }

    const sortOptions = {};

    if (sort) {
        sortOptions[sort] = order === "desc" ? -1 : 1;
    } else {
        sortOptions.createdAt = -1;
    }

   // jobService.js — update getAllJobs
const jobs = await Job.find(query)
  .populate('company', 'name logo location')  // ✅ get company name and logo
  .populate('postedBy', 'name email')          // ✅ get poster name
  .sort(sortOptions)
  .skip((page - 1) * limit)
  .limit(limit);

    const totalJobs = await Job.countDocuments(query);

    return {
        jobs,
        totalJobs,
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit)
    };
};

// export const getJobById = async (jobId) => {
//     const job = await Job.findById(jobId);
//     return job;
// }
export const getJobById = async (jobId) => {
    const job = await Job.findById(jobId)
        .populate('company', 'name email logo location website')  // ✅ get company details
        .populate('postedBy', 'name email');  // ✅ get poster details
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