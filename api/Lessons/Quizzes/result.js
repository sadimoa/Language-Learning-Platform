// Import the necessary libraries
import express from "express";
import prisma from "../../Lib/index.js";
import permission from "../../middleware/permission.js";

const router = express.Router();

// get all results
router.get("/", permission, async (req, res) => {
  try {
    // Fetch the results from the database
    const result = await prisma.result.findMany();

    if (result) {
        return res.status(200).json(result);

    } else {
        return res.status(404).json({ message: "result not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      err: err.message
    });
  }
});



// delete the result
router.delete("/delete/:id", permission, async (req, res) => {
  try {
    // find the the result you wanna delete
    const result = await prisma.result.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    // check if the result exist
    if (result) {
      res.status(204).json({ message: "result deleted succesfully" });
    } else {
      return res.status(404).json({ message: "result not found" });
    }
  } catch (err) {
    // Handle errors with a 500 Internal Server Error
    res.status(500).json({
      message: "Error deleting result",
      err: err.message,
    });
  }
});


export default router;
