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
            .get("/:idDiskusi", this.authenticationMiddleware.authenticate(), this.discussionViewController.getDetail())
            .get("/comment/:idDiskusi", this.authenticationMiddleware.authenticate(), this.discussionViewController.getCommentsById())
            .post("/comment/add",this.authenticationMiddleware.authenticate(), this.discussionViewController.addComment())
            .get("/comment/upvote/:id", this.discussionViewController.upVote())
            .get("/comment/downvote/:id", this.discussionViewController.downVote())
            .get("/comment/:idDiskusi/maxPage", this.discussionViewController.getMaxPage())
            .get("/comment/:idDiskusi/page", this.discussionViewController.getCommentsByIDDiskusiPage())
    }
}