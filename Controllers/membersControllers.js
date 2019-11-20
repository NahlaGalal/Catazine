const User = require("../Models/Users");
const Article = require("../Models/articles");

exports.getMembers = (req, res, next) => {
  const MAX_USER = 6;
  let numMembers;
  const page = +req.query.page || 1;
  User.find()
    .countDocuments()
    .then(num => {
      numMembers = num;
      return User.find()
        .skip((page - 1) * MAX_USER)
        .limit(MAX_USER);
    })
    .then(members => {
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
  let numArticles, userArticles;
  Article.find({ userId })
    .countDocuments()
    .then(num => {
      numArticles = num;
      return Article.find({ userId })
        .skip((page - 1) * MAX_ARTICLES)
        .limit(MAX_ARTICLES);
    })
    .then(articles => {
      userArticles = articles;
      return User.findById(userId);
    })
    .then(member => {
      res.render("MemberArticles", {
        title: "Member article",
        docType: "",
        member,
        currentPage: page,
        lastPage: Math.ceil(numArticles / MAX_ARTICLES),
        articles: userArticles
      });
    }).catch(err => console.log(err))
};
