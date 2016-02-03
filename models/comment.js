"use strict";
var mongoose = require("mongoose");
var CommentSchema = new mongoose.Schema({
    timestamps: Date,
    commentText: String,
    postedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    commenterName: String
});
exports.Comment = mongoose.model("Comment", CommentSchema);
exports.newComment = mongoose.model("newComment", CommentSchema);
