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
            .get("/comment/:idDiskusi/maxPage", this.discussionViewController.getMaxPage())
            .get("/comment/:idDiskusi/page", this.discussionViewController.getCommentsByIDDiskusiPage())
            .post("/comment/add",this.authenticationMiddleware.authenticate(), this.discussionViewController.addComment())
            .get("/comment/upvote/:id_komentar/:id_pengguna", this.discussionViewController.upVote())
            .get("/comment/downvote/:id_komentar/:id_pengguna", this.discussionViewController.downVote())
            .get("/comment/confirmvote/:id_komentar/:id_pengguna", this.discussionViewController.confirmVote())
            .get("/comment/getvote/:id_komentar", this.discussionViewController.getVote())
    }
}