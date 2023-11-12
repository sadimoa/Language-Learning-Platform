// Import the necessary libraries
import express from "express";
import prisma from "./Lib/index.js";
// Import the userAuth middleware
import userAuth from "./middleware/userAuth.js";


const router = express.Router();

// get the answers of the student  
router.get("/answers/:id", userAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id
      }
    });

    const answers = await prisma.answer.findMany({
      where: {
        userId: req.params.id
      }
    })

    if (answers.length > 0) {
      res.status(200).json(answers);
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


// get the results of the student
router.get("/results/:id", userAuth, async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.params.id
        }
      });

      const results = await prisma.result.findMany({
        where: {
          userId: req.params.id
        }
      })
  
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        // Respond with a 404 Not Found status if no result are found
        res.status(404).json({ message: "result not found" });
      }
    } catch (err) {
      res.status(500).json({
        message: "something went wrong",
        err: err.message,
      });
    }
  });


export default router;