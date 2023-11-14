import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {prisma} from "../services/prisma"
import React, { useState } from 'react';

export class ExerciseTaskController {
    getExercise() {
        async function getAllExercise(id: string){
            const result = await prisma.soal.findMany({
                where: {
                    ID_Latsol: id
                },
            });
            return result;
        }

        return async (req: Request, res: Response) => {
            let result = await getAllExercise(req.params.id);

            let exerciseQList = result.map((q) => 
            {
                return {
                    id_soal: q.ID_Soal,
                    pertanyaan: q.pertanyaan,
                    jawaban_benar: q.jawaban_benar,
                    jawaban_salah1: q.jawaban_salah1,
                    jawaban_salah2: q.jawaban_salah2,
                    jawaban_salah3: q.jawaban_salah3
                };
            }
            )

            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: exerciseQList,
            });
        };
    }

    submitExercise(){
        async function addJawaban(ID_soal: string, ID_Pengguna: number, jawaban: string){
            const existingData = await prisma.jawaban_Pengguna.findUnique({
                where: {
                    ID_Soal_ID_Pengguna :{
                        ID_Soal: ID_soal,
                        ID_Pengguna: ID_Pengguna,
                    }
                },
              });
            if (existingData){
                const result = await prisma.jawaban_Pengguna.delete({
                    where: {
                        ID_Soal_ID_Pengguna :{
                            ID_Soal: ID_soal,
                            ID_Pengguna: ID_Pengguna,
                        }
                    },
                })
            }
            const newJawaban = await prisma.jawaban_Pengguna.create({
                data:{
                    ID_Soal: ID_soal,
                    ID_Pengguna: ID_Pengguna,
                    jawaban: jawaban,
                },
            });
            return newJawaban;
        }

        async function getAllExercise(ID_Latsol: string){
            const questions = await prisma.soal.findMany({
                where: {
                    ID_Latsol: ID_Latsol,
                },
            })
            return questions;
        }

        async function addNilai(ID_Latsol: string, ID_Pengguna: number, modified_at: Date, nilai: number){
            const newNilai = await prisma.history_Latsol.create({
                data:{
                    ID_Latsol: ID_Latsol,
                    ID_Pengguna: ID_Pengguna,
                    modified_at: modified_at,
                    nilai: nilai,
                },
            })
        }

        return async (req: Request, res: Response) => {
            const id_u = req.body.ID_Pengguna;
            const jawaban = req.body.jawaban;

            // tambahin jawaban persoal
            jawaban.map(async (op: { ID_Soal: string; selected_jawaban: string; }) => {
                let result = await addJawaban(op.ID_Soal, id_u, op.selected_jawaban);
            });
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
            });

            // tambahin nilai
            const kunjaw = await getAllExercise(req.params.id);
            const total = kunjaw.length;
            let sum = 0;
            let kunjawlist = kunjaw.map((kj) => {
                const ans = jawaban.filter((op: { ID_Soal: string; }) => op.ID_Soal === kj.ID_Soal);
                console.log("ans:", ans[0].selected_jawaban);
                console.log("jawaban benar:", kj.jawaban_benar);
                if (ans[0].selected_jawaban == kj.jawaban_benar){
                    sum++;
                }
            })

            const nilai = (sum/total)*100;
            console.log(nilai);
            // const result = await addNilai(req.params.id, id_u, req.body.modified_at,nilai);
        }
    }
}