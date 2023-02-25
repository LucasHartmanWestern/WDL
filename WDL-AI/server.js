const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express(); // Call express function to get Express type object
app.use(express.json()); // Add middleware to enable json parsing
const port = process.env.PORT || 3000; // Specify port or use 3000 by default

// Create SQL connection
var con = mysql.createConnection({
  host: "localhost",
  user: "wld-ai",
  password: "admin",
  database: "wdl-ai",
  multipleStatements: true
});

// Connect to db
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to DB");
  con.query("CREATE DATABASE wdl-ai", function (err, result) {
    if (err) {
    } else {
      //console.log("New database created");
    }
  });
});

// Add various headers to each request
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  if (req.path !== '/api/v1/user/login') {
    let token = req.header('Authorization');
    jwt.verify(token, process.env.JWT_KEY || 'wdl', (err, decoded) => {
      //console.log(decoded);
    });
  }
  next();
});


// Listen to the specified port
app.listen(port, () => console.log(`Listening on port ${port}...`));
