var db = require("../models");
var Op = require("sequelize").Op

module.exports = function (app) {
  // Get all examples1 ex: use this for creating users/Authors ( it has been tested and works )
  app.get("/api/all/:cat", function (req, res) {
    db.posts.findAll({
      where: {
        category: req.params.cat
      },
      // include: [db.Users]
    }).then(function (all) {
      res.json(all);
    });
  });

  // Create a new example
  app.post("/api/post", function (req, res) {
    db.posts.create(req.body).then(function (data) {
      res.json(data);
    })
  })
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    // 
    // ( it has been tested and works )
    app.get("/api/User/:id", function (req, res) {
      db.posts.findAll({
        where: {
          UserId: req.session.user.id
        },
        // include: [db.Users]
      }).then(function (dbUsers) {
        res.json(dbUsers);
      });
    });

    // Create a new Question ( it has been tested and works )
    app.post("/api/post", function (req, res) {
      var question = req.body.question;
      var UserId = parseInt(req.body.UserID);
      var category = req.body.cat;

      if (category == "0") {
        req.flash('err3', 'You have to select a category');
        return res.send(req.flash("err3"));
      } else {

        db.posts.create({
          question,
          category,
          UserId
        }).then((data) => {
          res.json(data);
        });

      }

    });

    app.get("/question/errors", (req, res) => {
      res.send(req.flash("err3"));
    })


    // Delete an User by id ==== Should this be moved for an admin function?
    app.delete("/api/Users/:id", function (req, res) {
      db.Users.destroy({ where: { id: req.params.id } }).then(function (dbUsers) {
        res.json(dbUsers);
      });
    });

    app.put("/change/:cat", (req, res) => {
      var category = req.params.cat;
      db.Users.update({
        category
      }, {
          where: {
            id: req.session.user.id
          }
        })
        .then((data) => {
          res.json(data)
        })
    })
  };