"use strict";
var express = require("express");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Post = mongoose.model("Post");
var Comment = mongoose.model("Comment");
var newComment = mongoose.model("Comment");
var router = express.Router();
router.post("/addComment", function (req, res, next) {
    var newComment = new Comment(req.params.newComment);
    newComment.timestamps = req.params.timestamps;
    newComment.commentText = req.params.commentText;
    newComment.postedTo = req.params.postedTo;
    newComment.commenter = req.params.commenter;
    newComment.commenterName = req.params.commenterName;
    newComment.save(function (error, newComment) {
        if (error)
            return next(error);
        User.update({ _id: newComment.commenter }, { $push: { "comments": newComment._id } }, function (error, newComment) {
            if (error)
                return next(error);
            res.send({ newComment: newComment });
        });
    });
});
module.exports = router;
