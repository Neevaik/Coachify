var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const PORT = 3001;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var weightsRouter = require('./routes/weights');
var exercisesRouter = require('./routes/exercises');
var messagesRouter = require('./routes/messages');
var settingsRouter = require('./routes/settings');
var objectivesRouter = require('./routes/objectives');
var programsRouter = require('./routes/programs');
var sessionsRouter = require('./routes/sessions');
var performancesRouter = require('./routes/performances');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/weights', weightsRouter);
app.use('/exercises', exercisesRouter);
app.use('/messages', messagesRouter);
app.use('/settings', settingsRouter);
app.use('/objectives', objectivesRouter);
app.use('/programs', programsRouter);
app.use('/sessions', sessionsRouter);
app.use('/performances', performancesRouter);

app.listen(PORT, () => console.log(`App launch on port ${PORT}`))

module.exports = app;
