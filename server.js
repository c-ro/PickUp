//UTILITY
var time = new Date();
time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();

// SET UP
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

//CONFIG
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/scripts"));
app.use(express.static(__dirname + "/vendor"));

require('./routes.js')(app);

var database = require('./config/database');
mongoose.connect(database.url, function(err) {
    if (err) {
        console.err(err);
    } else {
        console.log('Connected. . .');
    }
});

// MODELS
// var Item = require('./scripts/models/Items.js');
// var List = require('./scripts/models/Lists.js');

app.listen(port);
console.log(time + " -- server running on %s", port);