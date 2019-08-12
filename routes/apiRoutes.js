var db = require("../models");

module.exports = function(app) {
  // Get all examples1 ex: use this for creating users/Authors
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Would we need a put request here as well for updating the author to admin status?
  // and if so whould something like this work?
  //// app.put("/api/examples/:id", function(req, res) {
  ////   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  ////     dbExample
  ////   ) {
  ////     res.json(dbExample);
  ////   });
  //// });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  // and now use the same example code below for creating a post
  // this example code is also missing a put/ update request. Would we like to add one to allow
  // editing/ updating posts? Im going to assume yes
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
