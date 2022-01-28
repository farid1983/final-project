const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'name is required'],
		minlength: 3,
		maxlength: 30,
		// unique: true,
	},

	email: {
		type: String,
		required: [true, 'Email is required'],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'please provide a valid email',
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'password is required'],
		minlength: 4,
	},
});

//pre save function schema...
UserSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

UserSchema.methods.createJWT = function () {
	return jwt.sign(
		{ userId: this._id, name: this.name },
		process.env.JWT_SECRET,
		{
			expiresIn: '30d',
		}
	);
};

UserSchema.methods.getName = function () {
	return this.name;
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
	try {
		const isPasswordMatch = await bcrypt.compare(
			candidatePassword,
			this.password
		);

		return isPasswordMatch;
	} catch (error) {
		console.log(error);
	}
};

module.exports = mongoose.model('User', UserSchema);
