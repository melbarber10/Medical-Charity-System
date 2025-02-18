const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
	donor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true
	},
	agent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	category: {
		type: String,
		enum: ["medical equipment", "clothes", "medicine"],
		required: true
	},
	itemDescription: {
		type: String, 
		required: true
	},
	condition: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	deliveryTime: {
		type: Date
	},
	address: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	collectionTime: {
		type: Date
	},
	donorToAdminMsg: String,
	adminToAgentMsg: String,
	addedAt: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		enum: ["pending", "rejected", "accepted", "assigned", "collected", "available"],
		required: true,
		default: "pending"
	},
	image :{
		type:String,
		required: false

	}
});

const Equipment = mongoose.model("equipment", equipmentSchema);
module.exports = Equipment;
