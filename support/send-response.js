const sendResponse = (res, status, code, message, data = null) => {
    return res.status(status).json({
        status: code,
        message,
        data,
    });
};

module.exports = sendResponse;
