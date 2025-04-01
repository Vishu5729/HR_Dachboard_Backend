import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb.js'


import authRoutes from './route/authRoutes.js';
import  candidateRouter  from './route/candidateRoutes.js';
import  employeeRouter  from './route/employeeRoutes.js';
import attendanceRouter from './route/attendanceRoutes.js';
import  leaveRouter  from './route/leaveRoutes.js';

import { errorHandler } from './middleware/errorHandeller.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/leaves', leaveRouter);

// Error handler
app.use(errorHandler);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Try killing the process or using another port.`);
    process.exit(1);
  } else {
    throw err;
  }
});