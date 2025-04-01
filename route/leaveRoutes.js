import express from 'express';
import { requestLeave, updateLeaveStatus, getApprovedLeaves, getAllLeaves } from '../controller/leaveController.js';
import { uploadDocument } from '../middleware/upload.js';


const router = express.Router();




// Base route /api/leaves
router.post('/', uploadDocument.single('document'), requestLeave);
router.get('/', getAllLeaves);
router.get('/approved', getApprovedLeaves);
router.put('/:id', updateLeaveStatus);

export default router;

