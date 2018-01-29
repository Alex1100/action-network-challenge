const db = require('../config/database').db;
const axios = require('axios');


const getSports = async (req, res) => {
  try {
    const sports = await db.query('SELECT * FROM sports');
    res.json(sports.rows);
  } catch (e) {
    console.log("E IS: ", e);
  }
};


module.exports = {
  getSports
};
