// Import the necessary libraries and load environment variables using "dotenv".
import jwt from "jsonwebtoken";
import "dotenv/config";

// Get the secret key from the environment variables.
const SECRET_KEY = process.env.SECRET_KEY;


// Middleware function for letting users view their own data.
function userAuth(req, res, next) {
      const token = req.headers.authorization;
  
      // Check if a token is missing.
      if (!token) {
        return res.status(401).json({
          message: "Authentication failed - missing token",
        });
      }
  
      // Extract the token without "Token Bearer"
      const tokenWithoutBearer = token.split(" ")[1];
  
      // Verify token using the SECRET_KEY.
      return jwt.verify(tokenWithoutBearer, SECRET_KEY, (error, decoded) => {
        if (error) {
          return res.status(401).json({
            message: "Authentication failed - invalid token",
          });
        }
  
        // If the token is valid, attach the decoded information to the request object.
        req.decoded = decoded;
  
        // Check if the user has the role "user" and matches their own user ID.
        if (req.decoded.role === "user" && req.decoded.id === req.params.id) {
          // continue with the request
          next();
        } else {
          return res.status(401).json({ message: "You don't have permission" });
        }
      });
    };
  
  // Export the userAuth middleware.
  export default userAuth;
  