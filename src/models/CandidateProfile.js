import mongoose from 'mongoose';

const candidateProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    resume: {
        type: String,  
        required: true,
    },

    profilePicture: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        required: true,
    },

    skills: [
        {
            name: { type: String, required: true },
            level: { type: Number, min: 1, max: 10 } // optional improvement
        }
    ],

    experience: [
        {
            company: { type: String, required: true },
            role: { type: String, required: true },
            duration: { type: String, required: true },
            description: { type: String }
        }
    ],

    education: [
        {
            instituteName: { type: String, required: true },
            address: { type: String },
            degree: { type: String, required: true },
            fieldOfStudy: { type: String },
            duration: { type: String, required: true }
        }
    ],

    projects: [
        {
            title: { type: String, required: true },
            description: { type: String },
            techStack: [{ type: String }],
            link: { type: String }
        }
    ],

    preferences: {
        jobRole: { type: String },
        location: { type: String },
        expectedSalary: { type: Number }
    },

    availability: {
        type: String,
        enum: ["Open to Work", "Not Looking", "Internship"],
        default: "Open to Work"
    }

}, {
    timestamps: true
});

export default mongoose.model('CandidateProfile', candidateProfileSchema);