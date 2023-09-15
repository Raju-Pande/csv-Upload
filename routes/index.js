/** ------------------ IMPORTING PACKAGES ------------------ **/
const express = require("express");
const router = express.Router();
const multer = require("multer");

/** ------------------ IMPORTING CONTROLLERS ------------------ **/
const homeController = require("../controllers/home_controller");
const fileController = require("../controllers/file_controller");

/** ------------------ SETTING UP FILE UPLOAD CONFIGURATION ------------------ **/
// Multer is used for handling file uploads.
// It is configured to store files in the "uploads/files" directory.
const upload = multer({ dest: "uploads/files" });

/** ------------------ DEFINING ROUTES ------------------ **/
// Define the route for the home page
router.get("/", homeController.home);

// Define the route for file uploads. "upload.single("file")"
// specifies that it expects a single file with the field name "file."
router.post("/upload", upload.single("file"), fileController.upload);

// Define the route for viewing files with a specific ID
router.get("/view/:id", fileController.view);

// Define the route for deleting files with a specific ID
router.get("/delete/:id", fileController.delete);

/** ------------------ EXPORTING THE ROUTER ------------------ **/
module.exports = router;
