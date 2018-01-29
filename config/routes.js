let router = require('express').Router();

const teamsController = require('../controllers/teams');
const usersController = require('../controllers/users');
const sportsController = require('../controllers/sports');

//middlewares
const isAuthenticated = require('../middlewares/auth').isAuthenticated;

//auth
router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

//grab team data
router.get("/sports", isAuthenticated, sportsController.getSports);
router.get("/teams/:token", isAuthenticated, teamsController.getTeams);


//grab user specific information
router.put("/toggle-favorite-team", isAuthenticated, usersController.toggleFavoriteTeam);

module.exports = router;
