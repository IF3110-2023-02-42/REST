import { Router } from "express";
import { AuthenticationMiddleware } from "../middlewares/auth";
import { SoapController } from "../controllers/soap";

export class SoapRoutes {
    // Attributes
    authenticationMiddleware: AuthenticationMiddleware;
    soapController: SoapController;

    // Ctor
    constructor() {
        this.authenticationMiddleware = new AuthenticationMiddleware();
        this.soapController = new SoapController();
    }

    // Method
    getRoute() {
        return Router()
            .get("/test", this.soapController.test())
    }
}