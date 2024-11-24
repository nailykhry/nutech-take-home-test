const express = require('express');
const router = express.Router();

const transactionController = require('../app/controllers/transaction/transaction-controller');
const authMiddleware = require('../app/middlewares/auth');

router.get('/balance', authMiddleware, transactionController.showBalance);
router.post('/topup', authMiddleware, transactionController.topup);
router.post('/transaction', authMiddleware, transactionController.create);
router.get('/transaction/history', authMiddleware, transactionController.index);

module.exports = router;
