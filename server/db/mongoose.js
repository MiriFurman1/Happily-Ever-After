import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.kkwnsfn.mongodb.net/happilyDB?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(URL, (err, mongoDBInstance) => {
    
    if (err) {
        throw Error('MongoDB connection error: ' + err)
    }
    const { host, port, name } = mongoDBInstance;
    console.log({ host, port, name });
})