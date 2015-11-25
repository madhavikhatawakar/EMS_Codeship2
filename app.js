var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var employee = require('./routes/employees'); //routes are defined here
var app = express(); //Create the Express app

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/html"));

app.use(bodyParser.json())



app.use(bodyParser.urlencoded( { extended : true}));
app.use('/api', employee); //This is our route middleware

var connectionString = 'mongodb://172.27.59.83:27017/test';
 mongoose.connect(connectionString);



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
