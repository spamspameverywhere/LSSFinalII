"use strict";

////////////////////////
///Require modules
////////////////////////

import express = require("express");
let mongoose = require("mongoose");

let User = mongoose.model("User");
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
  let newComment = new Comment(req.params.newComment);
  newComment.timestamps = req.params.timestamps;
  newComment.commentText = req.params.commentText;
  newComment.postedTo = req.params.postedTo;
  newComment.commenter = req.params.commenter;
  newComment.commenterName = req.params.commenterName;
  newComment.save((error, newComment) => {
    if (error) return next(error);
    User.update({_id: newComment.commenter}, {$push: {"comments": newComment._id}}, (error, newComment) => {
      if (error) return next(error);
      res.send({newComment});
    });
  });
});

////////////////////////
///Export
////////////////////////

export = router;
