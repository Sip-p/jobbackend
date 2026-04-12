import { z } from "zod";



export const candidateProfileSchema = z.object({
    resume: z.string().url("Invalid URL").optional(),
    profilePicture: z.string().url("Invalid URL").optional(),
    bio: z.string().trim().min(10, "Bio must be at least 10 characters long"),

    skills: z.array(
        z.object({
            name: z.string().trim().min(1, "Skill name is required"),
            level: z.number().min(1).max(10).optional()
        })
    ).min(1, "At least one skill is required"),

    experience: z.array(z.object({
        company: z.string().trim().min(1, "Company name is required"),
        role: z.string().trim().min(1, "Role is required"),
        duration: z.string().trim().min(1, "Duration is required"),
        description: z.string().optional()
    })).optional(),

    education: z.array(z.object({
        instituteName: z.string().trim().min(1, "Institute name is required"),
        address: z.string().optional(),
        degree: z.string().trim().min(1, "Degree is required"),
        fieldOfStudy: z.string().optional(),
        duration: z.string().trim().min(1, "Duration is required")
    })).optional(),

    projects: z.array(z.object({
        title: z.string().trim().min(1, "Title is required"),
        description: z.string().optional(),
        techStack: z.array(z.string().trim()).optional(),
        link: z.string().url().optional()
    })).optional(),

    preferences: z.object({
        jobRole: z.string().trim().optional(),
        location: z.string().trim().optional(),
        expectedSalary: z.number().positive().optional()
    }).optional(),

    availability: z.enum(["Open to Work", "Not Looking", "Internship"]).optional()

}).strict();


export const updateCandidateProfileSchema = candidateProfileSchema.partial();

