import express from 'express';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import connection  from './db/connection.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Under Construction');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
  connection();
});