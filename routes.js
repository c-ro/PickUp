var Item = require('./scripts/models/Items.js');
var List = require('./scripts/models/Lists.js');

module.exports = function(app){
	app.get('/items', function (req, res) {
		Item.find(function (err, docs){
			console.log(docs);
			res.json(docs);
		});
	});

	app.get('/lists', function (req, res, err) {
		List.find(function (err, docs){
			res.json(docs);
		});
	});

	app.get('/items/:id', function (req, res) {
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

	app.post('/items', function(req, res){
		var item = new Item(req.body);

		item.save(req.body, function (err, item){
			if (err){
				res.json(err);
			} else {
				res.json(item);
			}
		});
	});

	app.post('/lists', function(req, res){
		var list = new List(req.body);

		list.save(req.body, function (err, list){
			if (err){
				res.json(err);
			} else {
				res.json(list);
			}
		});
	});


	app.delete('/items/:id', function(req, res){
		var item = req.params.id;

		Item.remove({"_id": item}, function (err, item){
			res.json(item);
		});
	});

	app.put('/items/:id', function (req, res) {

		Item.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, item){
			if (err){
				console.log(err);
			}

			res.send(item);
		});
	});

	app.put('/items/purchase/:id', function (req, res) {
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
};