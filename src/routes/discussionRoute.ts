import { Router } from "express";
import { AuthenticationMiddleware } from "../middlewares/auth";
import { DiscussionController } from "../controllers/discussion";

export class DiscussionRoute {
    // Attributes
    authenticationMiddleware: AuthenticationMiddleware;
    discussionController: DiscussionController;

    // Ctor
    constructor() {
        this.authenticationMiddleware = new AuthenticationMiddleware();
        this.discussionController = new DiscussionController();
    }

    // Method
    getRoute(){
        return Router()
    }
}
