"use strict";
var express = require("express");
var mongoose = require("mongoose");
var Post = mongoose.model("Post");
var Comment = mongoose.model("Comment");
var newComment = mongoose.model("Comment");
var router = express.Router();
router.post("/addComment", function (req, res, next) {
    var newComment = new Comment();
    newComment.timestamps = req.body.timestamps;
    newComment.commentText = req.body.commentText;
    newComment.postedTo = req.body.postedTo;
    newComment.commenterName = req.body.commenterName;
    newComment.save(function (error, newComment) {
        if (error)
            return next(error);
        Post.update({ _id: newComment.postedTo }, { $push: { "comments": newComment._id } }, function (error, comment) {
            if (error)
                return next(error);
            res.send({ newComment: newComment });
        });
    });
});
module.exports = router;
