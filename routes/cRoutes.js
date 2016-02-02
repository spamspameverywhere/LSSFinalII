"use strict";
var express = require("express");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Post = mongoose.model("Post");
var Comment = mongoose.model("Comment");
var newComment = mongoose.model("Comment");
var router = express.Router();
router.post("/:title", function (req, res, next) {
    var newComment = new Comment();
    newComment.commentText = req.body.commentText;
    newComment.postedTo = req.body.postedTo;
    newComment.commenter = req.body.commenter;
    newComment.commenterName = req.body.commenterName;
    newComment.save(function (error, newComment) {
        if (error)
            return next(error);
        User.update({ _id: newComment.origPoster }, { $push: { "comments": newComment._id } }, function (error, comment) {
            if (error)
                return next(error);
            res.send({ comment: comment });
        });
    });
});
module.exports = router;
