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
            .get("/", this.authenticationMiddleware.authenticate(), this.discussionController.findAll())
            .get("/page", this.authenticationMiddleware.authenticate(), this.discussionController.getDiscussionPage())
            .get("/maxPage/:pageSize", this.authenticationMiddleware.authenticate(), this.discussionController.getMaxPage())
            .post("/add", this.authenticationMiddleware.authenticate() ,this.discussionController.addDiscussion())
    }
}
