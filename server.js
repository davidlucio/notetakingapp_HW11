// Requirements
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// Port Declaration
const PORT = 3001;
const app = express();

// Middleware? I don't quite understand it, but it seems to be working...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Display index.html
app.use( express.static('public') );

// Route to notes.html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);