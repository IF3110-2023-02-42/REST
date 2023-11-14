import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { soapHandler } from "../utils/soapHandler"

export class SoapController {
    test() {
        return async (req: Request, res: Response) => {
            try {
                const response = soapHandler("http://localhost:6060/api", "getAllLog")
                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: response,
                });
            } catch (error: any) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: error.message,
                });
            }
        }
    }
}