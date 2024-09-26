const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Set up middleware to handle JSON data
app.use(express.json());

// Question 1: Set up database connectionnodemon server.js

const db = mysql.createConnection({
  host: process.env.localhost,
  user: process.env.root,
  password: process.env.Pass11$Him,
  database: process.env.hospital
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
