const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

let noteContents; 
module.exports = function (app) {


// Reads the db.json file and returns all saved notes as JSON
app.get ("/api/notes", function (res,req) {
    readFileAsync("db/db.json", "utf8").then(function (data) {
        noteContents = JSON.parse(data)
        res.json(noteContents);
    })

});

// Recieves notes to save, add the notes to the db.json, and then returns the notes to the client
app.post ("/api/notes", function (res,req) {
    let newNote = req.body;
    let lastId = 0;
    if (noteContents.length !== 0) {
        lastId = noteContents[noteContents.length - 1]["id"];
    }
    let newId = lastId + 1;
    newNote["id"] = newId;
    noteContents.push(newNote);
    writeFileAsync("db/db.json", JSON.stringify(noteContents)).then(function () {
        console.log("Note has been updated");
    });
    res.json(newNote);
});

// Deletes notes
app.delete ("/api/notes", function (res,req) {
    let chosenId = parseInt(req.params.id);
    for (let i = 0; i < noteContents.length; i++) {
        if (chosenId === noteContents[i].id) {
            noteContents.splice(i, 1);
            let noteJSON = JSON.stringify(noteContents, null, 2);
            writeFileAsync("/db.json", noteJSON).then(function () {
                console.log("Note deleted");
            });
        }
    }
    res.json(noteContents);
});
}



