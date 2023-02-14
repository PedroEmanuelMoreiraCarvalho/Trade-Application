import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { UserModel } from "../models/user_model";    
import { User } from "./user";

async function getUser(_id: string): Promise<any>{
    try{
        const user_data = await UserModel.findOne({ _id });
        let user = new User(user_data);
        return user;
    }catch(err){
        console.log(err);
    }
}

const UserFunctions = {

    createUser: async function (req: Request, res: Response): Promise<void>{
        try{
            const new_user = new User({cash:{"BRL":0,"USD":0}});
            await UserModel.create(new_user);
            res.json({
                sucess: true
            });
        }catch(err){
            console.log(err);
            res.json({
                sucess: false
            });
        }
    },

    deposite: async function (req: Request, res: Response): Promise<void>{
        try{
            const { user_id, value, to_coin } = req.body;

            const user = await getUser(user_id);
            user.deposite(value, to_coin);

            await UserModel.findByIdAndUpdate(user_id, user, {new: true});

            res.json({
                sucess: true
            });
        }catch(err){
            console.log(err);
            res.json({
                sucess: false
            });
        }
    },

    exchange: async function (req: Request, res: Response){
        try{
            const { user_id, value, from_coin, to_coin } = req.body;

            const user = await getUser(user_id);
            if(user.getCash(from_coin) < value){
                res.json({
                    sucess: false,
                    message: "Insuficient cash"
                });
                return
            };

            await user.exchange(value, from_coin, to_coin);

            await UserModel.findByIdAndUpdate(user_id, user, {new: true});
            
            res.json({
                sucess: true
            });
        }catch(err){
            console.log(err);
            res.json({
                sucess: false
            });
        }
    }
};

export { UserFunctions };