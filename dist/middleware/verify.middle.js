"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var const_1 = require("../const/const");
module.exports = function verify(req, res, next) {
    var token = req.header(const_1.TOKEN_NAME);
    if (!token)
        return res.status(const_1.HTTP_STATUS_FORBIDDEN).send({ message: const_1.DENIED_MESSAGE });
    try {
        var verified = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (e) {
    }
};
//# sourceMappingURL=verify.middle.js.map