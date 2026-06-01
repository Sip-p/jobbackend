import { z } from 'zod';

// export const jobCreationSchema = z.object({
//     title: z.string().min(3, "Title must be at least 3 characters long"),
//     description: z.string().min(10, "Description must be at least 10 characters long"),
//     responsibilities: z.string().min(10, "Responsibilities must be at least 10 characters long"),
//     qualifications: z.string().min(5, "Qualifications must be at least 5 characters long"),
//     skills: z.string().min(2, "Skills must be provided"),
//     location: z.string().min(2, "Location is required"),
//     salary: z.number().positive("Salary must be a positive number"),
//     jobType: z.string().min(2, "Job Type is required"),
//     experience: z.string().min(1, "Experience level is required"),
// });

// validations/jobValidation.js
export const jobCreationSchema = z.object({
    body: z.object({  // ✅ add body wrapper
        title: z.string().min(3, "Title must be at least 3 characters long"),
        description: z.string().min(10, "Description must be at least 10 characters long"),
        responsibilities: z.string().min(10, "Responsibilities must be at least 10 characters long"),
        qualifications: z.string().min(5, "Qualifications must be at least 5 characters long"),
        skills: z.string().min(2, "Skills must be provided"),
        location: z.string().min(2, "Location is required"),
salary: z.coerce.number().positive("Salary must be a positive number"),
        jobType: z.string().min(2, "Job Type is required"),
        experience: z.string().min(1, "Experience level is required"),
    })
});

// export const getAllJobsSchema = z.object({
//     query: z.object({
//         keyword: z.string().optional(),
//         location: z.string().optional(),
//         jobType: z.string().optional(),

//         page: z.coerce.number().min(1).default(1),
//         limit: z.coerce.number().min(1).max(50).default(10),

//         sort: z.enum(["createdAt", "salary"]).optional(),
//         order: z.enum(["asc", "desc"]).optional()
//     })
// });

export const getAllJobsSchema = z.object({
    query: z.object({
        keyword: z.string().optional(),
        location: z.string().optional(),
        jobType: z.string().optional(),
        page: z.coerce.number().min(1).default(1),
        limit: z.coerce.number().min(1).max(50).default(10),
        sort: z.string().optional(),
        order: z.string().optional()
    }).optional()
});

export const getJobByIdSchema = z.object({
    params: z.object({
        id: z.string().min(1, "Job ID is required")

    })
})

export const updateJobSchema = z.object({
    params: z.object({
        id: z.string().min(1, "Job id is required")
    }),
    body: z.object({
        title: z.string().min(3, "Title must be atleast 3 char long").optional(),
        description: z.string().min(10, "Description must be atleast 10 char long").optional(),
        responsibilities: z.string().min(10, "Responsibilities must be atleast 10 char long").optional(),
        qualifications: z.string().min(5, "Qualifications must be atleast 5 char long").optional(),
        skills: z.string().min(2, "Skills must be provided").optional(),
        location: z.string().min(2, "Location is required").optional(),
        salary: z.number().positive("Salary must be a positive number").optional(),
        jobType: z.string().min(2, "Job Type is required").optional(),
        experience: z.string().min(1, "Experience level is required").optional(),
        status: z.enum(["open", "closed"]).optional(),
        applicants: z.array(z.string()).optional(),
        company: z.string().min(1, "Company ID is required").optional(),
        postedBy: z.string().min(1, "Posted By ID is required").optional(),
        postedAt: z.string().optional(),
        updatedAt: z.string().optional(),
    })

})

export const deleteJobSchema = z.object({
    params: z.object({
        id: z.string().min(1, "Job Id is required")
    })
})

export const changeJobStatusSchema = z.object({
    params: z.object({
        id: z.string().min(1, "Job Id is required")
    }),
    body: z.object({
        status: z.enum(["open", "closed"])
    })
})