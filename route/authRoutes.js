import express from 'express';
import { login, register, updateProfile, logout } from '../controller/authController.js';
import upload from '../middleware/upload.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.put('/profile', upload.single('profileImage'), updateProfile);
router.post('/logout', logout);

export default router;
