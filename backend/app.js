var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const PORT = 3001;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var weightsRouter = require('./routes/weights');
var exerciseRouter = require('./routes/exercise');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/weights', weightsRouter);
app.use('/exercise', exerciseRouter);

app.listen(PORT, () => console.log(`App launch on port ${PORT}`))

module.exports = app;
