const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  facebook: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
    required: true
  },
  google: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
  articles: {
    type: [
      {
        _id: Schema.Types.ObjectId,
        header: String
      }
    ],
    ref: "Article"
  },
  numComments: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("users", Users);
