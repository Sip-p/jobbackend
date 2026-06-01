import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserRoutes from './routes/userRoutes.js'
import JobRoutes from './routes/jobsRoutes.js'
import CompanyRoutes from './routes/companyRoutes.js'
import CandidateProfileRoutes from './routes/candidateProfileRoutes.js'
import ApplicationRoutes from './routes/applicationRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import morganMiddleware from './middlewares/morganMiddleware.js';

const app = express();

// ✅ CORS must be before routes
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);

app.use('/api/auth', UserRoutes);
app.use('/api/profile', CandidateProfileRoutes);
app.use('/api/jobs', JobRoutes);
app.use('/api/company', CompanyRoutes);
app.use('/api/applications', ApplicationRoutes);
app.use('/api/upload', uploadRoutes);

export default app;