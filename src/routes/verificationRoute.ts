import { Router } from "express";
import { AuthenticationMiddleware } from "../middlewares/auth";
import { VerificationController } from "../controllers/verification";

export class VerificationRoute {
    // Attributes
    authenticationMiddleware: AuthenticationMiddleware;
    verificationController: VerificationController;

    // Ctor
    constructor(){
        this.authenticationMiddleware = new AuthenticationMiddleware();
        this.verificationController = new VerificationController();
    }

    // Method
    getRoute(){
        return Router()
            .get("/", this.authenticationMiddleware.authenticate(), this.verificationController.findAll())
            .put("/updateStatus", this.authenticationMiddleware.authenticate(), this.verificationController.updateStatus())
    }
}