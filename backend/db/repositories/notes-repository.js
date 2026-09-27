// backend/db/repositories/notes-repository.js
// Notes Repository for accessing structured educational notes

const notesEngine = require('../../services/notes-engine');
const { getDb } = require('../database');

class NotesRepository {
  getNotes(filters = {}, db = getDb()) {
    return notesEngine.getNotes(filters, db);
  }

  getNoteById(noteId, db = getDb()) {
    return notesEngine.getNoteById(noteId, db);
  }

  createNote(noteData, db = getDb()) {
    return notesEngine.createNote(noteData, db);
  }
}

module.exports = new NotesRepository();
