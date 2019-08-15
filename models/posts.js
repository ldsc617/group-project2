module.exports = function (sequelize, DataTypes) {
    var posts = sequelize.define ("posts", {
        question: DataTypes.STRING

    });
return posts;
};