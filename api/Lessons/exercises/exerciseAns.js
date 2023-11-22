// Import the necessary libraries
import express from "express";
import prisma from "../../Lib/index.js";
import permission from "../../middleware/permission.js";
import authenticate from "../../middleware/authenticate.js";

const router = express.Router();

// get all ExerciseAnswer
router.get("/", permission, async (req, res) => {
  try {
    // Fetch the exerciseAnswer from the database
    const exerciseAnswer = await prisma.exerciseAnswer.findMany();

    if (exerciseAnswer) {
      return res.status(200).json(exerciseAnswer);
    } else {
      return res.status(404).json({ message: "exerciseAnswer not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      err: err.message,
    });
  }
});

// get exerciseAnswer by id
router.get("/:id", permission, async (req, res) => {
  try {
    const exerciseAnswer = await prisma.exerciseAnswer.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (exerciseAnswer) {
      res.status(200).json(exerciseAnswer);
    } else {
      // Respond with a 404 Not Found status if no exerciseAnswer are found
      res.status(404).json({ message: "exerciseAnswer not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.message,
    });
  }
});

// POST endpoint to create ExerciseAnswer and Result
router.post("/submit", async (req, res) => {
  try {
    const { userId, exerciseId, answer } = req.body;

    // Check if the user and exercise exist
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Fetch the exercise from the database
    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
      include: { lesson: { include: { quiz: true } } },
    });

    // Extract quizId
    const quizId = exercise?.lesson?.quiz[0]?.id;

    if (!exercise || !exercise.lesson || !quizId) {
      return res
        .status(404)
        .json({ error: "Exercise, lesson, or quiz not found." });
    }

    const existingExerciseAnswer = await prisma.exerciseAnswer.findFirst({
      where: {
        answer,
        userId,
        exerciseId,
      },
    });

    if (existingExerciseAnswer) {
      return res
        .status(409)
        .json({ message: "Student already answered this question" });
    }

    const isCorrect = answer.toLowerCase() === exercise.answer.toLowerCase();
    const points = isCorrect ? 10 : 0;

    // Create ExerciseAnswer
    const exerciseAnswer = await prisma.exerciseAnswer.create({
      data: {
        answer,
        isCorrect,
        userId,
        exerciseId,
      },
    });

    // Create ExerciseResult
    const exerciseResult = await prisma.exerciseResult.create({
      data: {
        point: points,
        userId,
        exerciseId,
      },
    });

    // Create or update Progress
    const progress = await prisma.progress.findFirst({
      where: {
        userId,
        exerciseId,
      },
    });

    if (!progress) {
      await prisma.progress.create({
        data: {
          user: {
            connect: { id: userId },
          },
          isCompleted: points > 0,
          score: points,
          lesson: {
            connect: { id: exercise.lessonId },
          },
          quiz: {
            connect: { id: quizId },
          },
          exercise: {
            connect: { id: exerciseId },
          },
        },
      });
    } else {
      await prisma.progress.update({
        where: {
          id: progress.id,
        },
        data: {
          isCompleted: points > 0,
          score: points,
        },
      });
    }


    // Respond with the created ExerciseResult
    res.status(201).json({
      exerciseAnswer,
      exerciseResult,
    });

    // If the answer is incorrect, include the correct answer and lessonId in the response
    if (!isCorrect) {
      return res.status(200).json({
        answer,
        message: `Incorrect, the correct answer is "${exercise.answer}"`,
        lessonId: exercise.lessonId,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      error: error.message,
    });
  }
});

// delete the exerciseAnswer
router.delete("/delete/:id", permission, async (req, res) => {
  try {
    // find the the exerciseAnswer you wanna delete
    const exerciseAnswer = await prisma.exerciseAnswer.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    // check if the exerciseAnswer exist
    if (exerciseAnswer) {
      res.status(204).json({ message: "exerciseAnswer deleted succesfully" });
    } else {
      return res.status(404).json({ message: "exerciseAnswer not found" });
    }
  } catch (err) {
    // Handle errors with a 500 Internal Server Error
    res.status(500).json({
      message: "Error deleting exerciseAnswer",
      err: err.message,
    });
  }
});

export default router;
