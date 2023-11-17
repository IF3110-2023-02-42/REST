import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { sign } from "jsonwebtoken";
import { secretToken, expireIn } from "../config/jwtConfig";
import { phpHandlerPOST } from "../utils/phpHandler";
import { soapHandler } from "../utils/soapHandler";
export class UserController {
    private url: string = process.env.SOAP_BASE_ENDPOINT ?? "http://localhost:6060/api";
    login() {
        return async (req: Request, res: Response) => {
            try {
                const data = {
                    username: req.body.username,
                    password: req.body.password
                }
                const response = await phpHandlerPOST(process.env.PHP_BASE_ENDPOINT + "/auth/restauth", data)
                if (!response.status) {
                    if (response.data === "wrong_password") {
                        throw new Error("Wrong password");
                    } else if (response.data === "account_not_found") {
                        throw new Error("Account not found");
                    } else {
                        throw new Error("Something wrong happen");
                    }
                }
                console.log('response', response)

                const { ID_Pengguna, nama_depan, nama_belakang, username, email, role, profile_pict } = response.data;

                // Get the verificationStatus from SOAP

                let params = [ID_Pengguna];


                const accessToken = sign({ ID_Pengguna: ID_Pengguna, nama_depan: nama_depan, nama_belakang: nama_belakang, username: username, email: email, role: role, profile_pict: profile_pict }, secretToken, {
                    expiresIn: expireIn,
                })

                const sessionData = { accessToken: accessToken, ID_Pengguna: ID_Pengguna }
                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: sessionData,
                })

            } catch (error: any) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: ReasonPhrases.BAD_REQUEST,
                    data: error.message
                });
            }
        }
    }
    logout() {

    }

    getUserStatus() {
        return async (req: Request, res: Response) => {
            let result = await soapHandler(this.url, "getUserStatus", [req.params.ID_Pengguna]);

            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: result,
            });
        };
    }
}