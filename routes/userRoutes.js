import express from 'express';
import { createUser, loginUser } from '../controllers/authController.js';
import { getAllUsers, updateUser } from '../controllers/userController.js';
import { verifySessionTokenUser } from '../utils/authCheck.js';
import sessionValidation from '../utils/sessionValidation.js';

const router = express.Router();

router.get('/login', loginUser);

router.post('/register', createUser);

router.put(
  '/update/:id',
  sessionValidation,
  verifySessionTokenUser,
  updateUser
);

//dev routes
router.get('/users', getAllUsers);

export default router;
