import express from 'express';
import { getEmployees, getEmployeeById, updateEmployee, deleteEmployee ,updateEmployeeAttendance} from '../controller/employeeController.js';

const router = express.Router();
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.put("/attendance/:id", updateEmployeeAttendance);

export default router;
