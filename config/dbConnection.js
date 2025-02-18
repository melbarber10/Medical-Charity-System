const mongoose = require("mongoose");

const connectDB = async() => {
	try
	{
		const db = process.env.MONGO_URI;
		await mongoose.connect(db);
		console.log("Database is Connected Successfully");
	}
	catch(err)
	{
		console.log(err);
		process.exit(1);
	}
}

module.exports = connectDB;