var express = require("express"),
    bodyParser = require("body-parser"),
    hbs = require("hbs"),
    path = require("path"),
    session = require("express-session"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    routes = require("./app/routes/routes"),
    app = express();


app.use("/static", express.static(path.join(__dirname, "app/client")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "itsAMeLuigi",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "hbs");

routes(app, passport);

mongoose.connect("mongodb://localhost/blog");
app.listen(8080, function() {
    console.log("Blog is Running");
});