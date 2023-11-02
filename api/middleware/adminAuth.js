import jwt from "jsonwebtoken";
import "dotenv/config";
const SECRET_KEY = process.env.SECRET_KEY;

function adminAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      message: "Authentication failed - missing token",
    });
  }

  const tokenWhitoutBearer = token.split(" ")[1];

  // verify token
  jwt.verify(tokenWhitoutBearer, SECRET_KEY, (error, decoded) => {
    if (error) {
      res.status(401).json({
        message: "Authentication failed - invalid token",
      });
    }

     req.decoded = decoded;

    if (req.decoded.role === "admin") {
      // continue with the request
      next();

    } else {
      return res.status(401).json({ message: "You don't have permission" });
    }
  });
}

export default adminAuth;
