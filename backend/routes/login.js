import express from 'express';
import auth from '../middleware/auth.js';
import Trader from '../models/trader.js';
import asyncHandler from 'express-async-handler';
import {check, validationResult} from 'express-validator';
import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

//INITIALIZING OUR ROUTER
const router = express.Router();



//@route POST/api/login
//@desc login as trader
//@access public

router.post('/trader',[
                check('email','Enter a valid email').isEmail(),
                check('password', 'Password is required').exists()
], asyncHandler(async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password}= req.body;
    let trader = await Trader.findOne({email});

    //CHECK IF THE TRADER EXIST IN THE DATABASE 
    if(!trader){
        res.status(400).json({errors:[{msg: 'Invalid credentials'}]})
    }

    //CHECK IF THE PASSWORD EXIST
    const isMatch = await bcryptjs.compare(password, trader.password);
    if(!isMatch){
        res.status(400).json({errors:[{msg: 'Invalid credentials'}]})
    }

    
    //CHECK IF THE TRADER IS VERIFIED
    if(!trader.isVerified){
        res.status(400).json({msg: 'The email was not verified'})
    }


    //RETURN JSONWEBTOKEN
    const preload ={
        trader:{
            id: trader.id
        }
    }
    
    jsonwebtoken.sign(preload, process.env.JWST, {expiresIn: '1d'}, (err, token)=>{
        if(err) throw err;
        res.json({token})
    })
}))


export default router;