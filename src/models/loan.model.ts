import type { LoanType } from "../types.js";


export let LoanModel = {
    id: "",
    userId: "",
    hasPaidAll: false,
    startDate: new Date(),
    endDate: new Date(),
    nextDateToPay: new Date(),
    reason: "",
    lenderName: "",
    lenderRelationship: "",
    loanAmount: 0,
} as LoanType