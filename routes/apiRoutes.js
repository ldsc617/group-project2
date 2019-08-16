var db = require("../models");

module.exports = function(app) {
  // Get all examples1 ex: use this for creating users/Authors
  app.get("/api/User", function(req, res) {
    db.Users.findAll({
      include: [db.CreatePosts]
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/api/User/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Users.findOne({
      where: {
        id: req.params.id
      },
      include: [db.CreatePosts]
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create a new Question
  app.post("/api/Users", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Would we need a put request here as well for updating the author to admin status?
  // and if so whould something like this work?
  //// app.put("/api/Users/:id", function(req, res) {
  ////   db.Users.destroy({ where: { id: req.params.id } }).then(function(
  ////     dbUsers
  ////   ) {
  ////     res.json(dbUsers);
  ////   });
  //// });

  // Delete an User by id ==== Should this be moved for an admin function?
  app.delete("/api/Users/:id", function(req, res) {
    db.Users.destroy({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.json(dbUsers);
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
