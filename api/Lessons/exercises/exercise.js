// Import the necessary libraries
import express from "express";
import prisma from "../../Lib/index.js";
import permission from "../../middleware/permission.js";

const router = express.Router();

// get all the exercises
router.get("/", permission, async (req, res) => {
  try {
    const exercises = await prisma.exercise.findMany();

    if (exercises) {
      res.status(200).json(exercises);
    } else {
      // Respond with a 404 Not Found status if no exercises are found
      res.status(404).json({ message: "exercises  not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.message,
    });
  }
});

// get exercise by id
router.get("/:id", permission, async (req, res) => {
  try {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (exercise) {
      res.status(200).json(exercise);
    } else {
      // Respond with a 404 Not Found status if no exercise are found
      res.status(404).json({ message: "exercise not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.message,
    });
  }
});

// Create a exercise
router.post("/add", permission, async (req, res) => {
  const { question, answer, options,  } = req.body;

  try {
    // Check if a exercise with the same values already exists
    const existingexercise = await prisma.exercise.findFirst({
      where: {
        question,
        options: {
          equals: options,
        },
        answer,
      },
    });

    // if the exercise already exist return 404 error
    if (existingexercise) {
      // Respond with a 409  status if exercise already exizt
      return res.status(409).json({ message: "exercise already exists" });
    }

    // Create new exercise
    const exercise = await prisma.exercise.create({
      data: req.body,
    });

    // response 201 a created stats and the exercise you've created
    res.status(201).json({
      message: "exercise created succesfully",
      exercise: exercise,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating exercise",
      err: err.message,
    });
  }
});

// Update the exercise
router.put("/update/:id", permission, async (req, res) => {
  try {
    // find the the exercise you wanna update by id
    const exercise = await prisma.exercise.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    // response 201 a created stats and the exercise you've created
    if (exercise) {
      res.status(201).json(exercise);
    } else {
      // Respond with a 404 Not Found status if the exercise is not found
      return res.status(404).json({ message: "exercise not found" });
    }
  } catch (err) {
    // Handle any unexpected errors with a 500 Internal Server Error status
    res.status(500).json({
      message: "Error updating exercise",
      err: err.message,
    });
  }
});

// delete the exercise
router.delete("/delete/:id", permission, async (req, res) => {
  try {
    // find the the exercise you wanna delete
    const exercise = await prisma.exercise.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    // check if the exercise exist
    if (exercise) {
      res.status(204).json({ message: "exercise deleted succesfully" });
    } else {
      return res.status(404).json({ message: "exercise not found" });
    }
  } catch (err) {
    // Handle any unexpected errors with a 500 Internal Server Error status
    res.status(500).json({
      message: "Error deleting exercise",
      err: err.message,
    });
  }
});

// export the exercise router
export default router;
