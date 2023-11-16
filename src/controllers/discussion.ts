import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { prisma } from "../services/prisma";
export class DiscussionController {

    findAll() {
        return async (req: Request, res: Response) => {
            try{
                let result = await prisma.diskusi.findMany({
                    orderBy: [
                        {
                            Created_at : 'desc',
                        },
                    ]
                }
                );
    
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
                })
    
                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: discussions,
                });
            } catch (error: any) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: error.message,
                });
            }
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
            try{
                // Insert ke database
                let data = req.body;
                let newData = await addNewDiscussion(data.judul, data.author, data.content, data.numOfComment, data.keywords);
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
                
            }catch (error: any) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: error.message,
                });
            }

        }
    }
    getMaxPage() {
        return async (req: Request, res: Response) => {
            try{
                let numOfRecord = await prisma.diskusi.count();
                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: Math.ceil(numOfRecord/parseInt(req.params.pageSize)),
                });
            } catch (error: any) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: error.message,
                });
            }
        }
    }
    getDiscussionPage() {

        async function getPage(pageNumber:number, pageSize:number) {
            const discussion = await prisma.diskusi.findMany({
                take:pageSize,
                skip:(pageNumber-1)*pageSize,
                orderBy: [
                    {
                        Created_at : 'desc',
                    },
                ]
            });
            return discussion;
        }
        return async (req: Request, res: Response) => {
            try{
                let result = await getPage(parseInt(req.query.pageNumber as string),parseInt(req.query.pageSize as string));
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
                })

                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: discussions,
                });

            }catch (error: any) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: error.message,
                });
            }

        }
    }
}