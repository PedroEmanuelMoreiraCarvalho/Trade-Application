import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
mongoose.set('strictQuery', false);

const DB_URI: string = `${process.env.DATABASE_URI}`;

async function ConnectDatabase() {
    await mongoose.connect(DB_URI).then(()=>{
        console.log("database connected");
    });
};

export { ConnectDatabase };