require("dotenv").config();
var express = require("express");
const session = require('express-session')
const passport = require('passport')

var db = require("./models");
var app = express();

app.use(session({secret: 'random-text'}));

require('./config/passport')(passport)

var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.static("public"));

app.set('view engine', 'ejs');

// Routes
require('./routes/apiRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/htmlRoutes')(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});


module.exports = app;