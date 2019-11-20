const express = require("express");

const generalControllers = require("../Controllers/generalControllers");

const router = express.Router();

router.get("/Contact", generalControllers.getContact);

router.get("/About", generalControllers.getAbout);

module.exports = router;