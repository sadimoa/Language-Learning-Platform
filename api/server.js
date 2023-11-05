import express, { json } from "express";
import registerRouter from "./register.js";
import userRouter from "./users.js"
import lessonRouter from "./Lessons/lesson.js"
import categoryRouter from "./lessons/lossenCategory.js"


const server = express();
server.use(json());

server.use("/api/register", registerRouter);
server.use("/api/users", userRouter);
server.use("/api/lessons", lessonRouter);
server.use("/api/category", categoryRouter);


export default server;