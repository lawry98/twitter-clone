import express from 'express';
import { authmiddleware } from '../middleware/authmiddleware.js';
import { getProfile, follow, suggested, update } from '../controllers/user.js';

const router = express.Router();

router.get('/profile/:username', authmiddleware, getProfile);
router.post('/follow/:id', authmiddleware, follow);
router.get('/suggested', authmiddleware, suggested);
router.post('/update', authmiddleware, update);

export default router;