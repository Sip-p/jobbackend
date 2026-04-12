import mongoose from 'mongoose';
import Company from './Company.js';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }
    ,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["candidate", "employer"],
        default: "candidate",
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    }
})

export default mongoose.model("User", userSchema);