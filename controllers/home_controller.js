/** ------------------ IMPORTING PACKAGE/MODELS ------------------ **/
const File = require("../models/csv"); // Importing the CSV model

/** ------------------ EXPORTING FUNCTION To open home page ------------------ **/
module.exports.home = async function (req, res) {
  try {
    // Find all CSV documents in the database
    let files = await File.find({});

    // Render the 'home' template with the list of files
    return res.render("home", {
      files: files,
      title: "Home",
    });
  } catch (error) {
    console.log("Error in homeController/home", error);
    return;
  }
};
