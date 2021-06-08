import express from 'express';
import {getAllProducts, getProductById, createReview, getTopProducts} from '../controllers/productsController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/top').get(getTopProducts);
router.route('/:id/reviews').post(authMiddleware, createReview);
router.route('/:id').get(getProductById);

export default router;