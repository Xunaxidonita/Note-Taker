const fs = require("fs");
const fsPromises = fs.promises;
const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;

Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

function writeToFile(notes) {
  fs.writeFile("./dist/team.html", generateIndexHtml(notes), (err) => {
    if (err) throw new Error(err);
    console.log("Notes updated!");
  });
}

let notesCache;

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

const getNotes = async function () {
  if (!notesCache) {
    const notes = await fsPromises.readFile(
      path.join(__dirname, "db", "db.json")
    );
    notesCache = JSON.parse(notes);
  }
  return notesCache;
};

app.get("/api/notes", async (req, res) => {
  const notes = await getNotes();
  res.json(notes);
});

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
  console.log(newNote);
  newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase();
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
  for (let i = 0; i < notes.length; i++) {
    if (chosen === notes[i].routeName) {
      notes.remove(chosen);
      res.send("DELETE Request Called");
      writeToFile(notes);
    }
  }
  return res.json(false);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
