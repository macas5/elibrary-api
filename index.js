import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectionToDb from './utils/connectToDb.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const port = 3001;

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/user', userRoutes);
app.use('/book', bookRoutes);

app.listen(port, () => {
  connectionToDb();
  console.log(`Server started on port ${port}`);
});
