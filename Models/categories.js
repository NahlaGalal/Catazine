const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema({
  name: String,
  articles: {
    type: [Schema.Types.ObjectId],
    ref: "articles"
  }
});

module.exports = mongoose.model("category", Category);
