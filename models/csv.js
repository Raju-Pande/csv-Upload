/** ------------------ IMPORTING MONGOOSE ------------------ **/
const mongoose = require("mongoose");

// Define a schema for the 'files' collection in the MongoDB database
const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String, // Define the data type for the 'fileName' field
    },
    filePath: {
      type: String, // Define the data type for the 'filePath' field
    },
    file: {
      type: String, // Define the data type for the 'file' field
    },
  },
  {
    timestamps: {
      options: { timeZone: "Asia/Kolkata" }, // Add timestamps with a specific time zone
    },
  }
);

/** ------------------ MAKING MODEL ------------------ **/

// Create a model named 'files' based on the 'fileSchema' schema
const files = mongoose.model("files", fileSchema);

/** ------------------ EXPORTING MODEL ------------------ **/

// Export the 'files' model for use in other parts of the application
module.exports = files;
