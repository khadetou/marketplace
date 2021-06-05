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
    emailToken:{
        type: String,
        require: true, 
    },
    isVerified:{
        type: Boolean,
        require: true,
        default: false
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        require: true
    },
    avatar:{
        type: String,
        require: true
    },
    reviews:{reviewSchema},
    rating:{
        type: Number,
        required: true,
        default: 0
    },
    numReviews:{
        type: Number,
        require: true,
        default: 0
    },
    isTrader:{
        type: Boolean,
        require: true,
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