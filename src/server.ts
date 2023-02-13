import express, { Express } from "express";
import { routes } from "./routes";

const port = process.env.PORT;

const app: Express = express();
app.use(express.json())
app.use(routes);

function Start(): void {
    app.listen(port,()=>{
        console.log("server online");
    });
};

export { Start };