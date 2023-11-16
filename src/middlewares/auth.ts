import jwt, { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { secretToken } from "../config/jwtConfig";
import { StatusCodes } from "http-status-codes";
export class AuthenticationMiddleware {
    authenticate() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const accessToken = req.header("accessToken");

                if (!accessToken) {
                    throw new Error("Access token is required!")
                }

                const validToken = verify(accessToken, secretToken);
                if (validToken) {
                    return next();
                }
            } catch (error: any) {
                res.status(StatusCodes.FORBIDDEN).json({
                    message: error.message,
                });
            }
        };
    }
    authenticateAdmin() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const accessToken = req.header("accessToken");

                if (!accessToken) {
                    throw new Error("Access token is required!")
                }
                const validToken = verify(accessToken, secretToken) as any;

                if (validToken && validToken.role === 'admin') {
                    return next();
                }
                throw new Error("Access denied. Admins only!")
            } catch (error: any) {
                res.status(StatusCodes.FORBIDDEN).json({
                    message: error.message,
                });
            }
        };
    }
}