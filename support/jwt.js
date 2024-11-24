require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET_KEY;
const verifyJwt = (token) => {
  return jwt.verify(token, secret);
};

const generateJWTToken = (email) => {
	const payload = { 
		email 
	};
	return jwt.sign(payload, secret, {expiresIn: '12h', algorithm: 'HS256'});
};


module.exports = { verifyJwt, generateJWTToken };