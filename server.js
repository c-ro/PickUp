var express = require('express');
var app = express();
// var db = mongojs('pickup', ['pickup']);
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/items', function(err) {
    if (err) {
        console.err(err);
    } else {
        console.log('Connected');
    }
});

var Item = mongoose.model('Item', { name: { type: String, required: true}, price: { type: Number, min: 0, required: true }, qty: {type: Number, min: 1, required: false } });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/list', function (req, res) {
	console.log("GET request for ALL items . .");
	Item.find(function (err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.get('/list/:id', function (req, res) {
	console.log("GET request for single item. . ." + JSON.stringify(req.params));
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
	console.log("POST request for single item. . ." + req.body);
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
	console.log("DELETE request for single item. . .");
	var item = req.params.id;

	Item.remove({"_id": item}, function (err, item){
		res.json(item);
	});
});

app.put('/list/:id', function (req, res) {
    var newItem = new Item({
        name: req.body.name,
        price: req.body.price,
        qty: req.body.qty
    });

    var upsertData = newItem.toObject();

    delete upsertData._id;

    return Item.update({ "_id": req.params.id }, upsertData, {upsert: true}, function(err) {
          if (!err) {
              return res.send("updated");
          } else {
              console.log(err);
              return res.send(404, { error: "Item was not updated." });
          }
    });
});

app.listen(3000);
console.log("server running on 3k");
