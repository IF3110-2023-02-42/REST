import { Router } from "express";
import { AuthenticationMiddleware } from "../middlewares/auth";
import { UserController } from "../controllers/user";

export class UserRoute {
    // Attributes
    authenticationMiddleware: AuthenticationMiddleware;
    userController: UserController;

    // Ctor
    constructor() {
        this.authenticationMiddleware = new AuthenticationMiddleware();
        this.userController = new UserController();
    }

    // Method
    getRoute() {
        return Router()
            .post("/login", this.userController.login())
    }
}
