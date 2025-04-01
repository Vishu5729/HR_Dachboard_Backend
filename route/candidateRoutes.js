import express from 'express';
import { 
  createCandidate, 
  getCandidates, 
  updateCandidate,
  deleteCandidate,
  promoteCandidate,
} from '../controller/candidateController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Base route /api/candidates
router.post('/', upload.single('resume'), createCandidate);
router.get('/', getCandidates);

router.put('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);
router.post('/promote/:id', promoteCandidate);

export default router;
