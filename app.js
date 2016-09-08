var express = require('express');
var app = express();

var path = require('path');

//set path to views folder
app.set('views', path.join(__dirname, 'app_server', 'views'));
//set static public file
app.use(express.static(__dirname + '/public'));
//set handlebars as default templeting agent
var handlebars = require('express-handlebars')
	.create({defaultLayout:'../../app_server/views/layouts/main',
	 partialsDir: "./app_server/views/partials/"});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//include routes
app.use('/', require('./app_server/routes/index.js'));






//custom 404
app.use(function(req, res){
      res.status(404);
      res.send('404');
});

//custom 500
app.use(function(err, req, res, next){
      console.log(err.stack);
      res.status(500);
      res.send('500');
});

app.listen(4000, function(){
  console.log('In todoapp server started on port 4000');
});