import express from 'express';
import { validateRequest } from "../middlewares/validateRequest.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { jobCreationSchema, getAllJobsSchema, getJobByIdSchema, updateJobSchema, deleteJobSchema, changeJobStatusSchema } from "../validations/jobValidation.js";
import { createJob, getAllJobs, getJobById, updateJob, deleteJob, changeJobStatus } from "../controllers/jobControllers.js";

const router = express.Router();

router.post("/create", isAuthenticated, validateRequest(jobCreationSchema), createJob);
router.get("/all", validateRequest(getAllJobsSchema), getAllJobs);
router.get("/:id", validateRequest(getJobByIdSchema), getJobById);
router.put("/:id", isAuthenticated, validateRequest(updateJobSchema), updateJob);
router.delete("/:id", isAuthenticated, validateRequest(deleteJobSchema), deleteJob);
router.put("/:id/status", isAuthenticated, validateRequest(changeJobStatusSchema), changeJobStatus);

export default router;