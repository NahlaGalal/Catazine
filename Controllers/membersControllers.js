const User = require("../Models/Users");
const Article = require("../Models/articles");

const mongoose = require("mongoose");

const arMonthes = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمير"
];

exports.getMembers = (req, res, next) => {
  const MAX_USER = 6;
  let numMembers, members;
  const page = +req.query.page || 1;
  User.find()
    .countDocuments()
    .then(num => {
      numMembers = num;
      return User.find()
        .skip((page - 1) * MAX_USER)
        .limit(MAX_USER);
    })
    .then(users => {
      members = users;
      res.render("Members", {
        title: "Members",
        docType: "/members",
        members,
        currentPage: page,
        lastPage: Math.ceil(numMembers / MAX_USER)
      });
    });
};

exports.getMemberArticles = (req, res, next) => {
  const MAX_ARTICLES = 3;
  const userId = req.params.userId;
  const page = +req.query.page || 1;
  let numArticles,
    userArticles = [];
  Article.find({ "user.userId": mongoose.Types.ObjectId(userId) })
    .countDocuments()
    .then(num => {
      numArticles = num;
      return Article.find({ "user.userId": mongoose.Types.ObjectId(userId) })
        .skip((page - 1) * MAX_ARTICLES)
        .limit(MAX_ARTICLES);
    })
    .then(articles => {
      articles.forEach(article => {
        const arMonth = arMonthes[article.date.getMonth()];
        const day = article.date.getDate();
        const year = article.date.getFullYear();
        userArticles.push({
          ...article._doc,
          date: `${day} ${arMonth} ${year}`
        });
      });
      return User.findById(userId);
    })
    .then(member => {
      res.render("MemberArticles", {
        title: `${member.name} Articles`,
        docType: "",
        member,
        currentPage: page,
        lastPage: Math.ceil(numArticles / MAX_ARTICLES),
        articles: userArticles
      });
    })
    .catch(err => console.log(err));
};
