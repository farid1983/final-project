const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
	//check header
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer')) {
		return res.status(500).json({ msg: 'authorization invalid' });
	}

	const token = authHeader.split(' ')[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		//attahce the logged in user to the job router
		req.user = { userId: payload.userId, name: payload.name };
		next();
	} catch (error) {
		return res.status(500).json({ msg: 'aut invalid' });
	}
};

module.exports = auth;
