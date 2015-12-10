var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	name: { type: String, required: true},
	price: { type: Number, min: 0, required: true },
	qty: {type: Number, min: 1, required: false },
	category: {type: String, enum: ["meat", "produce", "bakery", "dryandcanned", "dairy", "pets", "personal", "beverages", "frozen", "home", "none"] },
	purchases: [{date: { type: Date, default: Date.now }, qty: Number, price: Number}]
});

module.exports = mongoose.model('Item', itemSchema);