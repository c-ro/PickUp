var mongojs = require('mongojs');
var express = require('express');
var app = express();
var db = mongojs('pickup', ['pickup']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/list', function (req, res) {
	console.log('/list recieved GET req.');

	db.pickup.find(function (err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.get('/list/:id', function (req, res) {
	var item = req.params.id;

	db.pickup.find({_id: mongojs.ObjectId(item)}, function (err, docs){
		res.json(docs[0]);
	});
});

app.post('/list', function(req, res){
	console.log(req.body);
	db.pickup.insert(req.body, function (err, doc){
		res.json(doc);
	});
});

app.delete('/list/:id', function(req, res){
	var item = req.params.id;
	
	db.pickup.remove({_id: mongojs.ObjectId(item)}, function (err, doc){
		res.json(doc);
	});
});

app.put('/list/:id', function(req, res){
	var id = req.params.id;
	db.pickup.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, price:req.body.price}},
		new: true
	},
		function(err, doc){
		res.json(doc);
	});
});

app.listen(3000);
console.log("sever running on 3k");
