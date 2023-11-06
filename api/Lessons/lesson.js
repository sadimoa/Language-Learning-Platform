// Import the necessary libraries
import express from "express";
import prisma from "../Lib/index.js";
import permission from "../middleware/permission.js";

const router = express.Router();

// get all the lesson
router.get("/", permission, async (req, res) => {
  try {
    const lessons = await prisma.lesson.findMany();

    if (lessons) {
      res.status(200).json(lessons);
    } else {
      // Respond with a 404 Not Found status if no lessons are found
      res.status(404).json({ message: "Lessons not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.message,
    });
  }
});

// get lesson by id
router.get("/:id", permission, async (req, res) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (lesson) {
      res.status(200).json(lesson);
    } else {
      // Respond with a 404 Not Found status if no lessons are found
      res.status(404).json({ message: "Lesson not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.message,
    });
  }
});

// Create a lesson
router.post("/add", permission, async (req, res) => {
  const { title, videoUrl, content, isPublished } = req.body;

  try {
    // Check if a lesson with the same values already exists
    const existingLesson = await prisma.lesson.findFirst({
      where: {
        title: title,
        videoUrl: videoUrl,
        content: content,
      },
    });

    // if the lesson already exist return 404 error
    if (existingLesson) {
      // Respond with a 409  status if lessons already exizt
      return res.status(409).json({ message: "Lesson already exists" });
    }

    // Create new lesson
    const lesson = await prisma.lesson.create({
      data: req.body,
    });

    // response 201 a created stats and the lesson you've created
    res.status(201).json({
      message: "Lesson created succesfully",
      lesson: lesson,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating lesson",
      err: err.message,
    });
  }
});

// Update the lesson
router.put("/update/:id", permission, async (req, res) => {
  try {
    // find the the lesson you wanna update by id
    const lesson = await prisma.lesson.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    // response 201 a created stats and the lesson you've created
    if (lesson) {
      res.status(201).json(lesson);
    } else {
      // Respond with a 404 Not Found status if the lesson is not found
      return res.status(409).json({ message: "Lesson already exists" });
    }
  } 
  catch (err) {
    // Handle any unexpected errors with a 500 Internal Server Error status
    res.status(500).json({
      message: "Error creating lesson",
      err: err.message,
    });
  }
});


// delete the lesson
router.delete("/delete/:id", permission, async (req, res) => {
  try {
    // find the the lesson you wanna delete
    const lesson = await prisma.lesson.delete({
      where: {
        id: req.params.id,
      },
    });

    // check if the lesson exist
    if (lesson) {
      res.status(204).json({message: "lesson deleted succesfully"});
    } else {
      return res.status(404).json({ message: "Lesson not found" });
    }
  } catch (err) {
    // Handle any unexpected errors with a 500 Internal Server Error status
    res.status(500).json({
      message: "Error creating lesson",
      err: err.message,
    });
  }
});



// export the lesson router
export default router;
