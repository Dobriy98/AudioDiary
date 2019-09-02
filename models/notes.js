const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    { 
      name: String,
      text: String,       
      user: String
    }
  );

const Note = mongoose.model('notes', noteSchema);
module.exports = Note;