const express = require('express');
const router = express.Router();

// contains pg
// and contains connection to DB
const pool = require('../modules/pool');

router.get('/', (req, res) => {
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
*
* /songs POST should look like....

INSERT INTO "songs"
  ("title", "length", "release")
VALUES 
  ('SOME SONG', 'SOME LENGTH', 'SOME DATE');
*
*/

router.post('/', (req, res) => {
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

module.exports = router;
