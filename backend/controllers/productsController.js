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

//@desc Create new review
//@route post/api/products/:id/reviews
//@access private


export const createReview = asyncHandler(async (req, res)=>{

    
    let product  = await Product.findById(req.params.id)
    
    const {rating, comment } = req.body;

    if(product){
        const alreadyReviewed = product.reviews.find(r=>r.user.toString() === req.user.id.toString());
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }
        const review ={
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user.id
        }
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item)=>item.rating + acc, 0)/product.reviews.length;

        await product.save();

        res.status(201).json({message: 'Review added'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})