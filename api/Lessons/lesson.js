// Import the necessary libraries
import express from "express";
import prisma from "../Lib/index.js";
import permission from "../middleware/permission.js";

const router = express.Router();

router.get("/", permission, async (req, res) => {
  try {
    const lesson = await prisma.lesson.findMany();

    if (lesson) {
      res.status(201).json(lesson);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.message,
    });
  }
});


// Create a lesson
router.post("/create", permission, async (req, res) => {
  const { title, videoUrl, content, isPublished, userId, categoryId} = req.body;

  try {
     // Check if a lesson with the same characteristics already exists
     const existingLesson = await prisma.lesson.findFirst({
      where: {
        title: title,
        videoUrl: videoUrl,
        content: content,
      },
    });

    if (existingLesson) {
      return res.status(409).json({ message: "Lesson already exists" });
    }

    // Create the lesson
    const lesson = await prisma.lesson.create({
      data: {
        title: title,
        videoUrl: videoUrl,
        content: content,
        isPublished: isPublished,
        // Associate the lesson with the specified user
      },
    });

    // Return the lesson you've created
    res.status(201).json({
      message: "Lesson created successfully",
      lesson: lesson,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating lesson",
      err: err.message,
    });
  }
});


export default router;
