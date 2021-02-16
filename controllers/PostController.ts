import {Request, Response} from "express";
import {POST_ROUTE} from "../const/const";
import {PostService} from "../service/PostService";

const verify = require("../middleware/verify.middle")

export class PostController {

    constructor(private app: any) {
        this.routes();
    }

    routes() {
        this.app.post(POST_ROUTE, verify, (req: Request, res: Response) => {
            try {
                new PostService().save({
                    title: req.body.title,
                    description: req.body.description,
                    image: req.body.image
                }).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {
                res.sendStatus(500)
            }
        });

        this.app.put(POST_ROUTE, verify, (req: Request, res: Response) => {
            try {
                new PostService().update({
                    id: req.body.id,
                    title: req.body.title,
                    description: req.body.description,
                    image: req.body.image
                }).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {
                res.sendStatus(500)
            }
        });

        this.app.delete(POST_ROUTE, verify, (req: Request, res: Response) => {
            try {
                new PostService().delete(req.query.id).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {
                res.sendStatus(500)
            }
        });

        this.app.get(POST_ROUTE, (req: Request, res: Response) => {
            try {
                new PostService().get().subscribe((posts) => {
                    res.send(posts)
                })
            } catch (e) {
                res.sendStatus(500)
            }
        })
    }
}
