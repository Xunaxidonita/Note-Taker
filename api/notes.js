const getNotes = require("../db/db.js").getNotes;

const notes = async (req, res) => {
  const notes = await getNotes();
  res.json(notes);
};

module.exports = notes;
