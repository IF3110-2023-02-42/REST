import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { sign } from "jsonwebtoken";
import { secretToken, expireIn } from "../config/jwtConfig";
import { phpHandlerPOST } from "../utils/phpHandler";

export class UserController {
    login() {
        return async (req: Request, res: Response) => {
            try {
                const data = {
                    username: req.body.username,
                    password: req.body.password
                }
                const response = await phpHandlerPOST(process.env.PHP_BASE_ENDPOINT + "/auth/restauth", data)
                if (response.status === "false") {
                    if (response.data === "wrong_password") {
                        throw new Error("Wrong password");
                    } else if (response.data === "account_not_found") {
                        throw new Error("Account not found");
                    } else {
                        throw new Error("Something wrong happen");
                    }
                }

                const { ID_Pengguna, nama_depan, nama_belakang, username, email, role, profile_pict } = response.data;

                const accessToken = sign({ ID_Pengguna: ID_Pengguna, nama_depan: nama_depan, nama_belakang: nama_belakang, username: username, email: email, role: role, profile_pict: profile_pict }, secretToken, {
                    expiresIn: expireIn,
                })
                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: accessToken
                })

            } catch (error: any) {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: error.message,
                });
            }
        }
    }
    logout() {

    }
}