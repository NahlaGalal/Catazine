const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users"
  },
  articleId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "article"
  }
})

module.exports = mongoose.model("comment", Comment);