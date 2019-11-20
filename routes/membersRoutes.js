const express = require("express");

const membersControllers = require("../Controllers/membersControllers");

const router = express.Router();

router.get("/Members", membersControllers.getMembers);

router.get("/MemberArticles/:userId", membersControllers.getMemberArticles);

module.exports = router;
