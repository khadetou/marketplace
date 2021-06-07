import express from 'express';
import {createProduct, updateProduct, getAllTraderProducts, getTraderProductById, deleteProduct} from '../controllers/traderController.js';
import authMiddleware, {isTrader} from '../middleware/auth.js';
import {check} from 'express-validator';

const router = express.Router();


router.route('/').post([authMiddleware, isTrader ,
    check('name', 'Name is required').not().isEmpty(),
    check('image', 'Image is required').not().isEmpty(),
    check('price','price is required').not().isEmpty()], createProduct);

router.route('/all').get(authMiddleware, isTrader, getAllTraderProducts);

router.route('/:id').put(authMiddleware, isTrader, updateProduct)
.get(authMiddleware, isTrader, getTraderProductById)
.delete(authMiddleware, isTrader, deleteProduct);




export default router;