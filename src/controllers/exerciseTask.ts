import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class ExerciseTaskController {
    getExercise() {
        return async (req: Request, res: Response) => {
            const elementExerciseQ1 = {
                pertanyaan: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa? 1",
                jawaban_benar: "lorem ipsum t",
                jawaban_salah1: "lorem ipsum",
                jawaban_salah2: "lorem ipsum",
                jawaban_salah3: "lorem ipsum",
            };
            
            const elementExerciseQ2 = {
                pertanyaan: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa? 2",
                jawaban_benar: "lorem ipsum t",
                jawaban_salah1: "lorem ipsum",
                jawaban_salah2: "lorem ipsum",
                jawaban_salah3: "lorem ipsum",
            };
            
            const elementExerciseQ3 = {
                pertanyaan: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa? 3",
                jawaban_benar: "lorem ipsum t",
                jawaban_salah1: "lorem ipsum",
                jawaban_salah2: "lorem ipsum",
                jawaban_salah3: "lorem ipsum",
            };
            
            const exerciseQList = [
                elementExerciseQ1,
                elementExerciseQ2,
                elementExerciseQ3,
            ];

            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: exerciseQList,
            });
        }
    }
}