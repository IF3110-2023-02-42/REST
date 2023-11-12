import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class ExerciseController {
    getHistoryDummy() {
        return async (req: Request, res: Response) => {
            const cardExerciseDum1 = {
                judul: "Mengalahkan Natzi",
                ID_Latsol: "123123123",
                Nilai: 69,
                Modified_at: new Date(),
            };

            const cardExerciseDum2 = {
                judul: "Mendapatkan Waifu Natzi",
                ID_Latsol: "696996",
                Nilai: 12,
                Modified_at: new Date(),
            };

            const cardExerciseDum3 = {
                judul: "Mendapatkan Husbando Natzi",
                ID_Latsol: "7777",
                Nilai: 99,
                Modified_at: new Date(),
            };

            const dummyExerciseList = [
                cardExerciseDum1,
                cardExerciseDum2,
                cardExerciseDum3,
                cardExerciseDum1,
                cardExerciseDum2,
                cardExerciseDum3,
            ];

            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: dummyExerciseList,
            });
        }

    }

    getHistoryDummy2() {
        return async (req: Request, res: Response) => {
            const soalJawabanBener1 = {
                ID_Soal: 10,
                pertanyaan:
                    "Sosiologi lahir sebagai ilmu yang mempelajari tentang masyarakat. Istilah sosiologi berasal dari bahasa Yunani socius yang berarti kawan dan logos yang artinya",
                jawaban: "Hubungan sosial",
                jawaban_benar: "Hubungan sosial",
                jawaban_salah1: "Ilmu atau pikiran",
                jawaban_salah2: "Kehidupan bersama",
                jawaban_salah3: "Hubungan antar kelompok",
            };

            const soalJawabanBener2 = {
                ID_Soal: 12,
                pertanyaan:
                    "Menurut teori konflik dalam sosiologi, apa yang menjadi sumber utama ketidaksetaraan dalam masyarakat?",
                jawaban: "Pertentangan kepentingan antarkelompok",
                jawaban_benar: "Pertentangan kepentingan antarkelompok",
                jawaban_salah1: "Keterbatasan sumber daya alam",
                jawaban_salah2: "Ketidakmampuan individu",
                jawaban_salah3: "Perbedaan genetik",
            };

            const soalJawabanSalah1 = {
                ID_Soal: 1,
                pertanyaan:
                    "Menurut teori konflik dalam sosiologi, apa yang menjadi sumber utama ketidaksetaraan dalam masyarakat?",
                jawaban: "Ketidakmampuan individu",
                jawaban_benar: "Pertentangan kepentingan antarkelompok",
                jawaban_salah1: "Keterbatasan sumber daya alam",
                jawaban_salah2: "Ketidakmampuan individu",
                jawaban_salah3: "Perbedaan genetik",
            };

            const historyDummy = {
                judul: "Mendapatkan Waifu Nantsuuu",
                Nilai: 12,
                Modified_at: new Date(),
                pembahasan: [
                    soalJawabanBener1,
                    soalJawabanBener2,
                    soalJawabanSalah1,
                    soalJawabanBener2,
                    soalJawabanSalah1,
                    soalJawabanSalah1,
                    soalJawabanBener1,
                ],
            };
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: historyDummy,
            });
        }

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