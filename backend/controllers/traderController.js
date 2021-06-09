import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';
import {validationResult} from 'express-validator';


//@route  Post/api/products/trader
//@desc   Create a product
//access  Private isTrader

export const createProduct = asyncHandler(async(req, res)=>{
    //CHECK IF IMAGE AND PRICE ARE PRESENT
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    //CREATE AND UPDATE SECTION
    const {name, image, brand, category, description, rating, numReviews, price, countInStock} = req.body;

    
    const productField = {};
    productField.trader = req.trader.id;

    if(name) productField.name = name;
    if(image) productField.image = image;
    if(brand) productField.brand = brand;
    if(category) productField.category = category;
    if(description) productField.description = description;
    if(numReviews) productField.price = price;
    if(rating) productField.rating = rating;
    if(countInStock) productField.countInStock = countInStock;


    let product = await Product.findOne({trader: req.trader.id});
    product = new Product(productField);
    await product.save();
    res.json(product);
});


//@route    PUT/api/products/trader/:id
//@desc     Update product
//@access   Private isTrader

export const updateProduct = asyncHandler(async(req, res)=>{

    //CREATE AND UPDATE SECTION
    const {name, image, brand, category, description, rating, numReviews, price, countInStock} = req.body;

    let product = await Product.findById(req.params.id);


    if(product){
        product.name = name || product.name;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.description = description || product.description;
        product.rating = rating || product.rating;
        product.numReviews = numReviews || product.numReviews;
        product.price = price || product.price;
        product.countInStock = countInStock || product.countInStock;
    }else{
        res.send(404);
        throw Error('Product not found')
    }

    const updatedProduct =  await product.save();
    res.json(updatedProduct);
})


//@route  Get/api/products/trader/all
//@desc   Get the trader product
//@access Private isTrader

export const getAllTraderProducts = asyncHandler(async(req, res)=>{

    let products = await Product.find({trader: req.trader.id});

    res.json(products);
})


//@route    Get/api/products/trader/:id
//@desc     get The product by id 
//@access   Private isTrader

export const getTraderProductById = asyncHandler(async(req, res)=>{
    let product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404);
        throw Error('Product with that id not found');
    }
})

//@desc delete product 
//@route delete/api/products/trader/:id
//@access Private isTrader
export const deleteProduct = asyncHandler(async (req, res)=>{

    const product = await Product.findById(req.params.id);
    
    if(product){
        await product.remove();
        
        res.json({message:'Product removed'});
    }else{
        res.status(404);
        throw new Error('Product not found');
    }

});



