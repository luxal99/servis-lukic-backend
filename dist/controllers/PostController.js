"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("../const/const");
var PostService_1 = require("../service/PostService");
var fileUpload = require('express-fileupload');
var verify = require("../middleware/verify.middle");
var PostController = /** @class */ (function () {
    function PostController(app) {
        this.app = app;
        this.routes();
    }
    PostController.prototype.routes = function () {
        this.app.post(const_1.POST_ROUTE, verify, function (req, res) {
            try {
                if (req.files) {
                    var file = req.files.file;
                    var uploadPath = const_1.PATH + file.name;
                    file.mv(uploadPath, function (err) {
                        if (err)
                            res.status(const_1.HTTP_STATUS_BAD_GATEWAY).send({ err: err });
                    });
                    new PostService_1.PostService().save({
                        title: req.body.title,
                        description: req.body.description,
                        image: uploadPath
                    }).then(function () {
                        res.sendStatus(200);
                    });
                }
            }
            catch (e) {
                res.sendStatus(500);
            }
        });
        this.app.put(const_1.POST_ROUTE, verify, function (req, res) {
            try {
                if (req.files) {
                    var file = req.files.file;
                    var uploadPath = const_1.PATH + file.name;
                    file.mv(uploadPath, function (err) {
                        if (err)
                            res.status(const_1.HTTP_STATUS_BAD_GATEWAY).send({ err: err });
                    });
                    new PostService_1.PostService().update({
                        id: req.body.id,
                        title: req.body.title,
                        description: req.body.description,
                        image: uploadPath
                    }).then(function () {
                        res.sendStatus(200);
                    });
                }
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
        this.app.get(const_1.POST_ROUTE, function (req, res) {
            try {
                new PostService_1.PostService().get().subscribe(function (posts) {
                    res.send(posts);
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