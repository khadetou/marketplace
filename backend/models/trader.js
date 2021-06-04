import mongoose from 'mongoose';

const traderSchema  = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    storeName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,

    }
})

const Trader = mongoose.model('Trader',traderSchema);
export default Trader;