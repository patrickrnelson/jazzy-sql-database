const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

// Create a connection to our database
const pool = new pg.Pool({
  database: 'jazzy_sql',
});

// TODO - Replace static content with a database tables

const songList = [
  {
    title: 'Take Five',
    length: '5:24',
    released: '1959-09-29',
  },
  {
    title: 'So What',
    length: '9:22',
    released: '1959-08-17',
  },
  {
    title: 'Black Gold',
    length: '5:17',
    released: '2012-02-01',
  },
];

app.get('/artist', (req, res) => {
  console.log(`In /artist GET`);
  pool
    .query(`SELECT * FROM "artists"`)
    .then(function (dbRes) {
      res.send(dbRes.rows);
    })
    .catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post('/artist', (req, res) => {
  artistList.push(req.body);
  res.sendStatus(201);
});

app.get('/song', (req, res) => {
  console.log(`In /songs GET`);
  res.send(songList);
});

app.post('/song', (req, res) => {
  songList.push(req.body);
  res.sendStatus(201);
});
