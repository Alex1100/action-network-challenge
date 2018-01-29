const db = require('../config/database').db;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const jwt = require('jsonwebtoken');
const axios = require('axios');


const signup = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);
    const formattedUsername = username.replace(/'/g, '"');
    const formattedHash = hash.replace(/'/g, '"');
    const user = await db.query(
      `INSERT INTO users (username, password, favorite_teams)
       VALUES($1, $2, $3) RETURNING *`, [formattedUsername, formattedHash, '{}']);

    const payload = {
      username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(201).json({ token, user: user.rows[0] });
  } catch(e) {
    console.log(e);
    res.status(409).json({ errorMessage: "That username or email is already taken. Please try another username or email" });
  }
};



const login = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;

    const formattedUsername = username.replace(/'/g, '"');
    const user = await db.query(
      `SELECT * FROM users
       WHERE username = $1`, [formattedUsername]);
    const data = await bcrypt.compare(password, user.rows[0].password);

    const payload = {
      username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ token, user: user.rows[0] });
  } catch(e) {
    console.log(e.message);
    res.status(422).json({ errorMessage: e.message });
  }
};


const toggleFavoriteTeam = async (req, res) => {
  try {
    const {
      user_teams,
      user_id,
      team_id
    } = req.body;


    let favorite_team_ids;

    if (user_teams.includes(team_id)) {
      favorite_team_ids = user_teams.filter(id => id !== team_id);
      favorite_team_ids = '{' + favorite_team_ids.join(', ') + '}';

      const user = await db.query(
        `UPDATE users
         SET favorite_teams = $1,
         updated_at = NOW()
         WHERE ID = $2
         RETURNING *`, [favorite_team_ids, user_id]
      );

      res.status(202).send({user: user.rows[0]});
    } else {

      favorite_team_ids = '{' + [...user_teams, team_id].join(', ') + '}';

      const user = await db.query(
        `UPDATE users
         SET favorite_teams = $1,
         updated_at = NOW()
         WHERE ID = $2
         RETURNING *`, [favorite_team_ids, user_id]
      );

      res.status(202).send({user: user.rows[0]});
    }
  } catch(e) {
    console.log("ERROR IS: ", e);
    res.status(422);
  }
}


module.exports = {
  login,
  signup,
  toggleFavoriteTeam
}
