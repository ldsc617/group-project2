var db = require("../models");

// to validtate information the user sends us
const { check, validationResult } = require('express-validator');

function session(app){

    // authenticating the user
    app.post("/compare/users", (req, res) => {
        var {username, password} = req.body;

        db.USER.findAll({})
        .then((data) => {
            
            var userID = data.find((x) => {
                // Uname and Upassword might be changed due to table structure
                if (username == x.Uname && password == x.Upassword){
                    return x
                }
            });
            
            if (userID){
                // Uid might be changed due to table structure && only giving user id so the password isnt send
                req.session.user = user.Uid;
                // "/" might be where the user is authenticated and see their info
                return res.redirect("/");
            } else {
                req.flash('err2', 'Username and/or Password is incorrect');
                return res.redirect("/login");
            }

        })
    })

    // new user making a account
    app.post("/create/account", [check("email").isEmail()], (req, res) => { 
        var { name, username, email, password1, password2 } = req.body;
        // were all the inputs entered
        if (name, username, email, password1, password2){
            // do both paswords match 
            if ( password1 == password2 ){
                const errors = validationResult(req);
                // does the email entered pass the express-validor email check
                if (!errors.isEmpty()){
                    req.flash('err', 'Invalid Email');
                    return res.redirect("/register");
                } else {
                    db.USER.create({
                        nameX: name,
                        usernameX: username,
                        emailX: email,
                        password1X: password1
                    })
                    .then((data) => {
                        console.log(data + " added")
                        return res.redirect("/login")
                    })
                }
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

    // after the browser gets the user id from up there a another function will be called to get the rest of the information
    app.get('/user/info/:id', (req, res) => {
        var id = req.params.id;
        // making sure that session id matches the information we will be sending back
        if (id == req.session.user){
            db.findOne({
                where: {
                    Uid: id
                }
            })
            .then((data) => {
                var send = {name: data[0].Uname};
                console.log(send)
                return res.json(send);
            })
        } else {
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