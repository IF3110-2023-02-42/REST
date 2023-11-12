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
            .get("/test", this.exerciseController.test())
            .post("/addres", this.exerciseController.addDiscussion())
    }
}
