const { check } = require('express-validator');

const create = [
	check('email').isEmail().withMessage('Paramter email tidak sesuai format'),
    check('password').isLength({min:8}).withMessage('Panjang password minimal 8')
];

const login = [
	check('email').isEmail().withMessage('Paramter email tidak sesuai format'),
    check('password').isLength({min:8}).withMessage('Panjang password minimal 8')
];
  
module.exports = {
    create,
    login
};