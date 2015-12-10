var date = new Date();
var datestring = ("0" + (date.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + date.getDate().toString()).substr(-2)  + "/" + (date.getFullYear().toString()).substr(2);

var itemSchema = new Schema({
	name: { type: String, required: true},
	price: { type: Number, min: 0, required: true },
	qty: {type: Number, min: 1, required: false },
	category: {type: String, enum: ["meat", "produce", "bakery", "dryandcanned", "dairy", "pets", "personal", "beverages", "frozen", "home", "none"] },
	purchases: [{date: { type: Date, default: Date.now }, qty: Number, price: Number, store: String }]
});

var listSchema = new Schema({
	dateCreated: { type: Date, default: Date.now },
	listName: { type: String, default: datestring + " List" },
	items: [{itemId: item._id}],//HOW GET ID CARL?
	complete: { type: Boolean, default: false }
});