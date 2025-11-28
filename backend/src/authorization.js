// auth.js
import jwt from "jsonwebtoken";
import { User } from "./models/user.model.js";
import dotenv from "dotenv";
dotenv.config();  // <-- Load .env
export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    // const decoded = await jwt.verify(token, "secret_key");
    // req.user = decoded;
    // next();
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Fetch real user document from DB
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(401).json({ message: "Invalid token user" });

    req.user = user; // real mongoose document
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
  //   try {
  //   const token = req.headers.authorization?.split(" ")[1];
  //   if (!token)
  //     return res.status(401).json({ message: "No token provided" });

  //   const decoded = jwt.verify(token, "secret_key");

  //   // Fetch real user document from DB
  //   const user = await User.findById(decoded.id);
  //   if (!user)
  //     return res.status(401).json({ message: "Invalid token user" });

  //   req.user = user; // real mongoose document
  //   next();
  // } catch (err) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }
};

// authorize.js
export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

export const checkAccess = async (req, res, next) => {
  const user = req.user;
  const now = new Date();

  // If user did not visit 7 days → access expired
  if (now > user.accessExpiry) {
    return res.status(401).json({ message: "Access expired" });
  }

  // Extend access again for 7 days
  user.lastVisit = now;
  user.accessExpiry = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  await user.save();

  next();
};
