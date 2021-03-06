var express = require("express");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();
var exphbs = require("express-handlebars");
var routes = require("./controllers/controller.js");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperdb";

mongoose.connect(MONGODB_URI);

// Import routes and give the server access to them.

app.use(routes);

app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});