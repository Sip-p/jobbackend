import * as jobService from "../services/jobService.js"
// export const createJob = async (req, res) => {
//     try {
//         if (req.user.role !== 'employer') {
//             return res.status(403).json({ message: "only employer can create job" })
//         }
//         if (!req.user.companyId) {
//             return res.status(403).json({ message: "1st register your company" })
//         }
//         const job = await jobService.createJobPosting(req.body, req.user._id);
//         return res.status(201).json({ message: "job created successfully", job })
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// }

export const createJob = async (req, res) => {
    try {
        if (req.user.role !== 'employer') {
            return res.status(403).json({ 
                success: false, 
                message: "Only employer can create job" 
            });
        }
        if (!req.user.companyId) {
            return res.status(403).json({ 
                success: false, 
                message: "Please register your company first" 
            });
        }
        const job = await jobService.createJobPosting(req.body, req.user._id);
        return res.status(201).json({ 
            success: true,  // ✅ frontend checks this
            message: "Job created successfully", 
            job 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const { keyword, location, jobType, page, limit, sort, order } = req.query;
        const jobs = await jobService.getAllJobs(keyword, location, jobType, page, limit, sort, order);
        return res.status(200).json({ 
            success: true,  // ✅ Added success flag
            message: "jobs fetched successfully", 
            jobs: jobs.jobs,
            totalJobs: jobs.totalJobs,
            currentPage: jobs.currentPage,
            totalPages: jobs.totalPages
        })
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        })
    }
}

// export const getJobById = async (req, res) => {
//     try {
//         const job = await jobService.getJobById(req.params.id);
//         return res.status(200).json({ 
//             success: true, 
//             message: "job fetched successfully", 
//             job 
//         })
//     } catch (error) {
//         return res.status(500).json({ 
//             success: false, 
//             message: error.message 
//         })
//     }
// }
export const getJobById = async (req, res) => {
    try {
        const job = await jobService.getJobById(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        return res.status(200).json({ 
            success: true,  // ✅ frontend checks this
            message: "Job fetched successfully", 
            job 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const updateJob = async (req, res) => {
    try {
        const updatedJob = await jobService.updateJob(req.params.id, req.body);
        return res.status(200).json({ 
            success: true, 
            message: "Jobs updated successfully", 
            job: updatedJob 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        })
    }
}

export const deleteJob = async (req, res) => {
    try {
        const deletedJob = await jobService.deleteJob(req.params.id);
        return res.status(200).json({ 
            success: true, 
            message: "Job deleted successfully", 
            job: deletedJob 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        })
    }
}

export const changeJobStatus = async (req, res) => {
    try {
        const updatedJob = await jobService.changeJobStatus(req.params.id, req.body.status);
        return res.status(200).json({ 
            success: true, 
            message: "Job status changed successfully", 
            job: updatedJob 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        })
    }
}


