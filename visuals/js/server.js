require("dotenv").config();
var express = require("express");
var session = require("express-session");
var flash = require("connect-flash");
var path = require("path");

var db = require("../../models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/index.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/js/index.js"));
});

// app.get("/comment.js", function(req, res) {
//   res.sendFile(path.join(__dirname, "/public/js/comment.js"));
// });

app.get("/styles.css", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/styles/styles.css"));
});

// for express to use session
app.use(
  session({
    name: "sessionName",
    secret: "thisMightHaveToBeInTheDotenvPlace",
    resave: false,
    saveUninitialized: false
  })
);

// for flashing messages
app.use(flash());

// Routes
require("../../routes/apiRoutes")(app);
require("../../routes/htmlRoutes")(app);
require("../../routes/sessionHandler")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
