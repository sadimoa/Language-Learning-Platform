// Import the necessary libraries
import express from "express";
import prisma from "../Lib/index.js";
import permission from "../middleware/permission.js";

const router = express.Router();

router.get("/", permission, async (req, res) => {
  try {
    const category = await prisma.category.findMany();

    if (category) {
     return res.status(200).json(category);
    } else {
     return res.status(404).json({ message: "category not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.message,
    });
  }
});

// Add category
router.post("/add", permission, async (req, res) => {
  const { name } = req.body;

  try {
    // find the category
    const existingCategory = await prisma.category.findUnique({
      where: {
        name: name,
      },
    });

    // look if the category is already exist
    if (existingCategory) {
      // create the category
      return res.status(409).json({ message: "category already exists" });
    }

    const category = await prisma.category.create({
      data: {
        name: name,
      },
    });
    

    // return the category you've created
    return res.status(201).json({
      message: "category created succesfully",
      category: category,
    });

  } catch (err) {
    res.status(500).json({
      message: "Error creating category",
      err: err.message,
    });
  }
});

export default router;
