const User = require('../models/User');
const { StatusCodes, BAD_REQUEST } = require('http-status-codes');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const register = async (req, res) => {
	const user = await User.create({ ...req.body });

	const token = user.createJWT();

	res
		.status(StatusCodes.CREATED)
		.json({ user: { name: user.getName() }, token });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: 'please provide email and password' });
	}

	//to check from DB
	const user = await User.findOne({ email });

	if (!user) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: 'invalid credential' });
	}

	//compare password
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: 'invalid credential' });
	}

	const token = user.createJWT();

	res.status(StatusCodes.OK).json({ user: { name: user.name }, token });

	// res.send('login user');
};

module.exports = {
	register,
	login,
};
