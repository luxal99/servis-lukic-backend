import {Express, Request, Response} from "express";
import {POST_ROUTE} from "../const/const";
import {PostService} from "../service/PostService";

export class PostController {

    constructor(private app: any,private connection) {
        this.routes();
    }

    routes() {
        this.app.post(POST_ROUTE, async (req: Request, res: Response) => {
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
        })
    }
}
