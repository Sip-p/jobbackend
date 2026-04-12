import bcrypt from 'bcryptjs'
import User from '..User.js'
import { email } from 'zod'

export const registerUserService = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) {
        throw new Error("User already exists")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedaPassword = await bcrypt.hash(userData.password, salt);

    const newUser = await User.create({
        name: userData.name,
        email: userData.email,
        password: hashedaPassword,
        role: userData.role
    })
    newUser.password = undefined;
    return newUser;
}
