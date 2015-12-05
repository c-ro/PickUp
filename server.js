var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://heroku_ld8gq5ss:d4s4p3klt6q5fkmc0llnuucebm@ds057204.mongolab.com:57204/heroku_ld8gq5ss', function(err) {
    if (err) {
        console.err(err);
    } else {
        console.log('Connected');
    }
});

var itemSchema = new Schema({
	name: { type: String, required: true},
	price: { type: Number, min: 0, required: true },
	qty: {type: Number, min: 1, required: false },
	category: {type: String, enum: ['other', 'meat', 'produce'] },
	purchases: [{date: { type: Date, default: Date.now }, qty: Number, price: Number}]
});

var Item = mongoose.model('Item', itemSchema);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/scripts"));
app.use(express.static(__dirname + "/vendor"));

app.use(bodyParser.json());

app.get('/list', function (req, res) {
	Item.find(function (err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.get('/list/:id', function (req, res) {
	var item = req.params.id;
	console.log(item);

	Item.findOne({'_id': item }, function(err, item){
		if (err){
			console.log("GET single item ERROR: " + err);
		} else {
			res.json(item);
		}
	});
});

app.post('/list', function(req, res){
	var item = new Item(req.body);

	item.save(req.body, function (err, item){
		if (err){
			res.json(err);
		} else {
			res.json(item);
		}
	});
});

app.delete('/list/:id', function(req, res){
	var item = req.params.id;

	Item.remove({"_id": item}, function (err, item){
		res.json(item);
	});
});

app.put('/list/:id', function (req, res) {

	Item.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, item){
		if (err){
			console.log(err);
		}

		res.send(item);
	});
});

app.put('/list/purchase/:id', function (req, res) {
	Item.findByIdAndUpdate(req.params.id, {$push: {"purchases": req.body}},  {safe: true, upsert: true, new : true}, function(err, item){
		
		if (err){
			console.log(err);
		}

		res.send(item);
	});
});

app.put('/purchase/remove/:id/:date', function(req, res){
	Item.update( {"_id": req.params.id}, { $pull: { purchases: { date: req.params.date } } }, function (err, item){
		res.json(item);
	});
});

app.listen(process.env.PORT || 3000);

var time = new Date();
time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
console.log(time + " server running on 3k");
