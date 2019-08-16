module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    nameX: DataTypes.STRING,
    usernameX: DataTypes.STRING,
    password1X: DataTypes.STRING
  });

  Users.associate = (models) => {
    Users.hasMany(models.posts, {
      onDelete: "cascade"
    });
  };

  return Users;
};

//below is a posible example to allow deletion? this would be inserted before return people;
//~~~~~~
// people.associate = function(models) {
//   // Associating User with Posts
//   // When an User is deleted, also delete any associated Posts
//   people.hasMany(models.Post, {
//     onDelete: "cascade"
//   });
