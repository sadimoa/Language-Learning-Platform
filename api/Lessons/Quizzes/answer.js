// Import the necessary libraries
import express from "express";
import prisma from "../../Lib/index.js";
import permission from "../../middleware/permission.js";
import authenticate from "../../middleware/authenticate.js";

const router = express.Router();

// get all answers
router.get("/", permission, async (req, res) => {
  try {
    // Fetch the answers from the database
    const answer = await prisma.answer.findMany();

    if (answer) {
        return res.status(200).json(answer);

    } else {
        return res.status(404).json({ message: "Answer not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      err: err.message
    });
  }
});

// Create answer and check if the student is correct answer
router.post("/submit", authenticate, async (req, res) => {
  try {
    const { quizId, answer, userId } = req.body;

    // Fetch the quiz from the database
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const existingAnswer = await prisma.answer.findFirst({
        where: {
          answer,
          quizId,
          userId,
        },
      });
  
      // if the answer  already exist return 404 error
      if (existingAnswer) {
        // Respond with a 409  status if answer already exizt
        return res.status(409).json({ message: "Student already answer" });
      }

    // Save the student's answer in the database
     await prisma.answer.create({
      data: req.body,
    });

    // Check if the student answer is correct
    if (answer === quiz.correctAnswer) {
      return res.status(200).json({ message: "Correct answer" });
    } else {
      return res
        .status(200)
        .json({ message: "Incorrect answer. Please try again" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      err: err.message
    });
  }
});



// delete the answer
router.delete("/delete/:id", permission, async (req, res) => {
    try {
      // find the the answer you wanna delete
      const answer = await prisma.answer.delete({
        where: {
          id: Number(req.params.id),
        },
      });
  
      // check if the answer exist
      if (answer) {
        res.status(204).json({ message: "answer deleted succesfully" });
      } else {
        return res.status(404).json({ message: "answer not found" });
      }
    } catch (err) {
      // Handle any unexpected errors with a 500 Internal Server Error status
      res.status(500).json({
        message: "Error deleting answer",
        err: err.message,
      });
    }
  });

export default router;
