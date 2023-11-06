// Import the necessary libraries
import express from "express";
import prisma from "../Lib/index.js";
import permission from "../middleware/permission.js";

const router = express.Router();

// get all the Category
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

// get the Category by id
router.get("/:id", permission, async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

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
  try {
    // find the category
    const existingCategory = await prisma.category.findUnique({
      where: {
        name: req.body.name,
      },
    });

    // check if the category is already exist
    if (existingCategory) {
      return res.status(409).json({ message: "category already exists" });
    }

    // create the category
    const category = await prisma.category.create({
      data: req.body,
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

// Edit Category
router.put("/update/:id", async (req, res) => {
  // check if the ID you provide is exist, then update
  try {
    const category = await prisma.category.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    // return the category you'v updated
    if (category) {
      res.status(201).json(category);
    } else {
      return res.status(404).json({ message: "category not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error updating category",
      err: err.message,
    });
  }
});

// delete category
router.delete("/delete/:id", async (req, res) => {
  try {
    const category = await prisma.category.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!category) {
      res.status(404).json({
        message: "Category not found",
      });
    } else {
      res.status(204).json({
        message: "Category deleted successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error deleting category",
      err: err.message,
    });
  }
  
});

export default router;
