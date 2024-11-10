import express from 'express';
import { signup, signin, logout, login } from '../controllers/auth.js';
const router = express.Router();

router.get('/signup', signup);

router.get('/signin', signin);

router.get('/login', login);

router.get('/logout', logout);

export default router;