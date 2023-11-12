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
            .get("/test", this.exerciseController.getHistoryDummy())
            .get("/test2", this.exerciseController.getHistoryDummy2())
            .post("/addres", this.exerciseController.addDiscussion())
    }
}
