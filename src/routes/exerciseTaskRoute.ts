import { Router } from "express";
import { AuthenticationMiddleware } from "../middlewares/auth";
import { ExerciseTaskController } from "../controllers/exerciseTask";

export class ExerciseTaskRoute {
    // Attributes
    authenticationMiddleware: AuthenticationMiddleware;
    exerciseTaskController: ExerciseTaskController;

    // Ctor
    constructor(){
        this.authenticationMiddleware = new AuthenticationMiddleware();
        this.exerciseTaskController = new ExerciseTaskController();
    }

    // Method
    getRoute(){
        return Router()
            .get("/:id", this.exerciseTaskController.getExercise())
            .post("/:id/submit", this.exerciseTaskController.submitExercise())
    }
}