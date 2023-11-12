import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {DiscussionModel} from "../models/discussion";

export class DiscussionController {

    model:DiscussionModel;
    constructor(){
        this.model = new DiscussionModel();
    }

    findAll() {
        return async (req: Request, res: Response) => {
            // Nanti nge fetch semua data discussion dari database
            let discussionsTest = [{
                id: "1",
                judul: "Economic Bubblee",
                dateCreated: 2,
                author: "Fadhil",
                content: "Apa itu Economic Bubble?",
                numOfComment: 7,
                keywords: ["Economic", "Bubble"],
            }, {
                id: "2",
                judul: "Artificial Neural Network",
                dateCreated: 3,
                author: "Fadhil Amri",
                content: "Apakah ANN memiliki performa yang lebih baik daripada KNN untuk task klasifikasi?",
                numOfComment: 11,
                keywords: ["AI", "ANN", "KNN"],
            }];

            let discussions = await this.model.getAllDiscussions();

            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: discussions,
            });
        };
    }

    addDiscussion() {
        return async (req: Request, res: Response) => {
            // Nanti insert data ke database
            let data = req.body;
            let newData = await this.model.addNewDiscussion(data.judul, data.author, data.content, data.numOfComment, data.keywords);

            if (newData){
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
                console.log(req);
    
                // Kirimkan kembali sebagai response
                res.status(StatusCodes.OK).json({
                    message: ReasonPhrases.OK,
                    data: discussion,
                });

            }
            
        }
    }
}