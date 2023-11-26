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
      err: err.message,
    });
  }
});

// get answer by id
router.get("/:id", permission, async (req, res) => {
  try {
    const answer = await prisma.answer.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (answer) {
      res.status(200).json(answer);
    } else {
      // Respond with a 404 Not Found status if no answer are found
      res.status(404).json({ message: "answer not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.message,
    });
  }
});

// Create answer and check if the student answer is correct
// Create answer and check if the student answer is correct
router.post("/submit", authenticate, async (req, res) => {
  try {
    const { answer, quizId, userId } = req.body;

    // Check if the user  exist
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // Fetch the quiz from the database
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        lesson: {
          include: {
            exercises: true,
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Extract exercise
    const exerciseId = 1;

    if (!quiz || !quiz.lesson || !exerciseId) {
      return res
        .status(404)
        .json({ error: "quiz, lesson, or exercise not found." });
    }

    const existingAnswer = await prisma.answer.findFirst({
      where: {
        answer,
        quizId,
        userId,
      },
    });

    if (existingAnswer) {
      return res
        .status(409)
        .json({ message: "Student already answered this question" });
    }

    // Check if the student answer is correct
    const isCorrect = answer === quiz.correctAnswer;
    const points = isCorrect ? 10 : 0;

    if (isCorrect) {
      // Save the student's answer in the database
      await prisma.answer.create({
        data: {
          answer,
          isCorrect,
          userId,
          quizId,
        },
      });

      // Create a result if the student's answer is correct
      const result = await prisma.result.create({
        data: {
          point: points,
          quizId: quizId,
          userId: userId,
        },
      });

      // Create or update Progress
      const progress = await prisma.progress.findFirst({
        where: {
          userId,
          quizId,
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
              connect: { id: quiz.lessonId },
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

      // Update the lesson completion status
      if (points > 0) {
        const calculateProficiency = (lessonCompletedCount) => {
          if (lessonCompletedCount < 5) {
            return "Beginner";
          } else if (lessonCompletedCount <= 10) {
            return "Intermediate";
          } else {
            return "Advanced";
          }
        };

        // Fetch the current lessonCompletedCount from the user data
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        if (!user) {
          return res.status(404).json({ error: "User not found." });
        }

        const currentLessonCompletedCount = user.lessonCompletedCount;

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            lessonCompletedCount: {
              increment: 1,
            },
            proficiency: calculateProficiency(currentLessonCompletedCount),
          },
        });


        await prisma.lesson.update({
          where: {
            id: quiz.lessonId,
          },
          data: {
            isCompleted: true,
            completedAt: { set: new Date() },
          },
        });
      }

      return res.status(200).json({
        answer,
        message: "Correct answer",
        result,
      });
    } else {
      return res.status(200).json({
        answer,
        message: `Incorrect answer, please try again`,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      err: err.message,
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
    // Handle errors with a 500 Internal Server Error
    res.status(500).json({
      message: "Error deleting answer",
      err: err.message,
    });
  }
});

export default router;




