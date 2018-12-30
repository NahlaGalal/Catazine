const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Articles = new Schema({
    Date: Date,
    Title: String,
    Subject: String,
    Category: String,
    Tags: Array,
})

const Users = new Schema({
    Name: String,
    NumPosts: Number,
    NumComms: Number,
    Facebook: String,
    Twitter: String,
    Google: String,
    Articles: [Articles]
})

const Article = mongoose.model("UserArticle", Users)

module.exports = Article