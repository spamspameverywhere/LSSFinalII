"use strict";

////////////////////////
///Require modules
////////////////////////

import express = require("express");
import expjwt = require("express-jwt");
let mongoose = require("mongoose");

let User = mongoose.model("User");
let Post = mongoose.model("Post");
let newPost = mongoose.model("Post");
let auth = expjwt({
  userProperty: "payload",
  secret: process.env.JWT_SECRET
});

////////////////////////
///Router
////////////////////////

let router = express.Router();

////////////////////////
///GET: All posts
////////////////////////

router.get("/", (req, res, next) => {
  Post.find({})
  .exec((error, posts) => {
    if (error) return next(error);
    if (!posts) res.send([]);
    res.send({posts});
  });
});

////////////////////////
///POST: New Post
////////////////////////

router.post("/addPost", (req, res, next) => {
  let newPost = new Post();
  newPost.title = req.body.title;
  newPost.imageUrl = req.body.imageUrl;
  newPost.postText = req.body.postText;
  newPost.origPoster = req.body.origPoster;
  newPost.origPosterName = req.body.origPosterName;
  newPost.save((error, newPost) => {
    if (error) return next(error);
    User.update({_id: newPost.origPoster}, {$push: {"uPosts.postsOwn": newPost._id}}, (error, post) => {
      if (error) return next(error);
      res.send({newPost});
    });
  });
});

////////////////////////
///GET: Single post
////////////////////////

router.get("/:title", (req, res, next) => {
  Post.findOne({title: req.params["title"]})
  .populate("comments")
  .exec((error, onePost) => {
    if (error) return next(error);
    if (!onePost) return next({message: "No post"});
    res.send(onePost)
  });
});

////////////////////////
///PUT: Edit Post
////////////////////////

router.put("/:title", (req, res, next) => {
  Post.findOneAndUpdate({title: req.params["title"]}, req.body, {new: true}, (error, onePost) => {
      if (error) return next(error);
      if (!onePost) return next({message: "No post"});
      res.send(onePost);
    });
});

////////////////////////
///DELETE: Delete Post
////////////////////////

router.delete("/:username/:title", (req, res, next) => {
  if (!req.query._id) return next({message: "No post"});
  Post.remove({_id: req.query._id}, (error, result) => {
    res.send({message: "Post deleted"});
  });
});

////////////////////////
///Export
////////////////////////

export = router;
