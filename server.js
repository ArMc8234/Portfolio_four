var express = require("express");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 3000;



// // Requiring the `User` model for accessing the `users` collection
var Visitor = require("./visitorModel.js");

// Initialize Express
var app = express();

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/visitordb", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
// Routes

// Route to post our form submission to mongoDB via mongoose
app.post("/submit", function(req, res) {
  // Create a new user using req.body
  Visitor.create(req.body)
    .then(function(dbVisitor) {
      // If saved successfully, send the the new User document to the client
      res.json(dbVisitor);
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
