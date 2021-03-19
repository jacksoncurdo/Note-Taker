const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

let noteContents; 

// Reads the db.json file and returns all saved notes as JSON
app.get ("/api/notes", function (res,req) {
    readFileAsync("db/db.json", "utf8").then(function (data) {
        noteContents = JSON.parse(data)
        res.json(noteContents);
    })

})
