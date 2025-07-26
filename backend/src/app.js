import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { rateLimit } from 'express-rate-limit'

const app = express();
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(limiter)
if (process.env.NODE_ENV === 'development') {app.use(morgan('dev'))}

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

//Default / Route
app.get("/", (req, res) => {
  return res.json("Api is wokring")
})


app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

export default app;