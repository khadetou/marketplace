import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import mailing from './routes/mailing.js';

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

//ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

//SETTING UP THE PORT

const PORTV = PORT || 5000;
app.listen(PORTV, () => console.log(`Server started on port ${PORTV} on ${NODE_ENV} mode`.underline.bold.green));