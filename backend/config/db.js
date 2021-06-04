import mongoose from 'mongoose';

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(
            process.env.MONGO_URI,{
                useUnifiedTopology:true,
                useNewUrlParser: true,
                useCreateIndex: true
            }
        )
        console.log(`Connected to MongonDB${conn.connection.host}`.bold.yellow);
    } catch (error) {
        console.log(`Error:${error.message}`.bold.red);
    }
}

export default connectDB;