
var UserModel_1 = require("./DBRepo/UserModel");
var GeneralRoutes = require("./routes/general");
var express = require("express");
var path = require("path");

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
app.set("port", 8080);
//app.use(bodyParser.urlencoded({'extended':'true'}));
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


//app.use(express.static(path.join(__dirname, '/public/index.html')));
var staticDIR = path.resolve(__dirname, "static");
app.use(express.static(staticDIR));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  //next();
  if (req.query.token) {
    UserModel_1.findUser({ FirebaseToken: req.query.token })
        .then(function (dbUser) {
          if (dbUser) {
            req.user = dbUser;
            next();
          }
        }, function (err) {
          next(err);
        });
  }
  else {
    next();
  }
});
app.use("/api", GeneralRoutes);
app.get("*", function (req, res) {
  var indexViewPath = path.resolve(__dirname, "static/index.html");
  res.sendFile(indexViewPath);
});
app.listen(app.get("port"), function () {
  console.log("Server in listening state on " + app.get("port"));
});
mongoose.connect("mongodb://localhost/data");
//module.exports = app;