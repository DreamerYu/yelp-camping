//package imports
var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash    = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    seedDB = require("./seeds");

var User = require("./models/user");

//Route imports
var indexRoutes = require("./routes/index"),
    campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments");

var app = express();

mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());

//Passport Configuration
app.use(require("express-session")({
  secret: "Another Secret",
  resave: false,
  saveUninitialized: false
}));
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(3000, process.env.IP, (req, res) => {
  console.log("Server online");
});
