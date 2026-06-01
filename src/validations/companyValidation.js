import { z } from 'zod';
export const companyCreationSchema = z.object({
    name: z.string().min(3, "Company name must be atleast 3 char long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be atleast 6 char long"),
    description: z.string().min(10, "Description must be atleast 10 char long"),
    location: z.string().min(2, "Location is required"),
    website: z.string().url("Invalid website URL").optional(),

    logo: z.string().optional(),
    createdBy: z.string().min(1, "Created By is required")

})


export const companyProfileSchema = z.object({
    body: z.object({
        name: z.string().min(3),
        description: z.string().min(10),
        location: z.string().min(2),
        website: z.string().url().optional(),
        logo: z.string().optional()
    })
});