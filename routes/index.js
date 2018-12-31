var express = require("express");
var router = express.Router();
var passport = require("passport");
var tokenGen = require("randomstring");
var User = require("../models/user");
var Mailer = require('../services/Mailer');
var verifyTemplate = require('../services/templates/verifyTemplate');

//Root Route
router.get("/", (req, res) => {
  res.render("landing");
});



//===========================
//AUTH Routes
//===========================

//show register form
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  console.log(req.body.username)
  var verifyToken = tokenGen.generate();
  User.findOne({email: req.body.email}, (err, test) => {
    if(err) {
      console.log(err);
    } else {
      if(test != null) {
        req.flash("error", "That email is already in use");
        return res.redirect("register");
      }
    }
  });
  var newUser = new User({
    email: req.body.email,
    username: req.body.username,
    token: verifyToken,
    verified: false
  });
  User.register(newUser, req.body.password, async (err, user) => {
    if(err) {
      req.flash("error", err.message);
      console.log(err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      var mailer = new Mailer(user.email, verifyTemplate(user._id, user.token));
      mailer.send().catch(err => {
        console.log(err);
        res.status(422).send(err);
      }).then(() => {
        res.redirect("/verify");
      });
    });
  });
});

//show login form
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), (req, res) => {
});

//logout route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged you out.");
  res.redirect("/campgrounds");
});

router.get("/reset", (req, res) => {

});

router.get("/verify", (req, res) => {
  res.render("checkemail");
});

router.get("/verify/:id/:token", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if(err) {
      console.log(err);
    } else {
      if(req.params.token == user.token) {
        user.verified = true;
        user.token = null;
        user.save();
        res.redirect("/campgrounds");
      }
    }
  });
});


module.exports = router;
