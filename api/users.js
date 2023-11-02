import express from "express";
import prisma from "./Lib/index.js";
import Authentication from "./middleware/authenticate.js";
import adminAuth from "./middleware/adminAuth.js";
import permission from "./middleware/permission.js";

const router = express.Router();

// get all user
router.get("/", permission, async (req, res) => {
  try {
    const user = await prisma.user.findMany();

    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json({ message: "can't find user" });
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.message,
    });
  }
});

// get user by id
  router.get('/:id',permission, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    });

    if (user) {
      res.status(201).json(user);
    } 

    else {
      res.status(404).json({ message: "can't find user" });
    }

  } catch (err) {
    res.status(500).json({
      message: "something went wrong here",
      err: err.message,
    });
  }
});


export default router;
