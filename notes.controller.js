const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');
const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen('Added'));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue('Waza'));
  notes.forEach((note, i) => {
    console.log(chalk.blue(`${i + 1}. ${note.title} под индексом ${note.id}`));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
  console.log(chalk.bgRed(`Removed`));
}

async function editNote(id, newText) {
  const notes = await getNotes();
  const noteIndex = notes.findIndex((note) => note.id === id);
  notes[noteIndex].title = newText;
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgBlue('Edited'));
}

module.exports = {
  addNote,
  getNotes,
  printNotes,
  removeNote,
  editNote,
};
