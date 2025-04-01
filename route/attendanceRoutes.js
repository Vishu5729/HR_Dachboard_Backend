import express from 'express';
import { 
  markAttendance, 
  getAttendance, 
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  getAttendanceByEmployee 
} from '../controller/attendanceController.js';

const router = express.Router();

// Base routes
router.post('/', markAttendance);
router.get('/', getAttendance);

// Specific attendance routes
router.get('/:id', getAttendanceById);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

// Employee specific attendance
router.get('/employee/:employeeId', getAttendanceByEmployee);

export default router
