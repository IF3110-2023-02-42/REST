import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { prisma } from "../services/prisma";
import { P } from "pino";

export class ExerciseController {
    getExerciseHistoryListById() {
        return async (req: Request, res: Response) => {
            try {
                console.log("Getting History Exercise List by User Id");

                const ID_Pengguna = parseInt(req.query.ID_Pengguna as string);

                console.log('ID_Pengguna', ID_Pengguna);
                if (isNaN(ID_Pengguna)) {
                    throw new Error("ID_Pengguna must be a number");
                }
                console.log("ID_Pengguna : ", ID_Pengguna);

                const result = await prisma.history_Latsol.findMany({
                    where: {
                        ID_Pengguna: ID_Pengguna,
                    },
                    select: {
                        Latsol: {
                            select: {
                                ID_Latsol: true,
                                judul: true,
                                deksripsi: true,
                            },
                        },
                        ID_Latsol: true,
                        modified_at: true,
                        nilai: true,
                    },
                });

                const historyList = result.map(item => ({
                    ID_Latsol: item.ID_Latsol,
                    modified_at: item.modified_at,
                    nilai: item.nilai,
                    judul: item.Latsol.judul,
                    deksripsi: item.Latsol.deksripsi,
                }));

                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: historyList,
                });

            } catch (error) {
                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: "tes",
                });
            }
        }
    }

    getExerciseHistoryById() {
        return async (req: Request, res: Response) => {
            try {
                console.log("Getting History Exercise by User Id");

                const ID_Pengguna = parseInt(req.query.ID_Pengguna as string);
                const ID_Latsol = req.query.ID_Latsol as string;

                const taskTitle = await prisma.latihan_Soal.findFirst({
                    where: {
                        ID_Latsol: ID_Latsol,
                    },
                    select: {
                        judul: true,
                        deksripsi: true,
                        History_Latsol: {
                            where: {
                                ID_Pengguna: ID_Pengguna
                            },
                            select: {
                                modified_at: true,
                                nilai: true,
                            }
                        }

                    }
                })

                if (!taskTitle) {
                    throw new Error("No history found");
                }

                // all question
                const questionHistoryList = await prisma.soal.findMany({
                    where: {
                        ID_Latsol: ID_Latsol,
                    },
                    select: {
                        Jawaban_Pengguna: {
                            where: {
                                ID_Pengguna: ID_Pengguna,
                            },
                            select: {
                                jawaban: true,
                            }
                        },
                        ID_Soal: true,
                        pertanyaan: true,
                        jawaban_benar: true,
                        jawaban_salah1: true,
                        jawaban_salah2: true,
                        jawaban_salah3: true,
                    },
                });

                const questionHistoryListFlatten = questionHistoryList.map(item => ({
                    ID_Soal: item.ID_Soal,
                    pertanyaan: item.pertanyaan,
                    jawaban: item.Jawaban_Pengguna.at(0)?.jawaban,
                    jawaban_benar: item.jawaban_benar,
                    jawaban_salah1: item.jawaban_salah1,
                    jawaban_salah2: item.jawaban_salah2,
                    jawaban_salah3: item.jawaban_salah3,
                }));

                const result = {
                    judul: taskTitle.judul,
                    deskripsi: taskTitle.deksripsi,
                    Nilai: taskTitle.History_Latsol.at(0)?.nilai,
                    Modified_at: taskTitle.History_Latsol.at(0)?.modified_at,
                    pembahasan: questionHistoryListFlatten
                }

                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: result,
                });

            } catch (error: any) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: error.message,
                });
            }
        }
    }
    addSoal(){
        async function addSoal(id_latsol: string, pertanyaan: string, jawaban_benar: string, jawaban_salah1: string, jawaban_salah2: string, jawaban_salah3: string){
            const last_id = await prisma.soal.findMany({
                take: 1,
                orderBy: {
                    ID_Soal: "desc",
                }
            });
            
            const add = await prisma.soal.create({
                data:{
                    ID_Latsol: id_latsol,
                    ID_Soal: (parseInt(last_id[0]?.ID_Latsol)+1).toString(),
                    pertanyaan: pertanyaan,
                    jawaban_benar: jawaban_benar,
                    jawaban_salah1: jawaban_salah1,
                    jawaban_salah2: jawaban_salah2,
                    jawaban_salah3: jawaban_salah3,
                }
            })
            return add;
        }

        return async (req: Request, res: Response) => {
            
            let add = await addSoal(req.body.id_latsol, req.body.pertanyaan, req.body.jawaban_benar, req.body.jawaban_salah1, req.body.jawaban_salah2, req.body.jawaban_salah3);
            
            if (add){
                let q = {
                    id_latsol: add.ID_Latsol,
                    id_soal: add.ID_Soal,
                    pertanyaan: add.pertanyaan,
                    jawaban_benar: add.jawaban_benar,
                    jawaban_salah1: add.jawaban_salah1,
                    jawaban_salah2: add.jawaban_salah2,
                    jawaban_salah3: add.jawaban_salah3,
                }
                console.log(q);

                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: q,
                });
            }
        }
    }
    deleteSoal(){
        async function deleteById(id: string){
            const result = await prisma.soal.delete({
                where:{
                    ID_Soal:id
                },
            })
            return result;
        }

        return async (req: Request, res: Response) => {
            let result = await deleteById(req.params.id);

            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
            });
        }
    }
}