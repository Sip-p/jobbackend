import * as applicationService from "../services/applicationService.js";
import { getJobById } from "./jobControllers";

export const applyForJob = async (req, res) => {
    try {
        const application = await applicationService.applyForJob(req.params.jobId, req.user.id)
        return res.status(201).json({ message: "Job applied successfully", application })
    } catch (error) {
        return res.status(500).json({ message: error.message });


    }
}

export const getApplicationById = async (req, res) => {
    try {
        const application = await applicationService.getApplicationById(req.body.applicationId)
        return res.status(200).json({ message: "Application fetched successfully", application })
    } catch (error) {

    }
}