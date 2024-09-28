// Declare dependancies

const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv')
const cors = require('cors');
// Set up middleware to handle JSON data
app.use(express.json());
app.use(cors());
dotenv.config();

// Set up database connection nodemon server.js

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// check if database is working
db.connect((err) => {

  // No connection
  if (err) return console.log("Error connecting to MySQL");
  // Connected
  console.log("Connected to MySQL database as id: ", db.threadId)

  
//GET METHOD EXAMPLE

  // app.set('view engine', 'ejs');
  // app.set('views',__dirname + '/views');

  // // patients_data is the name of the file in the view folder
  // app.get('/patients_data', (req,res) => {
  //   // Retrieve data from the database
  //     db.query('SELECT * FROM patients', (err, results) => {
  //         if (err){
  //             console.error(err);
  //             res.status(500).send('Error retrieving data');
  //         }else {
  //             // Display the records to the browser
  //             res.render('patients_data',{results: results});
  //         }
  //     });
  // });

  // My code goes here

  // 1. GET endpoint to retrieve all patients

  app.set('view engine', 'ejs');
  app.set('views',__dirname + '/views');
  app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching patients:', err);
        return res.status(500).send('Database error');
      }
      res.render('patients', { patients: results });
    });
  });
  
  // 2. GET endpoint to retrieve all providers
  app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching providers:', err);
        return res.status(500).send('Database error');
      }
      res.render('providers', { providers: results });
    });
  });
  
  // 3. GET endpoint to filter patients by first name
  app.get('/patients/filter', (req, res) => {
    const { first_name } = req.query;
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(query, [first_name], (err, results) => {
      if (err) {
        console.error('Error filtering patients:', err);
        return res.status(500).send('Database error');
      }
      res.render('patients', { patients: results });
    });
  });
  
  // 4. GET endpoint to retrieve providers by specialty
  app.get('/providers/filter', (req, res) => {
    const { provider_specialty } = req.query;
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(query, [provider_specialty], (err, results) => {
      if (err) {
        console.error('Error filtering providers:', err);
        return res.status(500).send('Database error');
      }
      res.render('providers', { providers: results });
    });
  });

  // listen to the server
  app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);

  // send message to the server
      console.log('Sending message to browser...');
      app.get('/', (req,res) => {
          res.send('server started successfully')
      })
  });
});

// Test the Endpoints

// To retrieve all patients:
// Visit: http://localhost:3300/patients

// To retrieve all providers:
// Visit: http://localhost:3300/providers

// To filter patients by first name:
// Example: http://localhost:3300/patients/filter?first_name=John

// To filter providers by specialty:
// Example: http://localhost:3300/providers/filter?provider_specialty=Cardiology