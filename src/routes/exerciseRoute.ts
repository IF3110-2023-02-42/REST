import { Router } from "express";
import { AuthenticationMiddleware } from "../middlewares/auth";
import { ExerciseController } from "../controllers/exercise";

export class ExerciseRoute {
    // Attributes
    authenticationMiddleware: AuthenticationMiddleware;
    exerciseController: ExerciseController;

    // Ctor
    constructor() {
        this.authenticationMiddleware = new AuthenticationMiddleware();
        this.exerciseController = new ExerciseController();
    }

    // Method
    getRoute() {
        return Router()
            .get("/getHistoryExerciseListById", this.authenticationMiddleware.authenticate(), this.exerciseController.getExerciseHistoryListById())
            .get("/getHistoryExerciseById", this.authenticationMiddleware.authenticate(),  this.exerciseController.getExerciseHistoryById())
            .post("/addsoal/", this.exerciseController.addSoal())
            .get("/delete/:id", this.exerciseController.deleteSoal())
    }
}
