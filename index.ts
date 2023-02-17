import * as dotenv from 'dotenv';
import { ConnectDatabase } from './src/database';
import { Start } from "./src/server";

dotenv.config();

Start();
ConnectDatabase();