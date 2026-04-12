import { z } from 'zod';

export const basicInfoSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be atleast 6char long"),
    role: z.enum(["candidate", "employer"], {
        errorMap: () => ({ message: "Role must be either candidate or employer" })
    })
});

// export const completeProfileSchema = z.object({
//     name: z.string().min(3, "Name must be atleast 3 char long").optional(),
//     email: z.string().email("Invalid email address").optional(),
//     password: z.string().min(6, "Password must be atleast 6 char long").optional(),
//     role: z.enum(["candidate", "employer"], {
//         errorMap: () => ({ message: "Role must be either candidate or employer" })
//     }).optional(),
//     resume: z.string().optional(),
//     profilePicture: z.string().optional(),
//     bio: z.string().optional(),
//     skills: z.array(z.string()).optional(),
//     experience: z.array(z.object({
//     company: z.string(),
//     role: z.string(),
//     duration: z.string(),
//     description: z.string().optional()
//     })).optional(),
//     education: z.array(z.object({
//     instituteName: z.string(),
//      address: z.string().optional(),
//     degree: z.string(),
//     fieldOfStudy: z.string().optional(),
//     duration: z.string()
//     })).optional(),
//     projects: z.array(z.object({
//     title: z.string(),
//     description: z.string().optional(),
//     techStack: z.array(z.string()).optional(),
//     link: z.string().optional()
//     })).optional(),
//     preferences: z.object({
//     jobRole: z.string().optional(),
//     location: z.string().optional(),
//     expectedSalary: z.number().optional()
//     }).optional(),
//     availability: z.enum(["Open to Work", "Not Looking", "Internship"]).optional()



// })

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "password is required")

});
