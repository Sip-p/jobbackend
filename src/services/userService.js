import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export const registerUserService = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) {
        throw new Error("User already exists")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = await User.create({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
    })
    newUser.password = undefined;
    return newUser;
}

export const loginUserService = async (userData) => {
    if (!userData.email || !userData.password) {
        throw new Error("All feilds are required");
    }
    const user = await User.findOne({ email: userData.email });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    user.password = undefined;
    return user;
}

export const getCurrentUserService = async (userId) => {
    const user = await User.findById(userId)
        .select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};