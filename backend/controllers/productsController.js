import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';

//@route    GET /api/products
//@desc     Get all products from the product database
//@access   Public

export const getAllProducts = asyncHandler(async(req, res)=>{

    let products = await Product.find({});

    res.json(products);
})

//@route   GET/api/products/:id
//@desc    Get the product by id 
//access   Public 
export const getProductById = asyncHandler(async(req, res)=>{
    
    let product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404);
        throw Error('Product with that id not found');
    }
})

