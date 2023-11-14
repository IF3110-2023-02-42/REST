import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { sign } from "jsonwebtoken";
import { secretToken, expireIn } from "../config/jwtConfig";

export class UserController {
    login() {
        return async (req: Request, res: Response) => {
            let username = req.body.username;
            
            // Lakukan matching dengan data yang ada (saat backend login dan register jadi) , bisa aja ga ada 

            const accessToken = sign({username : username }, secretToken,  {
                expiresIn: expireIn,
            })
            res.status(StatusCodes.OK).json({
                message : ReasonPhrases.OK,
                data: accessToken
            })
        }
    }
}