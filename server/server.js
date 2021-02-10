const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

let artistRouter = require('./routes/artist_router');
app.use('/artist', artistRouter);

app.get('/song', (req, res) => {
  console.log(`In /songs GET`);
  pool
    .query(
      `
    SELECT * FROM "songs"
    ORDER BY "title" ASC;
    `
    )
    .then(function (dbRes) {
      res.send(dbRes.rows);
    })
    .catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
});

/* 
/songs POST should look like....

INSERT INTO "songs"
  ("title", "length", "release")
VALUES 
  ('SOME SONG', 'SOME LENGTH', 'SOME DATE');

*/

app.post('/song', (req, res) => {
  // console.log('req.body', req.body);
  pool
    .query(
      `
    INSERT INTO "songs"
      ("title", "length", "release")
    VALUES
      ('${req.body.title}', '${req.body.length}', '${req.body.released}');
  `
    )
    .then(function (dbRes) {
      res.sendStatus(201);
    })
    .catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
});
