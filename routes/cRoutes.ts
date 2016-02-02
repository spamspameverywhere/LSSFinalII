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

router.post("/:title", (req, res, next) => {
  let newComment = new Comment();
  newComment.commentText = req.body.commentText;
  newComment.postedTo = req.body.postedTo;
  newComment.commenter = req.body.commenter;
  newComment.commenterName = req.body.commenterName;
  newComment.save((error, newComment) => {
    if (error) return next(error);
    User.update({_id: newComment.origPoster}, {$push: {"comments": newComment._id}}, (error, comment) => {
      if (error) return next(error);
      res.send({comment});
    });
  });
});

////////////////////////
///Export
////////////////////////

export = router;
