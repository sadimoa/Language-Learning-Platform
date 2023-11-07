// Import the necessary libraries
import express from "express";
import prisma from "./Lib/index.js";
import permission from "./middleware/permission.js";

const router = express.Router();

// get all user
router.get("/", permission, async (req, res) => {
  try {
    const user = await prisma.user.findMany();

    if (user) {
      res.status(201).json(user);
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

// get user by id
router.get("/:id", permission, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      res.status(200).json(user);
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

// delete user
router.delete("/logout/:id", permission, async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });

    if (user) {
      return res.status(204).send();
    } else {
      return res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.message,
    });
  }
});

export default router;
