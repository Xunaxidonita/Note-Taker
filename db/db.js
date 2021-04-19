const fsPromises = require("fs").promises;
const path = require("path");

let notesCache;

const getNotes = async function () {
  if (!notesCache) {
    const notes = await fsPromises.readFile(path.join(__dirname, "db.json"));
    notesCache = JSON.parse(notes);
  }
  return notesCache;
};

const clearCache = async () => {
  notesCache = null;
};

module.exports = {
  getNotes: getNotes,
  clearCache: clearCache,
};
