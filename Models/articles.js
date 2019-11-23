const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Article = new Schema({
  header: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  content: {
    type: String,
    raquired: true
  },
  tags: [String],
  category: {
    type: String,
    required: true,
    ref: "category"
  },
  user: {
    type: {
      userId: Schema.Types.ObjectId,
      name: String
    },
    required: true,
    ref: "users"
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "comment"
  }
});

module.exports = mongoose.model("article", Article);
