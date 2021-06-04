import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    name:{type: String, required: true},
    rating:{type:Number, required: true},
    comment:{type:String, required: true},
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    }
},{
    timestamps: true
})

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
    phoneNumber:{
        type: Number,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    reviews:{reviewSchema},
    rating:{
        type: Number,
        required: true,
        default: 0
    },
    numReviews:{
        type: Number,
        required: true,
        default: 0
    },
    isTrader:{
        type: Boolean,
        required: true,
        default: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
},{
    timestamps: true
})

const Trader = mongoose.model('Trader',traderSchema);
export default Trader;