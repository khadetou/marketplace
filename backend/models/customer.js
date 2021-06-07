import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        require: true
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
    expires:{
        type: Date,
        require: true
    },
    isVerified:{
        type: Boolean,
        require: true,
        default: false
    },
    password:{
        type: String,
        required:true
    },
},{
    timestamps: true
})

const Customer = mongoose.model('Customer',customerSchema);
export default Customer;