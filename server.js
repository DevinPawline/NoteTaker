// Dependecies 
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json")

// Express configuration
const app = express();

// Sets initial port
const PORT = process.env.PORT || 3000;

// Sets up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Require routes files
require('./routes/apiRoutes')(app);

// Setup listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});