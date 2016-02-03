"use strict";

////////////////////////
///Require modules
////////////////////////

import express = require("express");
let mongoose = require("mongoose");

let Post = mongoose.model("Post");
let Comment = mongoose.model("Comment");
let newComment = mongoose.model("Comment");

////////////////////////
///Router
////////////////////////

let router = express.Router();

////////////////////////
///POST: New Comment
////////////////////////

router.post("/addComment", (req, res, next) => {
  let newComment = new Comment();
  newComment.timestamps = req.body.timestamps;
  newComment.commentText = req.body.commentText;
  newComment.postedTo = req.body.postedTo;
  newComment.commenterName = req.body.commenterName;
  newComment.save((error, newComment) => {
    if (error) return next(error);
    Post.update({_id: newComment.postedTo}, {$push: {"comments": newComment._id}}, (error, comment) => {
      if (error) return next(error);
      res.send({newComment});
    });
  });
});

////////////////////////
///GET: User comments
////////////////////////

router.get("/:username", (req, res, next) => {
  Comment.find({commenterName: req.query["username"]})
  .exec((error, comments) => {
    if (error) return next(error);
    if (!comments) res.send([]);
    res.send({comments});
  });
});

////////////////////////
///Export
////////////////////////

export = router;
