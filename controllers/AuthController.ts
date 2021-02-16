import {AUTH_ROUTE, HTTP_STATUS_BAD_GATEWAY, HTTP_STATUS_FORBIDDEN, TOKEN_NAME} from "../const/const";
import {AuthService} from "../service/AuthService";
import * as jwt from "jsonwebtoken";
import {Request, Response} from "express";

export class AuthController {

    constructor(private app: any) {
        this.routes();
    }


    private routes() {
        this.app.post(AUTH_ROUTE, async (req: Request, res: Response) => {
            try {
                new AuthService().auth(req.body).subscribe((user) => {
                    if (user) {
                        const token = jwt.sign({
                            id: user.id,
                            username: user.username
                        }, process.env.TOKEN_SECRET, {expiresIn: '2h'})
                        res.header(TOKEN_NAME, token).send({token});

                    } else {
                        res.sendStatus(HTTP_STATUS_FORBIDDEN)
                    }
                })
            } catch (e) {
                res.status(HTTP_STATUS_BAD_GATEWAY).send(e)
            }
        })
    }
}
