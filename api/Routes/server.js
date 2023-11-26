import express, { json } from "express";
import registerRouter from "./register.js";
import userRouter from "./users.js";
import lessonRouter from "../Lessons/lesson.js";
import categoryRouter from "../Lessons/lossenCategory.js";
import quizRouter from "../Lessons/Quizzes/quiz.js";
import answerRouter from "../Lessons/Quizzes/answer.js";
import resultRouter from "../Lessons/Quizzes/result.js";
import profileRouter from "./userData.js";
import exerciseRouter from "../Lessons/exercises/exercise.js";
import exerciseAnswerRouter from "../Lessons/exercises/exerciseAns.js";
import exerciseResultRouter from "../Lessons/exercises/exerciseResult.js";

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
server.use("/api/exercise", exerciseRouter);
server.use("/api/exercise-answer", exerciseAnswerRouter);
server.use("/api/exercise-result", exerciseResultRouter);

export default server;
