module.exports = function(sequelize, DataTypes) {
  var people = sequelize.define("people", {
    nameX: DataTypes.STRING,
    usernameX: DataTypes.STRING,
    emailX: DataTypes.STRING,
    password1X: DataTypes.STRING
  });
  return people;
};

// nameX: name,
// usernameX: username,
// emailX: email,
// password1X: password1

