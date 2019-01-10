var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  token: String,
  verified: Boolean,
  resetPasswordToken: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
