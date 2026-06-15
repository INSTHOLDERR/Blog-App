import jwt from 'jsonwebtoken';
import HttpError from '../models/errorModel.js';

const authMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization;
    console.log(" header:", req.headers);
    console.log("Authorization header:", authorization);

    if (authorization && authorization.startsWith("Bearer")) {
        const token = authorization.split(' ')[1];
        console.log("Token extracted from header:", token);

        jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
            if (err) {
                console.error("JWT verification error:", err);
                return next(new HttpError("Unauthorized, Invalid token.", 403));
            }

            req.user = info;
            console.log("Decoded user info:", req.user);
            next();
        });
    } else {
        return next(new HttpError("Unauthorized, No token.", 401));
    }
};

export default authMiddleware;
