import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { prisma } from "../services/prisma";

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
}