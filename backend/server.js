import express from 'express'
import dotenv from 'dotenv';
import connectDB from './database/database.js';
import jobSeekerRouter from './routes/jobSeekerRoute.js';
import RecruiterRouter from './routes/recruiterRoute.js';
import cors from "cors";
import jobRoute from './routes/jobRoute.js';
import Applicationrouter from './routes/applicationRoutes.js';
import LoginRouter from './routes/LoginRoute.js';
import ProviderRouter from './routes/ProviderRoute.js';
import path from 'path'

dotenv.config();
const app = express();
// app.use(
//     cors({
//       origin: process.env.FRONTEND_URLSS, // Allow frontend URL from .env
//       credentials: true, // Allow cookies/session
//       methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
//     })
//   );

const __dirname=path.resolve();
// const allowedOrigins = process.env.FRONTEND_URRLS ? process.env.FRONTEND_URRLS.split(",") : [];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, origin || allowedOrigins[0]); // ✅ Allow request from origin
//       } else {
//         callback(new Error("CORS not allowed"));
//       }
//     },
//     credentials: true, // ✅ Allow cookies/session sharing
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow required headers
//   })
// );
app.use(cors({ origin: "*", credentials: true }));



  const PORT = process.env.PORT || 5000;
app.use(express.json()); 
app.use('/api/user',jobSeekerRouter)
app.use('/api/recruiter',RecruiterRouter)
app.use('/api/job',jobRoute)
app.use('/api/apply',Applicationrouter)
app.use('/api/auth',LoginRouter)
app.use('/api/authprovider',ProviderRouter)

app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


// Sample Route
app.get('/', (req, res) => {
    res.send('Database Server is Running');
});
// Start Server
app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`);
});
