import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { soapHandler } from "../utils/soapHandler"

export class SoapController {
    private url: string = process.env.SOAP_BASE_ENDPOINT || "http://host.docker.internal:6060/api";
    test() {
        return async (req: Request, res: Response) => {
            try {
                const response = await soapHandler(this.url, "GetDummyData")
                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: response,
                });
            } catch (error: any) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: error.message + this.url,
                });
            }
        }
    }
}