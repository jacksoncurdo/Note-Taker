const { response } = require("express");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

let noteContents; 
module.exports = function (app) {


// Reads the db.json file and returns all saved notes as JSON
app.get("/api/notes", function (req, res) {
    readFileAsync("db/db.json", "utf8").then(function (data) {
        noteContents = JSON.parse(data)
        res.json(noteContents);
    })
})
// Recieves notes to save, add the notes to the db.json, and then returns the notes to the client
app.post("/api/notes", (req,res)=>{
    fs.readFile("db/db.json", "utf8", (err,data)=>{
        if (err) throw err;
let savedNotes = JSON.parse(data);
let updatedNotes = [req.body, ...savedNotes];
fs.writeFile("db/db.json", JSON.stringify(updatedNotes), err => {
    if (err) throw err;
    res.status(200);
});
    }) 
 }) 

}

