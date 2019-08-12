// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

//path exits in models can I use it here?
var db = require("../models");

module.exports = function(app) {
  // at route / get and render index.handlebars page
  // Example is a var found in example.js I believe this provides the sequlized database data??
  // Still not sure where msg: "welcome come into play"
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        // examples is the handlebar variable name for our database dbExamples
        examples: dbExamples
      });
    });
  });
  //Do we need similar app.get requests for each of the handlebar or html pages?
  // Ex: one for homepage/index, a second for a all posts page,
  // a third for a create a post page, a fourth for a admin's page?


  // Load example.handlebars page and pass in an example by id
  // my discription: 
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
