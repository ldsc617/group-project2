module.exports = function(sequelize, DataTypes) {
  var posts = sequelize.define("posts", {
    question: DataTypes.STRING
  });

  posts.associate = (models) => {
    posts.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return posts;
};

//possible example take from in class blog activity
//to be nsertev before return posts
// title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       len: [1]
//     }
//   },
//   body: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//     len: [1]
//   }
// });
// Post.associate = function(models) {
//   // We're saying that a Post should belong to an Author
//   // A Post can't be created without an Author due to the foreign key constraint
//   Post.belongsTo(models.Author, {
//     foreignKey: {
//       allowNull: false
//     }
//   });
// };
