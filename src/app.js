import express from 'express'
import cookieParser from 'cookie-parser';
import UserRoutes from './routes/userRoutes.js'
import JobRoutes from './routes/jobsRoutes.js'
import CompanyRoutes from './routes/companyRoutes.js'
import CandidateProfileRoutes from './routes/candidateProfileRoutes.js'
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', UserRoutes);
app.use('/api/profile', CandidateProfileRoutes)
app.use('/api/jobs', JobRoutes)
app.use('/api/company', CompanyRoutes)

export default app;
