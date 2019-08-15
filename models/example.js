module.exports = function(sequelize, DataTypes) {
  var people = sequelize.define("people", {
    nameX: DataTypes.STRING,
    usernameX: DataTypes.STRING,
    password1X: DataTypes.STRING
  });



  return people;
};
