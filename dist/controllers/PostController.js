"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("../const/const");
var PostService_1 = require("../service/PostService");
var verify = require("../middleware/verify.middle");
var PostController = /** @class */ (function () {
    function PostController(app) {
        this.app = app;
        this.routes();
    }
    PostController.prototype.routes = function () {
        this.app.post(const_1.POST_ROUTE, verify, function (req, res) {
            try {
                new PostService_1.PostService().save({
                    title: req.body.title,
                    description: req.body.description,
                    image: req.body.image
                }).then(function () {
                    res.sendStatus(200);
                });
            }
            catch (e) {
                res.sendStatus(500);
            }
        });
        this.app.delete(const_1.POST_ROUTE, verify, function (req, res) {
            try {
                new PostService_1.PostService().delete(req.query.id).then(function () {
                    res.sendStatus(200);
                });
            }
            catch (e) {
                res.sendStatus(500);
            }
        });
    };
    return PostController;
}());
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map