DROP DATABASE IF EXISTS porKdb;
CREATE DATABASE porKdb;
USE porKdb;
CREATE TABLE Users (
    UserID INT NOT NULL AUTO_INCREMENT,
    username VARCHAR (20) NOT NULL,
    userPassword VARCHAR (50) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (UserID)
    
);
USE porKdb;
CREATE TABLE CreatePosts (
    CreatePostsID INT NOT NULL AUTO_INCREMENT,
    fkUserID int,
    FOREIGN KEY (fkUserID) REFERENCES Users(UserID),
    Posts VARCHAR (255) NOT NULL,
    DateCreated DATETIME NOT NULL,
    Category VARCHAR (50) NOT NULL,  
    PRIMARY KEY (CreatePostsID)
);
USE porKdb;
CREATE TABLE Comments (
    CommentsID INT NOT NULL AUTO_INCREMENT,
    fkUserID int,
    FOREIGN KEY (fkUserID) REFERENCES Users (UserID),
    fkPost int,
    FOREIGN KEY (fkPost) REFERENCES CreatePosts (CreatePostsID),
    DateCreated DATETIME NOT NULL,
    Comment VARCHAR (255) NOT NULL,
    PRIMARY KEY (CommentsID)
);
select * from CreatePosts;