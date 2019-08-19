module.exports = function(sequelize, DataTypes) {
  var posts = sequelize.define("posts", {
    question: DataTypes.STRING,
    category: DataTypes.STRING
  });

  posts.associate = function(models) {
    posts.hasMany(models.comments, {
      onDelete: "cascade"
    });
    posts.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return posts;
};
