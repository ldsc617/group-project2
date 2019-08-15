//Think of this as a log in home page
// this page handles checking the user's name with their password and then routes them to the main index page 

var db = require("../models");
// const bcrypt = require('bcrypt');

// to validtate information the user sends us
// const { check, validationResult } = require('express-validator');

function session(app){

    // authenticating the user
    app.post("/compare/users", (req, res) => {
        var {username, password} = req.body;

        db.people.findAll({})
        .then((data) => {
            
            var userID = data.find((x) => {
                // Uname and Upassword might be changed due to table structure
                if (username == x.usernameX && password == x.password1X){
                    return x
                }
            });
            console.log("---------------")
            console.log(userID.dataValues.id)
            console.log("---------------")
            if (userID){
                // Uid might be changed due to table structure && only giving user id so the password isnt send
                req.session.user = userID.dataValues.id;
                // "/" might be where the user is authenticated and see their info
                return res.redirect("/");
            } else {
                req.flash('err2', 'Username and/or Password is incorrect');
                return res.redirect("/login");
            }

        })
    })

    // new user making a account
    app.post("/create/account", (req, res) => { 
        var { name, username, password1, password2 } = req.body;
        // were all the inputs entered
        if (name, username, password1, password2){
            // do both paswords match 
            if ( password1 == password2 ){
                // const errors = validationResult(req);
                // does the email entered pass the express-validor email check
                // if (!errors.isEmpty()){
                    // req.flash('err', 'Invalid Email');
                    // return res.redirect("/register");
                // } else {
                    db.people.create({
                        nameX: name,
                        usernameX: username,
                        password1X: password1
                    })
                    .then((data) => {
                        console.log(data + " added")
                        return res.redirect("/login")
                    })
                // }
            } else {
                req.flash('err', 'Passwords do not match');
                return res.redirect("/register");
            }
        } else {
            req.flash('err', 'All fields must to be entered');
            return res.redirect("/register");
        }
    })

    // since the session holds the user id we will send that unique number to recieve it back to send the proper information
    app.get("/get/user", (req, res) => {
        return res.json(req.session.user)
    })

    // after the browser confims the id and password display the hom post pade with the data below
    // look up what => is a replacement for function()
    app.get('/user/:id', (req, res) =>{
        var id = req.params.id;
        // making sure that session id matches the information we will be sending back
        if (id == req.session.user){
            db.findOne({
                where: {
                    Uid: id
                }
            }).then((data) => {
                var send = {name: data[0].Uname};
                console.log(send)
                return res.json(send);
            })} else {
            // for a weird situation that they do not match or someone is trying to use this url as an api it wont work
            req.session.destroy((err) => {
                if (err){
                    // maybe a flash err could be here
                    return res.redirect("/");
                } else {
                    return res.redirect("/login");
                }
            })
        }
    })

    // destroying the session when the user logs out
    app.post("/logout/user", (req, res) => {
        req.session.destroy((err) => {
            if (err){
                return res.redirect("/");
            } else {
                return res.redirect("/login");
            }
        })
    })

    // for displaying any errors when creating a account
    app.get("/check/errors", (req, res) => {
        res.send(req.flash("err"));
    })

    // for displaying any errors when a user trying to login
    app.get("/login/errors", (req, res) => {
        res.send(req.flash("err2"));
    })

}

module.exports = session;