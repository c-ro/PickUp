var Item = require('./scripts/models/Items.js');
var List = require('./scripts/models/Lists.js');

module.exports = function(app){
	// GET ALL ITEMS
	app.get('/items', function (req, res) {
		Item.find(function (err, docs){
			res.json(docs);
		});
	});

	// GET SINGLE ITEM
	app.get('/items/:id', function (req, res) {
		var item = req.params.id;
		Item.findOne({'_id': item }, function(err, item){
			if (err){
				console.log("GET single item ERROR: " + err);
			} else {
				res.json(item);
			}
		});
	});

	// POST NEW ITEM
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

	// DELETE SINGLE ITEM
	app.delete('/items/:id', function(req, res){
		var item = req.params.id;
		Item.remove({"_id": item}, function (err, item){
			res.json(item);
		});
	});

	// EDIT SINGLE ITEM
	app.put('/items/:id', function (req, res) {
		Item.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, item){
			if (err){
				console.log(err);
			}
			res.send(item);
		});
	});

	// ADD PURCHASE TO ITEM
	app.put('/items/purchase/:id', function (req, res) {
		Item.findByIdAndUpdate(req.params.id, {$push: {"purchases": req.body}},  {safe: true, upsert: true, new : true}, function(err, item){
			if (err){console.log(err);}

			res.send(item);
		});
	});

	// REMOVE PURCHASE FROM ITEM
	app.put('/purchase/remove/:id/:date', function(req, res){
		Item.update( {"_id": req.params.id}, { $pull: { purchases: { date: req.params.date } } }, function (err, item){
			res.json(item);
		});
	});

	// GET LIST of LISTS
	app.get('/lists', function (req, res, err) {
		List.find(function (err, docs){
			res.json(docs);
		});
	});

	//POST NEW LIST
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

	// GET SINGLE  LIST
	app.get('/lists/:id', function (req, res) {
		var list = req.params.id;
		List.findOne({ '_id': list })
			.populate('items')
			.exec(function (err, list) {
				if (err){
					console.log(err);
					return res.json(err);
				} else {
					res.json(list);
				}
		});
	});

	//DELETE SINGLE LIST
	app.delete('/lists/:id', function(req, res){
		var list = req.params.id;

		List.remove({"_id": list}, function (err, list){
			res.json(list);
		});
	});

	//ADD ITEM TO LIST
	app.put('/lists/add/:id', function (req, res) {
		List.findByIdAndUpdate(req.params.id, {$addToSet: {"items": req.body}},  {safe: true, upsert: true, new : true}, function(err, item){
			console.log("server. . .");
			if (err){
				console.log(err);
			} else {
				res.send(item);
			}
		});
	});

	// DELETE ITEM FROM LIST
	app.put('/list/remove/:list/:item', function(req, res){
		List.update( {"_id": req.params.list}, { $pull: { items: req.params.item } }, function (err, item){
			res.json(item);
		});
	});

};