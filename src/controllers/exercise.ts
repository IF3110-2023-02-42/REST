import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class ExerciseController {
    test() {
        return async (req: Request, res: Response) => {

            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: "haloo",
            });
        };
    }

    addDiscussion() {
        return async (req: Request, res: Response) => {
            // Nanti insert data ke database

            // Jika sukses, fetch data terbaru dari database (data yang baru diinput)
            let discussion = {
                key: 3,
                judul: req.body.judul,
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