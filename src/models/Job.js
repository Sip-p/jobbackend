import mongoose from 'mongoose'
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    responsibilities: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true

    },
    jobType: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    applicants: {
        type: Array,
        default: []
    },


})

export default mongoose.model('Job', jobSchema)