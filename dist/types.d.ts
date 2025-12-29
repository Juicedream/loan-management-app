export type UserType = {
    id: String;
    fullname: String;
    username: String;
    email: String;
    password: String;
    loans: String[];
    role: String;
};
export type LoanType = {
    id: String;
    loanAmount: Number;
    userId: String;
    hasPaidAll: Boolean;
    startDate: Date;
    endDate: Date;
    nextDateToPay: Date;
    lenderName: String;
    lenderRelationship: String;
    reason: String;
};
//# sourceMappingURL=types.d.ts.map