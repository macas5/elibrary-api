import express from 'express';
import {
  createBook,
  deleteBookById,
  getAllBooks,
  updateBookById,
} from '../controllers/bookController.js';
import { verifySessionTokenAdmin } from '../utils/authCheck.js';
import sessionValidation from '../utils/sessionValidation.js';

const router = express.Router();

router.get('/get', getAllBooks);

router.post('/new', sessionValidation, verifySessionTokenAdmin, createBook);

router.delete(
  '/delete/:id',
  sessionValidation,
  verifySessionTokenAdmin,
  deleteBookById
);

router.put(
  '/update/:id',
  sessionValidation,
  verifySessionTokenAdmin,
  updateBookById
);

export default router;
