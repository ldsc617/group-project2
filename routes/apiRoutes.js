var db = require("../models");
var Op = require("sequelize").Op;

module.exports = function(app) {
  // Get all examples1 ex: use this for creating users/Authors ( it has been tested and works )
  app.get("/api/all/:cat", function(req, res) {
    db.posts
      .findAll({
        where: {
          UserId: {
            [Op.not]: req.session.user.id
          }
        },
        include: [db.Users]
      })
      .then(function(all) {
        // console.log(all[0])
        var allx = [];
        // console.log(all[0].dataValues.category);
        // console.log(all[0].User.dataValues);
        for (i = 0; i < all.length; i++) {
          if (all[i].category == req.params.cat){
            allx.push({
              QID: all[i].id,
              question: all[i].question,
              name: all[i].User.dataValues.nameX
            });
          }
        }
        // console.log(allx)
        res.json(allx);
      });
  });

  app.get("/api/User/:id", function(req, res) {
    db.posts
      .findAll({
        where: {
          UserId: req.session.user.id
        },
        include: [db.Users]
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
      res.json({category: category});
    });
  });
  
  // for comments

  app.get("/api/post/:id", function(req, res){
    db.posts.findOne({
      where: {
        id: req.params.id
      },
      include: db.comments
    })
    .then(function(data){
      // console.log(data.dataValues);
      res.json(data);
    })
  })

  app.post("/comment/post/:pid", function(req, res){
    var comment = req.body.comment;
    console.log(req.params.pid.split(",")[0]);
    db.comments.create({
      comment: comment,
      postId: req.params.pid.split(",")[0],
      UserId: req.session.user.id
    })
    .then(function(data){
      // console.log(data)
      res.json(data);
    })
  })

  app.get("/all/comments/:id", function(req, res){
    db.comments.findAll({
      where: {
        postId: req.params.id
      },
      include: db.Users
    })
    .then(function(data){
      // console.log(data)
      res.json(data)
    })
  })

};
