import jwt from "jsonwebtoken";
export function authMiddleware(req, res, next) {
    const authHeaders = req.headers['authorization'];
    if (!String(authHeaders).startsWith("Bearer")) {
        return next({
            status: 401,
            message: "Unauthorized - Token required",
            stack: "error"
        });
    }
    const token = authHeaders.split(" ")[1];
    if (!token || token === null) {
        return next({
            status: 401,
            message: "Unauthorized - Invalid Token"
        });
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedToken) {
        return next({
            status: 401,
            message: "Unauthorized - Invalid or expired token"
        });
    }
    req.user = {
        id: verifiedToken.id,
        role: verifiedToken.role
    };
    next();
}
//# sourceMappingURL=auth.middleware.js.map