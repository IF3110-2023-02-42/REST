import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class DiscussionViewController {
    getDetail(){
        return async (req: Request, res: Response) => {
            // ambil detail discussion
            let detail =
                {
                    penulis: "penulis0123",
                    created_at: new Date(),
                    updated_at: new Date(),
                    judul: "Geometri Segitiga",
                    konten: "apa rumus pythagoras???",
                    jumlah_komentar: 3,
                };
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: detail,
            });
        };
    }
    getComments(){
        return async (req: Request, res: Response) => {
            // ambil komentar discussion
            let comments = [
                {
                    penulis: "komentator01",
                    created_at: new Date(),
                    updated_at: new Date(),
                    konten: "maaf gak tau:(",
                    jumlah_upvote: 2,
                    jumlah_downvote: 3,
                },
                {
                    penulis: "komentator02",
                    created_at: new Date(),
                    updated_at: new Date(),
                    konten: "a^2 = b^2 + c^2 nder👍",
                    jumlah_upvote: 10,
                    jumlah_downvote: 1,
                },
                {
                    penulis: "komentator02",
                    created_at: new Date(),
                    updated_at: new Date(),
                    konten: "gitu aja gabisa🥱",
                    jumlah_upvote: 0,
                    jumlah_downvote: 10,
                },
            ];
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: comments,
            });
        }
    }
    addComments(){

    }
    upVote(){

    }
    downVote(){

    }
}