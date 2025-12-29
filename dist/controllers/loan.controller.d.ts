declare class LoanController {
    getAllLoans: (req: any, res: any, next: any) => Promise<any>;
    createLoan: (req: any, res: any, next: any) => Promise<any>;
    getLoansByUserId: (req: any, res: any, next: any) => any;
    getLoanById: (req: any, res: any, next: any) => any;
}
declare const _default: LoanController;
export default _default;
//# sourceMappingURL=loan.controller.d.ts.map