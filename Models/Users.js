const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	team: {
		type: String,
		required:  true
	},
	facebookLink: {
		type: String,
		required: true
	},
	twitterLink: {
		type: String,
		required: true
	},
	googlePlusLink: {
		type: String,
		required: true
	},
	resetToken: String,
	articles: {
		type: [Schema.Types.ObjectId],
		ref: "Article"
	}
});

module.exports = mongoose.model("users", Users);
