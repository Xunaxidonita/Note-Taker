const fs = require("fs");
const fsPromises = fs.promises;
const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;
const notes = require("./api/notes");
const { getNotes, clearCache } = require("./db/db");
let id;

async function writeToFile(notes) {
  await clearCache();

  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) throw new Error(err);
    console.log("Notes updated!");
  });
}

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    if (req.headers.apikey === "keyTest") {
      return next();
    }
    res.send("You must provide the right API KEY");
  } else {
    return next();
  }
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", notes);

app.get("/api/notes/:note", async (req, res) => {
  const chosen = req.params.note;
  const notes = await getNotes();
  console.log(chosen);
  for (let i = 0; i < notes.length; i++) {
    if (chosen === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }
  return res.json(false);
});

app.post("/api/notes", async (req, res) => {
  const notes = await getNotes();
  const newNote = req.body;
  newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase();
  newNote.id = notes.length + 1;
  console.log(newNote);
  notes.push(newNote);
  // whatever we respond with here will become what data is
  // on the .then for the api request on the front end
  res.send("Done!");
  writeToFile(notes);
});

app.delete("/api/notes/:note", async (req, res) => {
  const notes = await getNotes();
  const chosen = req.params.note;
  console.log(chosen);

  writeToFile(
    notes.filter((note) => {
      return note.id !== chosen;
    })
  );

  res.json(true);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
