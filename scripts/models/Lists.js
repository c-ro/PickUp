var date = new Date();
var datestring = ("0" + (date.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + date.getDate().toString()).substr(-2)  + "/" + (date.getFullYear().toString()).substr(2);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
	// date: { type: Date, default: Date.now },
	name: { type: String, default: datestring + " List" },
	// items: [{type: Number, default}], //{itemId: item._id} ???
	// complete: { type: Boolean, default: false }
});

mongoose.exports = mongoose.model('List', listSchema);