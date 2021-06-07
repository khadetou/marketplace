import express from 'express';
import {subscribe} from '../controllers/customerController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.route('/:id/subscribe').post(authMiddleware, subscribe);


export default router;