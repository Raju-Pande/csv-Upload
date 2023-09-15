/** ------------------ IMPORTING PACKAGE ------------------ **/
const mongoose = require("mongoose");

/** ------------------ MAKING CONNECTION ------------------ **/
// mongoose.connect('mongodb://127.0.0.1:27017/csvUploads');
// Define the MongoDB connection URL. The URL should be stored in the environment variable MONGO_URL.
const DB = process.env.MONGO_URL;

// Connect to the MongoDB database using Mongoose
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection successful!"); // Successful connection message
  })
  .catch((err) => console.log("no connection " + err)); // Error message if connection fails

// Setting the database connection to the 'db' variable
const db = mongoose.connection;

/** ------------------ CHECKING CONNECTION ------------------ **/

// Event listener for database connection errors
db.on("error", console.error.bind(console, "Error connecting to DB"));

// Event listener for successful database connection
db.once("open", function () {
  console.log("Successfully connected to DB"); // Successful connection message
});

/** ------------------ EXPORTING DB ------------------ **/

module.exports = db;
