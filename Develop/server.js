//all of the required programs
const express = require("express");
const { notes } = require("./db/db.json");
const path = require("path");
const fs = require("fs");

// Setting up express
const app = express();

//now Express can parse out the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// I believe this is where we talked about nudging the user into the right direction
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// sort of catchs the JSON data
app.post("/api/notes", (req, res) => {
  let new_notes = req.body;
  let notes = fs.readFileSync("./db/db.json");
  new_notes.id = String(notes.length);
  notes = JSON.parse(notes);
  notes.push(new_notes);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  let noteId = req.params.id;
  notes = fs.readFileSync("./db/db.json");
  notes = JSON.parse(notes);
  notes = notes.filter((note) => {
    if (noteId === note.id) {
      return false;
    } else {
      return true;
    }
  });
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

// begins listening for any activity
app.listen(3001, () => {
  console.log("App listening on port 3001!");
});
