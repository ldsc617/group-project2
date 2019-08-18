var db = require("../models");
var path = require("path");

module.exports = function(app) {

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

  app.get("/post/:id", function(req, res) {
    if (!req.session.user) {
      return res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/comment.html")); //("create")
  });

};


// app.get("/api/post/:id", function(req, res){
    
// })