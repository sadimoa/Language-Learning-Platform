// Import the necessary libraries
import express from "express";
import prisma from "../../Lib/index.js";
import permission from "../../middleware/permission.js";

const router = express.Router();

// get all ExerciseResults from the database
router.get("/", permission, async (req, res) => {
  try {
    // Fetch the ExerciseResults from the database
    const ExerciseResult = await prisma.ExerciseResult.findMany();

    if (ExerciseResult) {
        return res.status(200).json(ExerciseResult);

    } else {
        return res.status(404).json({ message: "ExerciseResult not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      err: err.message
    });
  }
});



// delete the ExerciseResult
router.delete("/delete/:id", permission, async (req, res) => {
  try {
    // find the the ExerciseResult you wanna delete
    const ExerciseResult = await prisma.ExerciseResult.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    // check if the ExerciseResult exist
    if (ExerciseResult) {
      res.status(204).json({ message: "ExerciseResult deleted succesfully" });
    } else {
      return res.status(404).json({ message: "ExerciseResult not found" });
    }
  } catch (err) {
    // Handle errors with a 500 Internal Server Error
    res.status(500).json({
      message: "Error deleting ExerciseResult",
      err: err.message,
    });
  }
});


export default router;
