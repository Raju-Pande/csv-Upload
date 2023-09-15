// Import necessary packages and modules
require('dotenv').config(); // Load environment variables from a .env file
const express = require('express');
const port = 8000;
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const csv = require('csv-parser');
const db = require("./config/mongoose");
const bodyParser = require('body-parser');

// Set up Express application settings and middleware

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Use expressLayouts for layout support
app.use(expressLayouts);

// Use bodyParser middleware for JSON parsing
app.use(bodyParser.json());

// Use URL-encoded middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'assets' folder
app.use(express.static('./assets'));

// Set up routes for the application
app.use('/', require('./routes'));

// Start the Express server and listen on the specified port
app.listen(port, function(err) {
    if (err) {
        console.log('Error', err);
        return;
    }
    console.log('Server is up and running on port: ', port);
});
