const chalk = require('chalk');
// const dotenv = require('dotenv');
const errorhandler = require('errorhandler');
const express = require('express');
const moment = require('moment');
const morgan = require('morgan');

// dotenv.config();

morgan.token('date', (req, res) => { 
  return moment(req.headers['date']).format('MMMM Do YYYY, h:mm:ss a'); 
});

morgan.token('status', (req, res) => {
  if(res.statusCode < 400) {
    return chalk.green.bold(res.statusCode);
  } else {
    return chalk.red.bold(res.statusCode);
  };
});

const app = express();
const port = process.env.PORT || 3000;

const logger = morgan(function (tokens, req, res) {
  return [
      chalk.whiteBright(tokens.date(req, res)),
      chalk.green.bold(tokens.method(req, res)),
      tokens.status(req, res),
      chalk.blue.bold(tokens.url(req, res)),
      chalk.yellow(`${tokens['response-time'](req, res)} ms`),
  ].join(chalk.white.bold(' - '));
});

const mainRoute = require('./routes/web');
const todoRoute = require('./routes/todo');

app.locals.moment = moment;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);


app.use('/api', mainRoute);
app.use('/api/todos', todoRoute);

if(process.env.NODE_ENV === 'development') {
  app.use(errorhandler({ log: true }));
} 

app.listen(port, () => {
console.log(chalk.white(`Server is listening on port: ${chalk.white.bold(port)}, time: ${chalk.white.bold(moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a'))}`));
});
