import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { prisma } from "../services/prisma";
export class DiscussionController {

    findAll() {
        async function getAllDiscussions() {
            const result = await prisma.diskusi.findMany();
            return result;
        }

        return async (req: Request, res: Response) => {
            let result = await getAllDiscussions();

            let discussions = result.map((discussion: any) => {
                const currentTime = new Date().getTime();
                const discussionTime = discussion.Created_at.getTime();

                return {
                    id: discussion.ID_Diskusi,
                    judul: discussion.Judul,
                    dateCreated: Math.floor(Math.abs(currentTime - discussionTime) / (1000 * 60)),
                    author: discussion.Penulis,
                    content: discussion.Konten,
                    numOfComment: discussion.JumlahKomentar,
                    keywords: (discussion.Keywords).split(","),
                }
            }
            )

            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: discussions,
            });
        };
    }

    addDiscussion() {

        async function addNewDiscussion(judul: string, author: string, content: string, numOfComment: number, keywords: string) {
            const discussion = await prisma.diskusi.create({
                data: {
                    Judul: judul,
                    Penulis: author,
                    Konten: content,
                    JumlahKomentar: numOfComment,
                    Keywords: keywords,
                },
            })
            return discussion;
        }
        return async (req: Request, res: Response) => {
            // Insert ke database
            let data = req.body;
            let newData = await addNewDiscussion(data.judul, data.author, data.content, data.numOfComment, data.keywords);

            if (newData) {
                // Jika sukses, fetch data terbaru dari database (data yang baru diinput)
                let discussion = {
                    id: newData.ID_Diskusi,
                    judul: newData.Judul,
                    dateCreated: 0,
                    author: newData.Penulis,
                    content: newData.Konten,
                    numOfComment: newData.JumlahKomentar,
                    keywords: newData.Keywords.split(','),
                };

                // Kirimkan kembali sebagai response
                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: discussion,
                });

            }

        }
    }
}