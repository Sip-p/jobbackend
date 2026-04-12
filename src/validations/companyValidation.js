export const companyCreationSchema = z.object({
    name: z.string().min(3, "Company name must be atleast 3 char long"),
    description: z.string().min(10, "Description must be atleast 10 char long"),
    location: z.string().min(2, "Location is required"),
    website: z.string().url("Invalid website URL").optional(),

    logo: z.string().optional(),
    createdBy: z.string().min(1, "Created By is required")

})


