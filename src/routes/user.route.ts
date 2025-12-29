import Router from "express";
import userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router
    .get("/", userController.getAllUser)
    .post("/register", userController.registerUser)
    .post("/login", userController.loginUser)
    .get("/current", authMiddleware, userController.getUserById)


export default router;