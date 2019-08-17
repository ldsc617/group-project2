var db = require("../models");
// var Op = require("sequelize").Op;

module.exports = function(app) {
  // Get all examples1 ex: use this for creating users/Authors ( it has been tested and works )
  app.get("/api/all/:cat", function(req, res) {
    db.posts
      .findAll({
        where: {
          category: req.params.cat
        },
        include: [db.Users]
      })
      .then(function(all) {
        // console.log(all[0].dataValues.question);
        console.log(all[0].dataValues.User.dataValues.nameX);
        console.log(all[0].dataValues.User.dataValues.category);
        var allx = [];
        for (i = 0; i < all.length; i++) {
          allx.push({
            question: all[i].dataValues.question,
            name: all[i].dataValues.User.dataValues.nameX,
            cat: all[i].dataValues.User.dataValues.category
          });
        }
        res.json(allx);
      });
  });

  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Post
  //
  // ( it has been tested and works )
  app.get("/api/User/:id", function(req, res) {
    db.posts
      .findAll({
        where: {
          UserId: req.session.user.id
        }
        // include: [db.Users]
      })
      .then(function(dbUsers) {
        res.json(dbUsers);
      });
  });

  // Create a new Question ( it has been tested and works )
  app.post("/api/post", function(req, res) {
    var question = req.body.question;
    var UserId = parseInt(req.body.UserID);
    var category = req.body.cat;

    if (category === "0") {
      req.flash("err3", "You have to select a category");
      return res.send(req.flash("err3"));
    } else {
      db.posts
        .create({
          question: question,
          category: category,
          UserId: UserId
        })
        .then(function(data) {
          res.json(data);
        });
    }
  });

  app.get("/question/errors", function(req, res) {
    res.send(req.flash("err3"));
  });

  // Delete an User by id ==== Should this be moved for an admin function?
  app.delete("/api/Users/:id", function(req, res) {
    db.Users.destroy({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.put("/change/:cat", function(req, res) {
    var category = req.params.cat;
    db.Users.update(
      {
        category: category
      },
      {
        where: {
          id: req.session.user.id
        }
      }
    ).then(function(data) {
      res.json(data);
    });
  });

  // and now use the same example code below for creating a post
  // this example code is also missing a put/ update request. Would we like to add one to allow
  // editing/ updating posts? Im going to assume yes

  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // Create a new example
  //
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // Delete an example by id
  //
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });
};

// Would we need a put request here as well for updating the author to admin status?
// and if so whould something like this work?
//// app.put("/api/Users/:id", function(req, res) {
////   db.Users.destroy({ where: { id: req.params.id } }).then(function(
////     dbUsers
////   ) {
////     res.json(dbUsers);
////   });
//// });
