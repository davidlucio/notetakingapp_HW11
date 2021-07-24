// Requirements for Routing
const express = require('express');

// Modules
const notesRouter = require('./notes.js');

// App declaration
const app = express();

// Route setting
app.use('/notes', notesRouter);

module.exports = app;