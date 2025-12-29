import Router from "express";
import loanController from "../controllers/loan.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = Router();

router.use(authMiddleware)

router
    .get("/", loanController.getAllLoans)
    .post("/create", loanController.createLoan)
    .get("/user-loans", loanController.getLoansByUserId)
    .get("/:loanId", loanController.getLoanById)



export default router;