import express from 'express';
import { createUser, loginUser } from '../controllers/authController.js';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/login', loginUser);

router.post('/register', createUser);

//dev routes
router.get('/users', getAllUsers);

export default router;
