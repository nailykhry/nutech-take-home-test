const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	return bcrypt.hash(password, salt);
};

const comparePasswords = async (password, encryptPass) => {
    return await bcrypt.compare(password, encryptPass);  
}

module.exports = {comparePasswords, encryptPassword};
