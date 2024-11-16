import express from 'express';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import dotenv from 'dotenv';
import connection  from './db/connection.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

const app = express();
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Under Construction');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
  connection();
});