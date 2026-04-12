import { z } from "zod";
export const applicationCreationSchema = z.object({
    jobId: z.string().min(1, "Job Id is required"),
    userId: z.string().min(1, "User Id is required"),
    status: z.enum(["applied", "accepted", "rejected"]).default("applied"),
    appliedAt: z.date().default(new Date()),

})



export const getApplicationByIdSchema = z.object({
    id: z.string().min(1, "Application Id is required"),
});

export const updateApplicationStatusSchema = z.object({
    id: z.string().min(1, "Application Id is required"),
    status: z.enum(["applied", "accepted", "rejected"]),
    updatedAt: z.date().default(new Date()),
});

export const getAllApplicationsSchema = z.object({
    jobId: z.string().min(1, "Job Id is required"),
})
export const getMyApplicationsSchema = z.object({
    userId: z.string().min(1, "User Id is required"),
})
export const deleteApplicationSchema = z.object({

    id: z.string().min(1, "Application Id is required"),

})



