// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

//path exits in models can I use it here?
var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // at route / get and render index.handlebars page
  // Example is a var found in example.js I believe this provides the sequlized database data??

  // Still not sure where msg: "welcome come into play"

  app.get("/", function(req, res) {
    if (!req.session.user) {
      return res.redirect("/login");
    } else {
      db.Users.findAll({}).then(function() {
        res.sendFile(path.join(__dirname, "../public/index.html"));
      });
    }
  });

  app.get("/register", function(req, res) {
    if (req.session.user) {
      return res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/create.html")); //("create")
  });

  app.get("/login", function(req, res) {
    if (req.session.user) {
      return res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/login.html")); //("login")
  });
};
