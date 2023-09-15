/** ------------------ IMPORTING PACKAGES/MODELS ------------------ **/
const fs = require('fs'); // File System module for file operations
const csvParser = require('csv-parser'); // CSV parsing library
const CSV = require('../models/csv'); // Importing the CSV model
const path = require('path'); // Path module for handling file paths

/** ------------------ EXPORTING FUNCTION To upload a file ------------------ **/
module.exports.upload = async function(req, res) {
    try {
        // Check if a file is not present in the request
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        // Check if the uploaded file is not a CSV
        if (req.file.mimetype !== "text/csv") {
            return res.status(400).send('Select CSV files only.');
        }
        // Create a new CSV document in the database
        let file = await CSV.create({
            fileName: req.file.originalname,
            filePath: req.file.path,
            file: req.file.filename
        });
        return res.redirect('/');
    } catch (error) {
        console.log('Error in fileController/upload', error);
        res.status(500).send('Internal server error');
    }
}

/** ------------------ EXPORTING FUNCTION To open file viewer page ------------------ **/
module.exports.view = async function(req, res) {
    try {
        // Find the CSV document in the database based on the file ID
        let csvFile = await CSV.findOne({file: req.params.id});

        // Initialize arrays to store CSV data
        const results = [];
        const header = [];

        // Read the CSV file and parse its contents
        fs.createReadStream(csvFile.filePath)
        .pipe(csvParser())
        .on('headers', (headers) => {
            headers.map((head) => {
                header.push(head);
            });
        })
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Render the file_viewer template with CSV data
            res.render("file_viewer", {
                title: "File Viewer",
                fileName: csvFile.fileName,
                head: header,
                data: results,
                length: results.length
            });
        });
    } catch (error) {
        console.log('Error in fileController/view', error);
        res.status(500).send('Internal server error');
    }
}

/** ------------------ EXPORTING FUNCTION To delete the file ------------------ **/
module.exports.delete = async function(req, res) {
    try {
        // Check if the file exists in the database
        let isFile = await CSV.findOne({file: req.params.id});

        if (isFile) {
            // Delete the file from the database
            await CSV.deleteOne({file: req.params.id});            
            return res.redirect("/");
        } else {
            console.log("File not found");
            return res.redirect("/");
        }
    } catch (error) {
        console.log('Error in fileController/delete', error);
        return;
    }
}
