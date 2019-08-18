module.exports = function (sequelize, DataTypes) {

    var comments = sequelize.define("comments", {
        comment: DataTypes.STRING,
    });

    comments.associate = function(models) {
        comments.belongsTo(models.posts, {
            foreignKey: {
                allowNull: false
            }
        });
        comments.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return comments

};