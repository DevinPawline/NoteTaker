const fs = require('fs');
const path = require('path');

module.exports = app => {

    //Set up notes variable
    fs.readFile("db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // API Routes

        // Setup the /api/notes get rout
        app.get("/api/notes", function(req, res) {
            // Read the db.json file and return all saved notes as JSON
            res.json(notes);
        });

        // Setup the /api/notes post route
        app.post("/api/notes", function(req, res) {

            // Receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: " +newNote.title);
        });

        // Retrieves a note with specific ID
        app.get("/api/notes/:id", function(req, res) {
            // display json for the notes array of the provided id 
            res.json(notes[req.params.id]);
        });

        //  Deletes a note with a specific id 
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id: "+req.params.id);
        });

        // View Routes

        // Display notes.html when /notes is accessed
        app.get('/notes', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // Display index.html when all other routes are accessed
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
        
        // Updates the json file whenever a note is added or deleted
        funtion updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes, '\t'),err => {
                if (err) throw err;
                return true;
            });
        }
    });
}