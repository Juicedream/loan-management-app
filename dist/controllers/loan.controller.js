import { loanDB } from "../databases/loan.db.js";
import { userDB } from "../databases/user.db.js";
import { LoanModel } from "../models/loan.model.js";
import { createUUID } from "../utils/helpers.js";
class LoanController {
    getAllLoans = async (req, res, next) => {
        return res.status(200).json({
            code: 200,
            message: "Loans available...",
            loans: loanDB,
        });
    };
    createLoan = async (req, res, next) => {
        const { id } = req.user;
        let { loanAmount, startDate, endDate, nextDateToPay, lenderName, lenderRelationship, reason, } = req.body;
        if (!loanAmount ||
            !startDate ||
            !endDate ||
            !nextDateToPay ||
            !lenderName ||
            !lenderRelationship ||
            !reason) {
            return next({
                status: 400,
                message: "All fields are required.",
            });
        }
        loanAmount = Number(loanAmount);
        lenderName = String(lenderName).trim().toLowerCase();
        lenderRelationship = String(lenderRelationship).trim().toLowerCase();
        startDate = String(startDate).trim();
        endDate = String(endDate).trim();
        nextDateToPay = String(nextDateToPay).trim();
        reason = String(reason).trim().toLowerCase();
        // validate
        const user = userDB.find((u) => u.id === id);
        if (!user) {
            return next({
                status: 400,
                message: "User not found",
            });
        }
        const newLoan = {
            id: createUUID(),
            userId: id,
            hasPaidAll: LoanModel.hasPaidAll,
            startDate,
            endDate,
            nextDateToPay,
            reason,
            lenderName,
            lenderRelationship,
            loanAmount,
        };
        user.loans.push(newLoan?.id);
        loanDB.push(newLoan);
        return res.status(201).json({
            message: "Loan added succeessfully",
            loan: newLoan,
        });
    };
    getLoansByUserId = (req, res, next) => {
        const { id } = req.user;
        let user = userDB.find((u) => u.id === id);
        if (!user) {
            return next({
                status: 404,
                message: "No User Found",
            });
        }
        const userLoans = [];
        user.loans.map((loanId) => {
            const loanDoc = loanDB.find((l) => l.id === loanId);
            userLoans.push(loanDoc);
        });
        if (userLoans.length < 1) {
            return next({
                status: 404,
                message: "No loan found for this user",
            });
        }
        return res.status(200).json({
            code: 200,
            message: "Loans available for user",
            loans: userLoans,
        });
    };
    getLoanById = (req, res, next) => {
        const { id } = req.user;
        const { loanId } = req.params;
        const loan = loanDB.find((l) => l.id === loanId);
        if (!loan) {
            return next({
                status: 404,
                message: `No loan found or Invalid loan Id (${loanId})`
            });
        }
        if (loan.userId !== id) {
            return next({
                status: 401,
                message: `Unauthorized - You can't access this loan as it is not yours`
            });
        }
        return res.status(200).json({
            message: "Loan found",
            code: 200,
            loan
        });
    };
}
export default new LoanController();
//# sourceMappingURL=loan.controller.js.map