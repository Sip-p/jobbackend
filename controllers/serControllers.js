import { success } from "zod";
import { registerUserService } from "../services/userService.js";
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const user = await registerUserService(req.body);
        //created the jwt token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })

        //put that token inside the secure httponly cookie!
        res.cookie('token', token, {
            httpOnly: true,//js cant access it so hackers cant modify it
            maxAge: 7 * 25 * 60 * 60 * 1000

        })

        res.status(201).json({ success: true, message: "User registered successfully", user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}