export const errorHandler = (err, req, res, next) => {
    console.error(err);
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: process.env.NODE_ENV === "production" ? "Internal Server Error" : message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};
//# sourceMappingURL=errorHandler.js.map