"use strict";
var express = require("express");
var expjwt = require("express-jwt");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Post = mongoose.model("Post");
var newPost = mongoose.model("Post");
var auth = expjwt({
    userProperty: "payload",
    secret: process.env.JWT_SECRET
});
var router = express.Router();
router.get("/", function (req, res, next) {
    Post.find({})
        .exec(function (error, posts) {
        if (error)
            return next(error);
        if (!posts)
            res.send([]);
        res.send({ posts: posts });
    });
});
router.post("/addPost", function (req, res, next) {
    var newPost = new Post();
    newPost.title = req.body.title;
    newPost.imageUrl = req.body.imageUrl;
    newPost.postText = req.body.postText;
    newPost.origPoster = req.body.origPoster;
    newPost.origPosterName = req.body.origPosterName;
    newPost.save(function (error, newPost) {
        if (error)
            return next(error);
        User.update({ _id: newPost.origPoster }, { $push: { "uPosts.postsOwn": newPost._id } }, function (error, post) {
            if (error)
                return next(error);
            res.send({ newPost: newPost });
        });
    });
});
router.get("/:title", function (req, res, next) {
    Post.findOne({ title: req.params["title"] })
        .populate("comments")
        .exec(function (error, onePost) {
        if (error)
            return next(error);
        if (!onePost)
            return next({ message: "No post" });
        res.send(onePost);
    });
});
router.put("/:title", function (req, res, next) {
    Post.findOneAndUpdate({ title: req.params["title"] }, req.body, { new: true }, function (error, onePost) {
        if (error)
            return next(error);
        if (!onePost)
            return next({ message: "No post" });
        res.send(onePost);
    });
});
router.delete("/:username/:title", function (req, res, next) {
    if (!req.query._id)
        return next({ message: "No post" });
    Post.remove({ _id: req.query._id }, function (error, result) {
        res.send({ message: "Post deleted" });
    });
});
module.exports = router;
