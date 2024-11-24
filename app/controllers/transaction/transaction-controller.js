require('dotenv').config();
const TransactionQuery = require('../../queries/transaction/transaction-queries');
const MemberQuery = require('../../queries/membership/member-queries');
const ServiceQuery = require('../../queries/information/service-queries');
const generateInvoiceNumber = require('../../../support/invoice-number');
const transactionQuery = new TransactionQuery();
const memberQuery = new MemberQuery();
const serviceQuery = new ServiceQuery();

const {topup, create} = require('../../validations/transaction/transaction-validator');
const { validationResult } = require('express-validator');

const controller = {
    index: async (req, res) => {
        try {
            let {limit, offset} = req.query;
            limit = parseInt(limit, 10) || 0; 
            offset = parseInt(offset, 10) || 0;
            const {email} = req.member;
            const transactions = await transactionQuery.getTransaction({email}, null, limit, offset);
            if(transactions.length === 0) return sendResponse(res, 404, 102, 'Data yang dicari belum tersedia');
            return sendResponse(res, 200, 0, 'Get History Berhasil', {
                offset: parseInt(req.query.offset),
                limit: parseInt(req.query.limit),
                records: transactions
            });
        } catch (error) {
            console.log(error);
            return sendResponse(res, 500, 500, 'Internal server error');
        }
    },

    showBalance: async (req, res) => {
        try {
            const {email} = req.member;
            const transaction = await transactionQuery.getBalance({email});
            if(transaction.length === 0) return sendResponse(res, 200, 0, 'Data yang dicari tidak tersedia');
            return sendResponse(res, 200, 0, 'Get Balance Berhasil', transaction[0]);
        } catch (error) {
            console.log(error);
            return sendResponse(res, 500, 500, 'Internal server error');
        }
    },

    create: [
        create,
        async (req, res) => {
        const dbTransaction = await sequelize.transaction();
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return sendResponse(res, 400, 102, errors['errors'][0].msg);

            const {email} = req.member;
            const member = await memberQuery.getMember({email});
            if(member.length === 0) return sendResponse(res, 400, 102, 'Pengguna tidak ditemukan');

            const service = await serviceQuery.getService({service_code: req.body.service_code});
            if(service.length === 0) return sendResponse(res, 400, 102, 'Service ataus Layanan tidak ditemukan');

            const balance = await transactionQuery.getBalance({email});
            if(balance.length === 0 || balance[0].balance < service[0].service_tariff) return sendResponse(res, 400, 102, `balance tidak cukup untuk membayar layanan ${service[0].service_name}`);

            const invoice_number = generateInvoiceNumber();
            const preparedData = {
                email: email,
                invoice_number: invoice_number,
                transaction_type: 'PAYMENT',
                description: service[0].service_name,
                total_amount: service[0].service_tariff
            }

            await transactionQuery.createTransaction(preparedData, { transaction: dbTransaction });
            const transaction = await transactionQuery.getTransaction({email, invoice_number}, { transaction: dbTransaction });
            const updatedBalance = balance[0].balance - service[0].service_tariff;
            await transactionQuery.updateBalance({email, updatedBalance}, { transaction: dbTransaction });
            await dbTransaction.commit();
            return sendResponse(res, 200, 0, 'Transaksi berhasil', {
                    invoice_number: transaction[0].invoice_number,
                    service_code: service[0].service_code,
                    service_name: service[0].service_name,
                    transaction_type: transaction[0].transaction_type,
                    total_amount: transaction[0].total_amount,
                    created_on: transaction[0].created_on
            });
        } catch (error) {
            console.log(error);
            await dbTransaction.rollback();
            return sendResponse(res, 500, 500, 'Internal server error');
        }
    }],

    topup: [
        topup,
        async (req, res) => {
        const dbTransaction = await sequelize.transaction();
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return sendResponse(res, 400, 102, errors['errors'][0].msg);

            const {email} = req.member;
            const member = await memberQuery.getMember({email});
            if(member.length === 0) return sendResponse(res, 400, 102, 'Pengguna tidak ditemukan');

            const invoice_number = generateInvoiceNumber();
            const preparedData = {
                email: email,
                invoice_number: invoice_number,
                transaction_type: 'TOPUP',
                description: 'Top Up balance',
                total_amount: req.body.top_up_amount
            }

            await transactionQuery.createTransaction(preparedData, { transaction: dbTransaction });
            let updatedBalance = 0;
            const balance = await transactionQuery.getBalance({email});
            if(balance.length === 0){
                updatedBalance = req.body.top_up_amount;
                await transactionQuery.createWallet({email, balance : updatedBalance}, { transaction: dbTransaction });
            }else{
                updatedBalance = balance[0].balance +  req.body.top_up_amount;
                await transactionQuery.updateBalance({email, updatedBalance}, { transaction: dbTransaction });
            }
       
            await dbTransaction.commit();
            return sendResponse(res, 200, 0, 'Top Up Balance berhasil', {balance: updatedBalance});
        } catch (error) {
            console.log(error);
            await dbTransaction.rollback();
            return sendResponse(res, 500, 500, 'Internal server error');
        }
    }]
};

module.exports = controller;
