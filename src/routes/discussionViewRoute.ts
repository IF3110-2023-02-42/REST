import { Router } from "express";
import { AuthenticationMiddleware } from "../middlewares/auth";
import { DiscussionViewController } from "../controllers/discussion_view";

export class DiscussionViewRoute {
    // Attributes
    authenticationMiddleware: AuthenticationMiddleware;
    discussionViewController: DiscussionViewController;

    // Ctor
    constructor(){
        this.authenticationMiddleware = new AuthenticationMiddleware();
        this.discussionViewController = new DiscussionViewController();
    }

    // Method
    getRoute(){
        return Router()
            .get("/1", this.discussionViewController.getDetail())
            .get("/1/comment", this.discussionViewController.getComments())
    }
}