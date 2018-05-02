const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectID = Schema.Types.ObjectId;

let commentSchema = new Schema({
        author: String,
        comment: String 
    });

Comment = mongoose.model("Comment", commentSchema);

exports.commentModel = Comment;