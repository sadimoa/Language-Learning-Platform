import jwt from "jsonwebtoken";
import 'dotenv/config'
const SECRET_KEY = process.env.SECRET_KEY;


function Authentication(req, res, next) {
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

    // continue with the request
    next();
  });
}


export default Authentication