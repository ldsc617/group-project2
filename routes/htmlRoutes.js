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
    if (!req.session.userID){
      return res.redirect("/login")
    } else {
      db.people.findAll({}).then(function(dbExamples) {
        res.sendFile(path.join(__dirname, "../public/example.html"))
      });
    }
  });
  
  
  //Do we need similar app.get requests for each of the handlebar or html pages?
  // Ex: one for homepage/index, a second for a all posts page,
  // a third for a create a post page, a fourth for a admin's page?
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Load example.handlebars page and pass in an example by id
  // Ex: app load example handlebar page with the database information at this: id
  // once information at db id is found and loaded(.then) render and display the example.handlebar page


  // app.get("/example/:id", function(req, res) {
  //   db.people.findOne({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.sendFile(path.join(__dirname, "../public/example.html"))
  //   });
  // });


  // blog = name of handlebar rendering page
  // Post = the name of the var in the sequelize example in the example.js file in models file
  // dbPost = the name of the database itself
  // post = the name of the var in the handlebar template page referencing the database data
  // so ours might look like this
  //
  // app.get("/blog/:id", function(req, res) {
  //   db.Post.findOne({ where: { id: req.params.id } }).then(function(
  //     dbPost
  //   ) {
  //     res.render("blog", {
  //       post: dbPost
  //     });
  //   });
  // });
  //
  // or a page displaying a single author would look like this
  // contributors = name of handlebar rendering page
  // Author = the name of the var in the sequelize example in the example.js file in models file
  // dbAuthor = the name of the database itself
  // author = the name of the var in the handlebar template page referencing the database data
  // app.get("/contributors/:id", function(req, res) {
  //   db.Author.findOne({ where: { id: req.params.id } }).then(function(
  //     dbAuthor
  //   ) {
  //     res.render("contributors", {
  //       author: dbAuthor
  //     });
  //   });
  // });
  //
  //

  // testing stuff ----------------------------------------------------------------------------------------

  app.get("/register", (req, res) => {
    if (req.session.userID){
      return res.redirect("/")
    }
    res.sendFile(path.join(__dirname, "../public/create.html")) //("create")
  })

  app.get("/login", (req, res) => {
    if (req.session.userID){
      return res.redirect("/")
    }
    res.sendFile(path.join(__dirname, "../public/login.html")) //("login")
  })

  // finished testing ----------------------------------------------------------------------------------------


  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
  
};
