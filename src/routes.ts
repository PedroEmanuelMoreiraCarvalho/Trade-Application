import express, { Router } from "express";
import { UserFunctions } from "./user_controller/user_controller";

const routes: Router = express.Router();

routes.post("/user/create", UserFunctions.createUser);
routes.post("/user/deposite", UserFunctions.deposite);
routes.post("/user/exchange", UserFunctions.exchange);

export { routes };