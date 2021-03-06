import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import mailing from './routes/mailing.js';
import register from './routes/register.js';
import login from './routes/login.js';
import customer from './routes/customer.js';
import products from './routes/products.js';
import trader from './routes/trader.js';
import uploadImage from './routes/uploadImages.js';


//DOTENV AND EXPRESS CONFIG
const app = express();
dotenv.config();


const {PORT, NODE_ENV} = process.env;

//CONNECTION TO OUR DB
connectDB();


//ROOT BACKEND PAGE
app.get('/',(req, res)=>{
    res.send('Api is running ....');
})

//ENABLE THE BODY
app.use(express.json({extend:false}))

//DEFINE ROUTES
app.use('/api/mail', mailing);
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/customer', customer);
app.use('/api/products', products);
app.use('/api/products/trader', trader);
app.use('/api/upload', uploadImage);


//ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

//SETTING UP THE PORT

const PORTV = PORT || 5000;
app.listen(PORTV, () => console.log(`Server started on port ${PORTV} on ${NODE_ENV} mode`.underline.bold.green));