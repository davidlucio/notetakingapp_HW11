// Requirements
const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving notes
notes.get('/', (req, res) => {
    console.log(`${req.method} request: Serving up notes`);
    readFromFile('./db/db.json').
        then( (data) => res.json(
            JSON.parse(data)
        )
    );
});

// POST Route for creating a new note
notes.post('/', (req, res) => {

  const { title, text } = req.body;

  if (req.body && title && text) {
    const newNote = {
        id: uuid(),
        title,
        text
    };
    
    // POST DEBUGGER
    console.log(`Making ${req.method} request\n${newNote}`);

    readAndAppend(newNote, './db/db.json');
    res.json(`Note "${title}" added`);
  } else {
    res.error('Error in adding note');
  }

});

// DELETE Route for removing a note
notes.delete('/:id', (req, res) => {
    
    const note_id = req.params.id;

    /**/
    readFromFile('./db/db.json').
        then( (data) => {

            let notes = JSON.parse(data);
            const deleteIndex = notes.findIndex( (savedNote) =>
                savedNote.id === note_id
            );
            
            if(deleteIndex >= 0 ){
                notes.splice(deleteIndex, 1);
                writeToFile('./db/db.json', notes);
            }
            else{
                res.error(`Error in removing note ${note_id}`)
            }
        }
    );
    /**/

    // DELETE DEBUGGER
    console.log(`${req.method} request: ${note_id}`);

});

// Export the module
module.exports = notes;