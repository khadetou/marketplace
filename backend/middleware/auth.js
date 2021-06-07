import jsonwebtoken from 'jsonwebtoken';
import Trader from '../models/trader.js';
import Customer from '../models/customer.js';


export default async (req, res, next)=>{
    //GET TOKEN FROM  HEADER
    const token = req.header('x-auth-token');
    //CHECK IF NOT TOKEN
    if(!token){
        return res.status(401).json({msg:'No token, authorization denied'});
    }

    //CHECK TOKEN
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWST);
        if(decoded.customer){
            req.customer = await Customer.findById(decoded.customer.id);
        }
        if(decoded.trader){
            req.trader = await Trader.findById(decoded.trader.id);
        }
       
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({msg:('Token is not valid')});
    }
}
