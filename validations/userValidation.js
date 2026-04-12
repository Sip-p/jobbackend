import { z } from 'zod'
const basicInfoSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be atleast 6char long"),
    role: z.enum(["candidate", "employer"], {
        errorMap: () => ({ message: "Role must be either candidate or employer" })
    })

})

export default basicInfoSchema;