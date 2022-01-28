const mongoose = require('mongoose');

const connectDB = (url) => {
	mongoose.connect(
		url
		// 'mongodb+srv://farid:mongo1983@faridmongo.t7hut.mongodb.net/inventory?retryWrites=true&w=majority'
	);
};

module.exports = connectDB;
