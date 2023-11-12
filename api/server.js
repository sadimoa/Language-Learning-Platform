import express, { json } from "express";
import registerRouter from "./register.js";
import userRouter from "./users.js";
import lessonRouter from "./Lessons/lesson.js";
import categoryRouter from "./lessons/lossenCategory.js";
import quizRouter from "./Lessons/Quizzes/quiz.js";
import answerRouter from "./Lessons/Quizzes/answer.js";
import resultRouter from "./Lessons/Quizzes/result.js";
import profileRouter from './profile.js'

const server = express();
server.use(json());

server.use("/api/register", registerRouter);
server.use("/api/users", userRouter);
server.use("/api/lessons", lessonRouter);
server.use("/api/category", categoryRouter);
server.use("/api/quizzes", quizRouter);
server.use("/api/answers", answerRouter);
server.use("/api/result", resultRouter);
server.use("/api/profile", profileRouter);

export default server;
