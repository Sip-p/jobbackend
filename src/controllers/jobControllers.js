import * as jobService from "../services/jobService.js"
export const createJob = async (req, res) => {
    try {
        if (req.user.role !== 'employer') {
            return res.status(403).json({ message: "only employer can create job" })
        }
        if (!req.user.companyId) {
            return res.status(403).json({ message: "1st register your company" })
        }
        const job = await jobService.createJobPosting(req.body, req.user._id);
        return res.status(201).json({ message: "job created successfully", job })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobService.getAllJobs();
        return res.status(200).json({ message: "jobs fetched successfully", jobs })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getJobById = async (req, res) => {
    try {
        const job = await jobService.getJobById(req.params.id);
        return res.status(200).json({ message: "job fetched successfully", job })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateJob = async (req, res) => {
    try {
        const updatedJob = await jobService.updateJob(req.params.id, req.body);
        return res.status(200).json({ message: "Jobs updated successfully", updateJob });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteJob = async (req, res) => {
    try {
        const deletedJob = await jobService.deleteJob(req.params.id);
        return res.status(200).json({ message: "Job deleted successfully", deletedJob });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const changeJobStatus = async (req, res) => {
    try {
        const updatedJob = await jobService.changeJobStatus(req.params.id, req.body.status);
        return res.status(200).json({ message: "Job status changed successfully", updatedJob });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


