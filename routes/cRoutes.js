"use strict";
var express = require("express");
var mongoose = require("mongoose");
var Comment = mongoose.model("Comment");
var newComment = mongoose.model("Comment");
var Post = mongoose.model("Post");
var User = mongoose.model("User");
var router = express.Router();
router.post("/addComment", function (req, res, next) {
    var newComment = new Comment();
    newComment.timestamps = req.body.timestamps;
    newComment.commentText = req.body.commentText;
    newComment.postedTo = req.body.postedTo;
    newComment.postedToTitle = req.body.postedToTitle;
    newComment.commenterName = req.body.commenterName;
    newComment.save(function (error, newComment) {
        if (error)
            return next(error);
        Post.update({ _id: newComment.postedTo }, { $push: { "comments": newComment._id } }, function (error, comment) {
            if (error)
                return next(error);
            User.update({ username: newComment.commenterName }, { $push: { "uComments": newComment._id } }, function (error, comment) {
                if (error)
                    return next(error);
                res.send({ newComment: newComment });
            });
        });
    });
});
router.get("/:_id", function (req, res, next) {
    Comment.findOne({ _id: req.params["_id"] })
        .populate("postedTo", "title")
        .exec(function (error, oneComment) {
        if (error)
            return next(error);
        if (!oneComment)
            return next({ message: "No comment" });
        res.send(oneComment);
    });
});
module.exports = router;
