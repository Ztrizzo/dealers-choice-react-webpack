const {syncAndSeed} = require('./db/db.js');
const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '/dist')));

const init = async () => {
  await syncAndSeed();
  app.listen(PORT, () => {console.log(`listening on port ${PORT}`)})
}

init();

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));