import express from 'express';
import {check, validationResult} from 'express-validator';
import Trader from '../models/trader.js';
import Customer from '../models/customer.js';
import {sendEmailToConfirm} from '../controllers/validationEmail.js';
import asyncHandler from 'express-async-handler';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';


//INITIALIZING OUR ROUTER
const router = express.Router();

//@route Post/api/register/trader
//@desc trader registering
//@access Public

router.post('/trader', [
    check('firstName', 'Le prenom est obligatoire').not().isEmpty(),
    check('lastName', 'Le nom de famille est obligatoire').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('storeName', 'Le nom de votre boutique est obligatoire').not().isEmpty(),
    check('password', 'Enter a password with 6 or more characters').isLength({min:6})],
    async(req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {firstName, email,  lastName, storeName, password} = req.body;

        try {
            //SEE IF TRADER EXIST
            let trader = await Trader.findOne({email});
            if(trader){
                res.status(400).json({errors:[{msg: 'Cette email exist deja !'}]});
            }
            

            trader = new Trader({
                firstName,
                lastName,
                email,
                storeName,
                password
            })

            //ENCRYPT PASSWORD
            const salt = await bcryptjs.genSalt(10);
            trader.password = await bcryptjs.hash(password, salt);

            sendEmailToConfirm(trader, req, res, 'trader','checkemail');
            await trader.save();

          

        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error')
        }
    }
)
//@route Post/api/register/customer
//@desc trader registering
//@access Public

router.post('/customer', [
    check('firstName', 'Le prenom est obligatoire').not().isEmpty(),
    check('lastName', 'Le nom de famille est obligatoire').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Enter a password with 6 or more characters').isLength({min:6})],
    async(req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {firstName, email,  lastName,  password} = req.body;

        try {
            //SEE IF TRADER EXIST
            let customer = await Customer.findOne({email});
            if(customer){
                res.status(400).json({errors:[{msg: 'Cette email exist deja !'}]});
            }
            

            customer = new Customer({
                firstName,
                lastName,
                email,
                password
            })

            //ENCRYPT PASSWORD
            const salt = await bcryptjs.genSalt(10);
            customer.password = await bcryptjs.hash(password, salt);

            sendEmailToConfirm(customer, req, res,'customer', 'checkemail')
            await customer.save();

          

        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error')
        }
    }
)



//@route get/api/register/checkmail/trader
//@access get trader email 
//@access private

router.get('/checkemail/trader', asyncHandler(async (req, res)=>{
    let trader = await Trader.findOne({emailToken: req.query.token});

    if(!trader){
        res.status(400).json({msg:'Something went wrong contact us for more assistance'});
    }

    // await User.remove(user);
    trader.isVerified = true,
    trader.emailToken = null
    await trader.save();

    res.status(201).json({msg:"Votre email a ete verifié avec success"})
}))

//@route get/api/register/checkmail/customer
//@access get cutomer email 
//@access private

router.get('/checkemail/customer', asyncHandler(async (req, res)=>{

    let cutomer = await Customer.findOne({emailToken: req.query.token});
    if(!cutomer){
        res.status(400).json({msg:'Your confirmation mail has expired, register to get a new one'});
    }

    // await User.remove(user);
    cutomer.isVerified = true,
    cutomer.emailToken = null
    await cutomer.save();

    res.status(201).json({msg:"Votre email a ete verifié avec success"})
}))




//@route Post/api/register/trader/email
//@desc  Reset the trader password if forgotten
//access Public

router.post('/trader/email', asyncHandler(async (req, res)=>{

    let trader = await Trader.findOne({email: req.body.email});
 
    if(!trader){
        res.status(422).json({error: "Any user don't exist with that email!"})
    }

    sendEmailToConfirm( trader,req, res, 'trader', 'reset');
    await trader.save();
}))


//@route Post/api/register/customer/email
//@desc  Reset the customer password if forgotten
//access Public

router.post('/customer/email', asyncHandler(async (req, res)=>{

    let customer = await Customer.findOne({email: req.body.email});
 
    if(!customer){
        res.status(422).json({error: "Any user don't exist with that email!"})
    }

    sendEmailToConfirm( customer,req, res, 'customer', 'reset');
    await customer.save();
}))



//@route Get/api/register/reset/trader
//desc   Get to the page where we should reset our password
//access Private

router.get('/reset/trader', asyncHandler(async(req, res)=>{

    let trader = await Trader.findOne({emailToken: req.query.token, expires:{$gt: Date.now()}});
   
    if(!trader ){
        res.status(400).json({msg:'Wrong token or it has expired'});
    }

    res.json(trader)
}));


//@route Get/api/register/reset/customer
//desc   Get to the page where we should reset our password
//access Private

router.get('/reset/customer', asyncHandler(async(req, res)=>{

    let customer = await Customer.findOne({emailToken: req.query.token, expires:{$gt: Date.now()}});
   
    if(!customer ){
        res.status(400).json({msg:'Wrong token or it has expired'});
    }

    res.json(customer)
}));


//@route  Put/api/register/resetPossword/trader/:token
//@desc   Update the user password
//@access Private

router.put('/reset/trader/:token', asyncHandler(async(req, res)=>{

    let trader = await Trader.findOne({emailToken: req.params.token, expires:{$gt: Date.now()}});

   
    if(!trader ){
        res.status(400).json({msg:'Wrong token or it has expired'});
    }
    const{password} = req.body;

    if(password){
        //Encrypt Password
        const salt = await bcryptjs.genSalt(10);
        trader.password = await bcryptjs.hash(password, salt);
    
    }

    trader.emailToken = null;
    trader.expires = null;

    await trader.save();

    //RETURN JSONWEBTOKEN
    const preload ={
        customer:{
            id: trader.id
        }
    }
    
    jsonwebtoken.sign(preload, process.env.JWST, {expiresIn: '1d'}, (err, token)=>{
        if(err) throw err;
        res.json({token})
    })

    
}))


//@route  Put/api/register/reset/customer/:token
//@desc   Update the user password
//@access Private

router.put('/reset/customer/:token', asyncHandler(async(req, res)=>{

    let customer = await Customer.findOne({emailToken: req.params.token, expires:{$gt: Date.now()}});

   
    if(!customer ){
        res.status(400).json({msg:'Wrong token or it has expired'});
    }
    const{password} = req.body;

    if(password){
        //Encrypt Password
        const salt = await bcryptjs.genSalt(10);
        customer.password = await bcryptjs.hash(password, salt);
    }

    customer.emailToken = null;
    customer.expires = null;

    await customer.save();

    //RETURN JSONWEBTOKEN
    const preload ={
        customer:{
            id: customer.id
        }
    }
    
    jsonwebtoken.sign(preload, process.env.JWST, {expiresIn: '1h'}, (err, token)=>{
        if(err) throw err;
        res.json({token})
    })

    
}))

export default router;