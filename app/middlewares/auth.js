require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	const bearerHeader = req.header('Authorization');

	if (!bearerHeader) {
		return sendResponse(res, 401, 108, 'Token tidak tidak valid atau kadaluwarsa');
	}

	try {
		const bearerToken = bearerHeader.split(' ')[1];
		const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
		req.member = decoded;
		next();
	} catch (err) {
		console.error(err);
		return sendResponse(res, 401, 108, 'Token tidak tidak valid atau kadaluwarsa');
	}
};
