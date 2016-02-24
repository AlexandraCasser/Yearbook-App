var express        = require('express'),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    port           = 3000 || process.env.PORT,
    app            = express(),
    session        = require('express-session'),
    methodOverride = require('method-override'),
    passport       = require('passport');

mongoose.connect('mongodb://localhost/yearbook_app');

//Express
app.use(express.static('public'));
// require('./config/passport')(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());
app.use(bodyParser.json());

//Passport Reqs
app.use(session({ secret: 'secret-session' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//Routes
var usersController = require("./controllers/usersController");
var quotesController = require("./controllers/quotesController");
require("./config/passport.js")(passport);

app.use("/users", usersController);
app.use("/quotes", quotesController)

app.get("/", function(req, res){
  res.redirect("/users");
});

app.listen(port, function() {
    console.log('Running on port ' + port);
});