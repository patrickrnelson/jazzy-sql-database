const pg = require('pg');

// Create a connection to our database
const pool = new pg.Pool({
  database: 'jazzy_sql',
});

module.exports = pool;
