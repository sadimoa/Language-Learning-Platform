// Import the necessary libraries
import express from "express";
import prisma from "../../Lib/index.js";
import permission from "../../middleware/permission.js";

const router = express.Router();

// get all progress
router.get("/", permission, async (req, res) => {
  try {
    // Fetch the progress from the database
    const progress = await prisma.progress.findMany();

    if (progress) {
        return res.status(200).json(progress);

    } else {
        return res.status(404).json({ message: "progress not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      err: err.message
    });
  }
});




// delete the progress
router.delete("/delete/:id", permission, async (req, res) => {
  try {
    // find the the progress you wanna delete
    const progress = await prisma.progress.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    // check if the progress exist
    if (progress) {
      res.status(204).json({ message: "progress deleted succesfully" });
    } else {
      return res.status(404).json({ message: "progress not found" });
    }
  } catch (err) {
    // Handle errors with a 500 Internal Server Error
    res.status(500).json({
      message: "Error deleting progress",
      err: err.message,
    });
  }
});


export default router;
