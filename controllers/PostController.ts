import {Request, RequestHandler, Response} from "express";
import {HTTP_STATUS_BAD_GATEWAY, PATH, POST_ROUTE} from "../const/const";
import {PostService} from "../service/PostService";
import {Post} from "../models/Post";

const fileUpload = require('express-fileupload');
const verify = require("../middleware/verify.middle")

export class PostController {

    constructor(private app: any) {
        this.routes();
    }

    routes() {
        this.app.post(POST_ROUTE, verify, (req: Request, res: Response) => {
            try {
                if (req.files) {
                    const file = req.files.file;
                    const uploadPath = PATH + file.name;

                    file.mv(uploadPath, (err) => {
                        if (err) res.status(HTTP_STATUS_BAD_GATEWAY).send({err});
                    })

                    new PostService().save({
                        title: req.body.title,
                        description: req.body.description,
                        image: 'img/uploads/' + file.name
                    }).then(() => {
                        res.sendStatus(200)
                    })
                }
            } catch (e) {
                res.sendStatus(500)
            }
        });

        this.app.get(POST_ROUTE + '/' + 'lastThree', async (req: Request, res: Response) => {
            try {
                await new PostService().get().subscribe((posts) => {
                    posts = posts.reverse().slice(0, 4);
                    res.send(posts)
                })
            } catch (e) {
                res.status(HTTP_STATUS_BAD_GATEWAY).send({e});
            }
        })

        this.app.put(POST_ROUTE, verify, (req: Request, res: Response) => {
            try {
                if (req.files) {
                    const file = req.files.file;
                    const uploadPath = PATH + file.name;

                    file.mv(uploadPath, (err) => {
                        if (err) res.status(HTTP_STATUS_BAD_GATEWAY).send({err});
                    })

                    new PostService().update({
                        id: req.body.id,
                        title: req.body.title,
                        description: req.body.description,
                        image: uploadPath
                    }).then(() => {
                        res.sendStatus(200)
                    })
                }
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
