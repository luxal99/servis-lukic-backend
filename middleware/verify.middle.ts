import * as jwt from "jsonwebtoken"
import {DENIED_MESSAGE, HTTP_STATUS_FORBIDDEN, TOKEN_NAME} from "../const/const";

module.exports = function verify(req, res, next) {
    const token = req.header(TOKEN_NAME);

    if (!token) return res.status(HTTP_STATUS_FORBIDDEN).send({message: DENIED_MESSAGE});

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (e) {

    }
}
