import express from "express";
import prisma from "./Lib/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import adminAuth from "./middleware/adminAuth.js";

const SECRET_KEY = process.env.SECRET_KEY;
const router = express.Router();

//Signup
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: "user already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        role: role,
      },
    });

    return res.status(201).json({
      message: "user created succesfully",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      err: err.message,
    });
  }
});

// Loging
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return res.status.json({ message: "user not found" });
    }
    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid password" });
    }

    // create token
    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "user logged succesfully",
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error signing",
      err: err.message,
    });
  }
});


export default router;
