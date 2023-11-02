import express, { json } from "express";
import registerRouter from "./register.js";
import userRouter from "./users.js"


const server = express();
server.use(json());

server.use("/api/register", registerRouter);
server.use("/api/users", userRouter);


export default server;