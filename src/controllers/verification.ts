import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { soapHandler } from "../utils/soapHandler";

export class VerificationController {
    private url: string = process.env.SOAP_BASE_ENDPOINT ?? "http://localhost:6060/api";
    findAll() {
      return async (req: Request, res: Response) => {
          let result = await soapHandler(this.url, "getAllRequest")

          res.status(StatusCodes.OK).json({
              message: ReasonPhrases.OK,
              data: result,
          });
      };
    }
    
    updateStatus(){
      return async (req: Request, res: Response) => {

          // nanti update ke SOAP
          let id = req.body.id;
          let newStatus = req.body.newStatus;

          let params = [id, newStatus];
          let result = await soapHandler(this.url, "updateStatus", params)
  
          res.status(StatusCodes.OK).json({
              message: ReasonPhrases.OK,
              data: result,
          });
      };
      
    }

}