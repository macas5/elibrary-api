import express from 'express';
import {
  createUser,
  loginUser,
  logoutUser,
} from '../controllers/authController.js';
import {
  getAllUsers,
  getOwnUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import {
  verifySessionTokenAdmin,
  verifySessionTokenUser,
} from '../utils/authCheck.js';
import sessionValidation from '../utils/sessionValidation.js';

const router = express.Router();

router.post('/login', loginUser);

router.post('/register', createUser);

router.post('/logout', logoutUser);

router.get('/get/:id', sessionValidation, verifySessionTokenUser, getUserById);

router.get('/getown', sessionValidation, getOwnUser);

router.put(
  '/update/:id',
  sessionValidation,
  verifySessionTokenUser,
  updateUser
);

router.get('/users', sessionValidation, verifySessionTokenAdmin, getAllUsers);

export default router;
