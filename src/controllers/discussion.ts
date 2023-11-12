import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class DiscussionController {
    findAll(){
        return async (req: Request, res: Response) => {
            // Nanti nge fetch semua data discussion dari database
            let discussions =[ {
                key: 1,
                judul : "Economic Bubble",
                dateCreated: 2,
                author: "Fadhil",
                contentSnippet: "Apa itu Economic Bubble?",
                numOfComment: 7,
                keywords: ["Economic" , "Bubble"],
              }, {
                key: 2,
                judul : "Artificial Neural Network",
                dateCreated: 3,
                author: "Fadhil Amri",
                contentSnippet: "Apakah ANN memiliki performa yang lebih baik daripada KNN untuk task klasifikasi?",
                numOfComment: 11,
                keywords: ["AI" , "ANN" , "KNN"],
              }];

            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: discussions,
            });
        };
    }

    addDiscussion(){
        return async (req: Request, res: Response) => {
            // Nanti insert data ke database

            // Jika sukses, fetch data terbaru dari database (data yang baru diinput)
            let discussion = {
                key : 3,
                judul : req.body.judul,
                dateCreated: 0,
                author: req.body.author,
                contentSnippet: req.body.contentSnippet,
                numOfComment: req.body.numOfComment,
                keywords: req.body.keywords,
            };

            // Kirimkan kembali sebagai respond
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: discussion,
            });
        }
    }
}