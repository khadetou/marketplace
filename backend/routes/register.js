import express from 'express';
import {check, validationResult} from 'express-validator';
import Trader from '../models/trader.js';
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

            sendEmailToConfirm(trader, req, res)
            await trader.save();

          

        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error')
        }
    }
)



//@route get/api/register/checkmail
//@access get trader email 
//@access private

router.get('/checkemail', asyncHandler(async (req, res)=>{
    let trader = await Trader.findOne({emailToken: req.query.token});

    if(!trader){
        res.status(400).json({msg:'Something went wrong please contact us for assistance'});
    }

    // await User.remove(user);
    trader.isVerified = true,
    trader.emailToken = null
    await trader.save();

    res.status(201).json({msg:"Votre email a ete verifié avec success"})
}))

export default router;