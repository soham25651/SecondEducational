import { Router } from "express";

const router = Router();
import{signin , signup} from "../controllers/user.controller.js"
import { authMiddleware } from "../authorization.js";
import { checkAccess } from "../authorization.js";
router.route("/signin").post(signin);
router.route("/signup").post(signup);
router.get("/profile", authMiddleware, checkAccess, (req, res) => {
  res.json({ message: "You are inside protected route", user: req.user });
});
export default router;