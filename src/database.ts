import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';

const DB_URI: string = `${process.env.DATABASE_URI}`;
const database = new MongoClient(DB_URI);

async function ConnectDatabase() {
    await database.connect().then(()=>{
        console.log("database connected");
    });
};

export { ConnectDatabase };