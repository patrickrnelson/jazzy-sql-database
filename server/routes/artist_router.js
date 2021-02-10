const express = require('express');
const router = express.Router();

// contains pg
// and contains connection to DB
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log(`In /artist GET`);
  pool
    .query(
      `
    SELECT * FROM "artists"
    ORDER BY "birthday" ASC;
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

/* POST Route
* 
* /artist POST should look like....
*

INSERT INTO "artists"
  ("name", "birthday")
VALUES 
  ('SOMEBODY', 'SOME BDAY');

*
*/

router.post('/', (req, res) => {
  console.log('req.body', req.body);
  pool
    .query(
      `
  INSERT INTO "artists"
    ("name", "birthday")
  VALUES
    ('${req.body.name}', '${req.body.birthdate}');
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
