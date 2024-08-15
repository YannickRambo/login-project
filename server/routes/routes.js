import express from "express";
import { authenticateUser, logoutUser, registerUser, verifyUser } from "../controllers/controllers.js";
import { verifyToken } from "../middlewares/middlewares.js";

export const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authenticateUser);
router.get("/home", verifyToken, verifyUser);
router.get("/logout", logoutUser);
