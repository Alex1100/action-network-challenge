const db = require('../config/database').db;
const axios = require('axios');


const getTeams = async (req, res) => {
  try {
    const teams = await db.query(`SELECT * FROM teams`);
    res.json(teams.rows);
  } catch (e) {
    console.log("E IS: ", e);
  }
};


module.exports = {
  getTeams
};
