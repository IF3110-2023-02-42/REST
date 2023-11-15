import jwt, { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { secretToken } from "../config/jwtConfig";
export class AuthenticationMiddleware {
    authenticate() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const accessToken = req.header("accessToken");

            if (!accessToken) return res.json({ error: "User not logged in !" })

            try {
                const validToken = verify(accessToken, secretToken);
                if (validToken) {
                    return next();
                }
            } catch (error) {
                return res.json({ error: error })
            }
        };
    }
}