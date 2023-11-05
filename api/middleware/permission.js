// Import the necessary libraries and load environment variables using "dotenv".
import jwt from "jsonwebtoken";
import "dotenv/config";

// Get the secret key from the environment variables.
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware function for authentication and authorization.
function permission(req, res, next) {
  const token = req.headers.authorization;

  // Check if a token is missing.
  if (!token) {
    return res.status(401).json({
      message: "Authentication failed - missing token",
    });
  }

  // Extract the token without "Token Bearer"
  const tokenWhitoutBearer = token.split(" ")[1];

  // verify token using the SECRET_KEY.
  return jwt.verify(tokenWhitoutBearer, SECRET_KEY, (error, decoded) => {
    if (error) {
     return res.status(401).json({
        message: "Authentication failed - invalid token",
      });
    }

    // If the token is valid, attach the decoded information to the request object.
    req.decoded = decoded;

    // Check if the user has the necessary permissions admin or matching user id
    if (req.decoded.role === "admin" || req.decoded.id === req.params.id) {
      // continue with the request
      next()
    } else {
      return res.status(401).json({ message: "You don't have permission" });
    }
  });
}

// Export the permission middleware.
export default permission;
