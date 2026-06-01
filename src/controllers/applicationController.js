import * as applicationService from "../services/applicationService.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
export const applyForJob = async (req, res) => {
    try {
        const application = await applicationService.applyForJob(
            req.params.jobId,
            req.user._id  // ✅ use _id consistently
        );
        return res.status(201).json({ 
            success: true,  // ✅ frontend checks this
            message: "Job applied successfully", 
            application 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const getAllapplications = async (req, res) => {
    try {
        const applications = await applicationService.getAllApplications(req.params.jobId);
        return res.status(200).json({ 
            success: true,
            message: "Applications fetched successfully", 
            applications 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllMyApplications = async (req, res) => {
    try {
        // ✅ Use service, not raw Application model
        // ✅ Use applicantId not applicant (matches your schema)
        const applications = await applicationService.getMyApplications(req.user._id);
        return res.status(200).json({ 
            success: true, 
            applications 
        });
    } catch (error) {
        console.log("Error fetching user applications:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const updatedApplication = await applicationService.updateApplicationStatus(
            req.params.applicationId, 
            req.body.status
        );
        return res.status(200).json({ 
            success: true,
            message: "Application status updated successfully", 
            updatedApplication 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getCompanyApplications = async (req, res) => {
    try {
        // Find all jobs posted by this company
        const jobs = await Job.find({ postedBy: req.user._id }).select('_id');
        const jobIds = jobs.map(j => j._id);

        // Find all applications for those jobs
        const applications = await Application.find({ jobId: { $in: jobIds } })
            .populate('jobId', 'title location jobType')
            .populate('applicantId', 'name email')
            .sort({ appliedAt: -1 });

        return res.status(200).json({ success: true, applications });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};