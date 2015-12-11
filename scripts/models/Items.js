var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	name: { type: String, required: true},
	price: { type: Number, default: 0, required: false },
	qty: {type: Number, default: 1, required: false },
	coupon: { type : Boolean, default: false },
	category: {type: String, default: 'none', enum: ["meat", "produce", "bakery", "dryandcanned", "dairy", "pets", "personal", "beverages", "frozen", "home", "none"] },
	purchases: [{date: { type: Date, default: Date.now }, qty: Number, price: Number}]
});

module.exports = mongoose.model('Item', itemSchema);