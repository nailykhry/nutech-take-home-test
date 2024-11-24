const ServiceQuery = require('../../queries/information/service-queries');
const serviceQuery = new ServiceQuery();

const controller = {
    index: async (req, res) => {
        try {
            const services = await serviceQuery.getService(req.query);
            if(services.length === 0) return sendResponse(res, 404, 102, 'Data yang dicari belum tersedia');
            return sendResponse(res, 200, 0, 'Sukses', services);
        } catch (error) {
            console.log(error);
            return sendResponse(res, 500, 500, 'Internal server error');
        }
    }
};

module.exports = controller;
