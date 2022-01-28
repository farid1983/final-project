const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
	{
		product: {
			type: String,
			required: [true, 'Please provide product name'],
			// minlength: 5,
			maxlength: 20,
			// unique: true,
		},

		category: {
			type: String,
			required: [true, 'Please provide position'],
			maxlength: 100,
		},

		location: {
			type: String,
			enum: ['offshore', 'onshore'],
			required: [true, 'Please provide position'],
			maxlength: 100,
		},

		quantity: {
			type: Number,
			required: [true, 'Please provide position'],
		},

		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'please provide user ID'],
		},

		createdByUser: {
			type: String,
			ref: 'User',
			required: [true, 'please provide user name'],
		},

		deleteAt: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Item', ItemSchema);
