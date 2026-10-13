import mongoose from 'mongoose';

export async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI!);

        console.log("Mongo connection is successfully established");
    }
    catch(err){
        console.log("MongoDB connection error!", err);
        process.exit(1);
    }
}