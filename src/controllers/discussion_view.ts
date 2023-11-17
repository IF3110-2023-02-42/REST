import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { prisma } from "../services/prisma";
export class DiscussionViewController {
    getDetail(){
        async function getDiscussionDetail(id_diskusi:string) {
            const result = await prisma.diskusi.findUnique(
                {
                    where: {
                        ID_Diskusi:id_diskusi
                    }
                }
            )
            return result;
        }
        
        return async (req: Request, res: Response) => {
            // ambil detail discussion
            let result = await getDiscussionDetail(req.params.idDiskusi);
            if (result){
                const currentTime = new Date().getTime();
                const discussionTime = result?.Created_at.getTime(); 
                let detail =
                    {
                        penulis: result.Penulis,
                        created_at: Math.floor(Math.abs(currentTime - discussionTime) / (1000 * 60)),
                        judul: result.Judul,
                        konten: result.Konten,
                        jumlah_komentar: result.JumlahKomentar,
                        keywords: result.Keywords.split(','),
                    };
                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: detail,
                });
            }
        };
    }
    getCommentsById(){
        async function getAllComments(id_diskusi: string) {
            const result = await prisma.komentar.findMany(
                {
                    where:{
                        ID_Diskusi:id_diskusi
                    }
                }
            );
            return result;
        }
        return async (req: Request, res: Response) => {
            // ambil komentar comment
            let results = await getAllComments(req.params.idDiskusi);

            let comments = results.map((comment) => {
                const currentTime = new Date().getTime();
                const commentTime = comment.Updated_at.getTime();

                return {
                    id_komentar: comment.ID_Komentar,
                    penulis: comment.Penulis,
                    konten: comment.Konten,
                    jumlah_upvote: comment.Jumlah_Upvote,
                    jumlah_downvote: comment.Jumlah_Downvote,
                    updated_at: Math.floor(Math.abs(currentTime - commentTime) / (1000 * 60)),
                };
            })

            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: comments,
            });
        }
    }
    addComment(){
        async function addNewComment(id_diskusi: string, author: string, content: string, jumlah_upvote: number, jumlah_downvote: number) {
            const comment = await prisma.komentar.create({
                data: {
                    ID_Diskusi: id_diskusi,
                    Penulis: author,
                    Konten: content,
                    Jumlah_Upvote: jumlah_upvote,
                    Jumlah_Downvote: jumlah_downvote,
                },
            })

            // Tambah Jumlah Komentar pada diskusi yang bersangkutan
            await prisma.diskusi.update({
                where: {
                    ID_Diskusi:id_diskusi
                },
                data :{
                    JumlahKomentar: {
                        increment:1
                    }
                }
            })

            return comment;
        }
        return async (req: Request, res: Response) => {
            // tambah komentar ke database
            let data = req.body;
            let newData = await addNewComment(data.id_diskusi, data.penulis, data.konten, data.jumlah_upvote, data.jumlah_downvote);
            
            if (newData){
                let comment = {
                    id_komentar: newData.ID_Komentar,
                    penulis: newData.Penulis,
                    konten: newData.Konten,
                    jumlah_upvote: newData.Jumlah_Upvote,
                    jumlah_downvote: newData.Jumlah_Downvote,
                    updated_at: 0,
                }
                console.log(req);
    
                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: comment,
                });

            }
        }
    }
    upVote(){
        async function up(id_komentar: string){
            const result = await prisma.komentar.update({
                where:{
                    ID_Komentar: id_komentar
                },
                data:{
                    Jumlah_Upvote: {
                        increment:1
                    }
                },
            })
        }

        return async (req: Request, res: Response) =>{
            let id_komentar = req.params.id;
            let result = up(id_komentar);
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
            });
        }
    }
    downVote(){
        async function down(id_komentar: string){
            const result = await prisma.komentar.update({
                where:{
                    ID_Komentar: id_komentar
                },
                data:{
                    Jumlah_Downvote: {
                        increment:1
                    }
                },
            })
        }

        return async (req: Request, res: Response) =>{
            let id_komentar = req.params.id;
            let result = down(id_komentar);
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
            });
        }
    }
    getMaxPage() {
        return async (req: Request, res: Response) => {
            try{
                let numOfRecord = await prisma.komentar.count(
                    {
                        where : {
                            ID_Diskusi:req.params.idDiskusi
                        }
                    }
                );
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
    getCommentsByIDDiskusiPage() {

        async function getPage(pageNumber:number, pageSize:number, idDiskusi:string) {
            const discussion = await prisma.komentar.findMany({
                where : {
                    ID_Diskusi: idDiskusi,
                },
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
                let results = await getPage(parseInt(req.query.pageNumber as string),parseInt(req.query.pageSize as string), req.params.idDiskusi as string);
                let comments = results.map((comment) => {
                    const currentTime = new Date().getTime();
                    const commentTime = comment.Updated_at.getTime();
    
                    return {
                        id_komentar: comment.ID_Komentar,
                        penulis: comment.Penulis,
                        konten: comment.Konten,
                        jumlah_upvote: comment.Jumlah_Upvote,
                        jumlah_downvote: comment.Jumlah_Downvote,
                        updated_at: Math.floor(Math.abs(currentTime - commentTime) / (1000 * 60)),
                    };
                })

                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: comments,
                });

            }catch (error: any) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: error.message,
                });
            }

        }
    }
}