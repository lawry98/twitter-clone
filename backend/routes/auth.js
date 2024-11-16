import express from 'express';
import { signup, signin, signout, authenticate} from '../controllers/auth.js';
import { authmiddleware } from '../middleware/authmiddleware.js';
const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/authenticate', authmiddleware ,authenticate);

router.post('/signout', signout);

export default router;