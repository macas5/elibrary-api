import express from 'express';
import { createUser, loginUser } from '../controllers/authController.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import {
  verifySessionTokenAdmin,
  verifySessionTokenUser,
} from '../utils/authCheck.js';
import sessionValidation from '../utils/sessionValidation.js';

const router = express.Router();

router.get('/login', loginUser);

router.post('/register', createUser);

router.get('/get/:id', sessionValidation, verifySessionTokenUser, getUserById);

router.put(
  '/update/:id',
  sessionValidation,
  verifySessionTokenUser,
  updateUser
);

router.get('/users', sessionValidation, verifySessionTokenAdmin, getAllUsers);

export default router;