import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class VerificationController {

    findAll() {
      return async (req: Request, res: Response) => {
          // Nanti minta ke SOAP list semua request verifikasi

          let result = [
              {
                id: "1",
                nama: "Roberto Santan",
                email: "robsantan@gmail.com",
                tanggalPengajuan: "10 November 2023",
                status: "unverified",
              }, 
              {
                id: "2",
                nama: "Roberto Santani",
                email: "robi@gmail.com",
                tanggalPengajuan: "10 November 2023",
                status: "accepted",
              },
              {
                id: "3",
                nama: "Roberto Santano",
                email: "robo@gmail.com",
                tanggalPengajuan: "10 November 2023",
                status: "rejected",
              },
            ];

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

          let result = {
            id : id,
            newStatus : newStatus,
          };
  
          res.status(StatusCodes.OK).json({
              message: ReasonPhrases.OK,
              data: result,
          });
      };
      
    }

}