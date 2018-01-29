require('dotenv').load();
const pg = require('pg');
const db = new pg.Client(process.env.DB_URL);

db.connect((err) => {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  db.query('SELECT NOW() AS "theTime"', (err, result) => {
    if(err) {
      return console.error('error running query', err);
    }
    console.log("Connected to DB", "\nCurrent Time Is: ", result.rows[0].theTime);
  });
});


module.exports = {
  db: db
};
