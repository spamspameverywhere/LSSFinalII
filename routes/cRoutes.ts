"use strict";

////////////////////////
///Require modules
////////////////////////

import express = require("express");
let mongoose = require("mongoose");

let Comment = mongoose.model("Comment");
let newComment = mongoose.model("Comment");
let Post = mongoose.model("Post");
let User = mongoose.model("User");

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
  newComment.postedToTitle = req.body.postedToTitle;
  newComment.commenterName = req.body.commenterName;
  newComment.save((error, newComment) => {
    if (error) return next(error);
    Post.update({_id: newComment.postedTo}, {$push: {"comments": newComment._id}}, (error, comment) => {
      if (error) return next(error);
      User.update({username: newComment.commenterName}, {$push: {"uComments": newComment._id}}, (error, comment) => {
        if (error) return next(error);
        res.send({newComment});
      });
    });
  });
});

////////////////////////
///GET: Single comment
////////////////////////

router.get("/:_id", (req, res, next) => {
  Comment.findOne({_id: req.params["_id"]})
  .populate("postedTo", "title")
  .exec((error, oneComment) => {
    if (error) return next(error);
    if (!oneComment) return next({message: "No comment"});
    res.send(oneComment)
  });
});

////////////////////////
///Export
////////////////////////

export = router;
