import { z } from "zod";
// ✅ Empty schema is fine for POST with no body validation
// but needs body wrapper for consistency
export const applicationCreationSchema = z.object({
    body: z.object({}).optional()
});
export const updateApplicationStatusSchema = z.object({
    body: z.object({  // ✅ add body wrapper
        status: z.enum(["applied", "accepted", "rejected"])
    })
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



