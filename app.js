require('dotenv').load();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const debug = require('debug')('app:http');

const db = require('./config/database');
const routes = require('./config/routes');
const PORT = process.env.PORT || 3005;
const path = require('path');


const server = require('http').Server(app);

function debugReq(req, res, next){
  debug("params:", req.params);
  debug("query:", req.query);
  debug("body:", req.body);
  next();
};


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(debugReq);
app.use('/', express.static(path.join(__dirname, "public")));
app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});


if(process.env.NODE_ENV !== 'PRODUCTION') {
  process.once('uncaughtException', function(err) {
    console.error('FATAL: Uncaught exception.');
    console.error(err.stack || err);
    setTimeout(function(){
      process.exit(1);
    }, 100);
  });
}
