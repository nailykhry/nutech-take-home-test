const AuthService = require('../../queries/membership/auth-queries');
const authService = new AuthService();

const MemberQuery = require('../../queries/membership/member-queries');
const memberQuery = new MemberQuery();

const {encryptPassword, comparePasswords} = require('../../../support/password');
const {generateJWTToken} = require('../../../support/jwt');
const {create, login} = require('../../validations/membership/auth-validator');
const { validationResult } = require('express-validator');

const controller = {
    regist:[
        create, 
        async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return sendResponse(res, 400, 102, errors['errors'][0].msg);

            const member = await memberQuery.getMember({email : req.body.email});
            if(member.length > 0) return sendResponse(res, 400, 102, 'Email sudah terdaftar, silahkan login');

            const data = req.body;
            data.password = await encryptPassword(req.body.password);
            await authService.regist(data);
            return sendResponse(res, 200, 0, 'Registrasi berhasil silahkan login');
        } catch (error) {
            console.log(error);
            return sendResponse(res, 500, 500, 'Internal server error');
        }
    }],

    login: [
        login,
        async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return sendResponse(res, 400, 102, errors['errors'][0].msg);

            const {email, password} = req.body;
            const member = await authService.getMemberByEmail({email});
            
            if(member.length === 0) return sendResponse(res, 401, 103, 'Username atau password salah');
             
            const isCorrect = await comparePasswords(password, member[0].password);
            if(!isCorrect) return sendResponse(res, 401, 103, 'Username atau password salah');

            const token = await generateJWTToken(email);
            return sendResponse(res, 200, 0, 'Login Sukses', {token});
        } catch (error) {
            console.log(error);
            return sendResponse(res, 500, 500, 'Internal server error');
        }
    }]
};

module.exports = controller;
