import * as dotenv from 'dotenv';
import { ConnectDatabase } from './src/database';
dotenv.config();
import { Start } from "./src/server";
import { User } from './src/user_controller/user';

Start();
ConnectDatabase();