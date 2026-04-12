import { registerUserService, loginUserService } from "../services/userService.js";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const user = await registerUserService(req.body);
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: "7d" });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({ success: true, message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const loginUser = async (req, res) => {
    try {
        const user = await loginUserService(req.body);
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ success: true, message: "LoginSuccessfull", user })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const logoutUser = (req, res) => {
    // We destroy the cookie by replacing the token with an empty string and setting its lifespan to 0!
    res.cookie("token", "", {
        httpOnly: true,
        maxAge: 0
    });

    res.status(200).json({ success: true, message: "Logged out successfully." });
};
