// Import the necessary libraries
import express from "express";
import prisma from "../../Lib/index.js";
import permission from "../../middleware/permission.js";
import authenticate from "../../middleware/authenticate.js";

const router = express.Router();

// get all the quizzes
router.get("/", authenticate, async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany();

    if (quizzes) {
      res.status(200).json(quizzes);
    } else {
      // Respond with a 404 Not Found status if no quizzes are found
      res.status(404).json({ message: "quizzes  not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.message,
    });
  }
});

// get quiz by id
router.get("/:id", permission, async (req, res) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (quiz) {
      res.status(200).json(quiz);
    } else {
      // Respond with a 404 Not Found status if no quiz are found
      res.status(404).json({ message: "quiz not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.message,
    });
  }
});

// Create a quiz
router.post("/add", permission, async (req, res) => {
  const { question, answerChoices, correctAnswer } = req.body;

  try {
    // Check if a quiz with the same values already exists
    const existingQuiz = await prisma.quiz.findFirst({
      where: {
        question,
        answerChoices: {
          equals: answerChoices,
        },
        correctAnswer,
      },
    });

    // if the quiz already exist return 404 error
    if (existingQuiz) {
      // Respond with a 409  status if quiz already exizt
      return res.status(409).json({ message: "quiz already exists" });
    }

    // Create new quiz
    const quiz = await prisma.quiz.create({
      data: req.body,
    });

    // response 201 a created stats and the quiz you've created
    res.status(201).json({
      message: "quiz created succesfully",
      quiz: quiz,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating quiz",
      err: err.message,
    });
  }
});

// Update the quiz
router.put("/update/:id", permission, async (req, res) => {
  try {
    // find the the quiz you wanna update by id
    const quiz = await prisma.quiz.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    // response 201 a created stats and the quiz you've created
    if (quiz) {
      res.status(201).json(quiz);
    } else {
      // Respond with a 404 Not Found status if the quiz is not found
      return res.status(404).json({ message: "quiz not found" });
    }
  } catch (err) {
    // Handle any unexpected errors with a 500 Internal Server Error status
    res.status(500).json({
      message: "Error updating quiz",
      err: err.message,
    });
  }
});

// delete the quiz
router.delete("/delete/:id", permission, async (req, res) => {
  try {
    // find the the quiz you wanna delete
    const quiz = await prisma.quiz.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    // check if the quiz exist
    if (quiz) {
      res.status(204).json({ message: "quiz deleted succesfully" });
    } else {
      return res.status(404).json({ message: "quiz not found" });
    }
  } catch (err) {
    // Handle any unexpected errors with a 500 Internal Server Error status
    res.status(500).json({
      message: "Error deleting quiz",
      err: err.message,
    });
  }
});

// export the quiz router
export default router;
