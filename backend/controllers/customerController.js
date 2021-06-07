import Trader from '../models/trader.js';
import asyncHandler from 'express-async-handler';


//@route Post/api/customer/:id/subscribe
//@desc  Souscribtion to the trader account
//@access Private

export const subscribe = asyncHandler(async (req, res)=>{

    let trader = await Trader.findById(req.params.id);
    if(trader){
        const subscribed = trader.subscription.find(emails =>emails.email === req.customer.email);

        if(subscribed){
            trader.subscription = trader.subscription.filter(emails=>emails.email !== req.customer.email)
            await trader.save();
            res.json({msg: 'unSubscribed'})
        }else{
            const follower ={
                firstName: req.customer.firstName,
                lastName: req.customer.lastName,
                email: req.customer.email,
                customer: req.customer.id
            }
    
            trader.subscription.push(follower);
            await trader.save();
            res.status(201).json({msg:'Suscribed'});
        }
    }

}); 