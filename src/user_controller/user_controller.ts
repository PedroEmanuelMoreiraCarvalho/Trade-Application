import { Request, Response } from "express";
import { user } from "../..";

const UserFunctions = {
    deposite: async function (req: Request, res: Response){
        try{
            let { value, to_coin } = req.body;
            
            user.deposite(value, to_coin);
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
            let { value, from_coin, to_coin } = req.body;

            if(user.getCash(from_coin) < value){
                res.json({
                    sucess: false,
                    message: "Insuficient cash"
                });
                return
            };

            await user.exchange(value, from_coin, to_coin);
            console.log(user);
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
}

export { UserFunctions };