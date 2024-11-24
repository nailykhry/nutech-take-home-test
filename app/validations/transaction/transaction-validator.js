const { check } = require('express-validator');

const topup = [
	check('top_up_amount')
        .notEmpty() 
        .withMessage('Top up amount tidak boleh kosong')
        .isInt({ min: 0 }) 
        .withMessage('Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0'),
];
  
const create = [
	check('service_code')
        .notEmpty() 
        .withMessage('Service_code tidak boleh kosong')
];
  
module.exports = {
    topup,
    create
};