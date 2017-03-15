/**
 * Module dependencies.
 */
var express = require('express');
var jade 	  = require('jade');
var fs      = require('fs');
var exphbs  = require('express-handlebars');
var myDb    = require('./db');
var app 	  = express();
var bodyParser = require('body-parser');


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function (req, res) {
  myDb.read(function log(err, cats) {
    res.render('index', {'cats': cats});
  });
});

app.get('/vote/:id',function (req, res) {
  var id = req.params.id;
  myDb.selectCat(id, function log(err, cats) {
    res.render('vote', {'cats': cats});
  });
});

app.post('/vote/done', function(req, res) {
    var id = req.body.id;
    myDb.vote(id, function log(err, cats) {
      res.redirect('/');
    });
});

/**
 * Listening at port 3000
 */
var server = app.listen(3000, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("CatMash listening at http://localhost:%s/", port);
});

//TODO close db connection when the server is killed
